const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleperclick(req,res){
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {

      // This query is taken to match the shortId field of the document
      shortId,
    },

    // This is update object defines how to update the document
    {

      // for pushing the data inside the array
      $push: {

        // Defines to push the new object to the visitHistory array of the found document
        visitHistory: {

          // Object has the single property. Only the object property which is defined in schema will be pushed to the array.
          timestamp: Date.now(),

        },
      },
    }
  );

  // send the redirect the response to the browser instructing it to navigate the url.
  res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleperclick,
};

// nano id is used to generate an id of the character.