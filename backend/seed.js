
require("dotenv").config();
const axios = require("axios");
const mongoose = require("mongoose");

const Category = require("./models/category");
const News = require("./models/News");

const categories = [
  { name: "World", query: "world news when:7d" },
  { name: "Politics", query: "India politics news when:7d" },
  { name: "Business", query: "India business economy news when:7d" },
  { name: "Technology", query: "technology AI news when:7d" },
  { name: "Sports", query: "sports cricket football news when:7d" },
  { name: "Entertainment", query: "India entertainment cinema news when:7d" }
];

function decodeXml(text = "") {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) =>
      String.fromCodePoint(Number(n))
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCodePoint(parseInt(n, 16))
    )
    .replace(/\s+/g, " ")
    .trim();
}

function getTag(xml, tag) {
  const match = xml.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i")
  );

  return match ? decodeXml(match[1]) : "";
}

async function fetchArticles(query) {
  const url =
    "https://news.google.com/rss/search?q=" +
    encodeURIComponent(query) +
    "&hl=en-IN&gl=IN&ceid=IN:en";

  const response = await axios.get(url, { timeout: 20000 });

  const items = response.data.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  return items
    .map(item => ({
      title: getTag(item, "title"),
      description: getTag(item, "description"),
      source: getTag(item, "source") || "Google News",
      sourceUrl: getTag(item, "link"),
      publishedAt: new Date(getTag(item, "pubDate"))
    }))
    .filter(article =>
      article.title &&
      article.sourceUrl.startsWith("http") &&
      !Number.isNaN(article.publishedAt.getTime())
    );
}

async function seedNews() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    // Fetch articles before inserting anything.
    const collected = [];

    for (const category of categories) {
      console.log(`Fetching ${category.name} news...`);

      const articles = await fetchArticles(category.query);
      const unique = [
        ...new Map(
          articles.map(article => [article.title, article])
        ).values()
      ].slice(0, 5);

      if (unique.length < 5) {
        throw new Error(
          `Only ${unique.length} articles found for ${category.name}. ` +
          "No news has been inserted. Check your internet connection and try again."
        );
      }

      collected.push({ ...category, articles: unique });
    }

    for (const group of collected) {
      const category = await Category.findOneAndUpdate(
        { name: group.name },
        { $setOnInsert: { name: group.name } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      for (const article of group.articles) {
        await News.updateOne(
          {
            title: article.title,
            category: category._id
          },
          {
            $setOnInsert: {
              title: article.title,
              description: article.description ||
                `Read the original report from ${article.source}.`,
              image: "",
              videoUrl: "",
              category: category._id,
              isBreaking: false,
              isPublished: true,
              source: article.source,
              sourceUrl: article.sourceUrl,
              publishedAt: article.publishedAt
            }
          },
          { upsert: true }
        );
      }

      console.log(`${group.name}: processed ${group.articles.length} articles.`);
    }

    console.log("News seeding completed.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedNews();

