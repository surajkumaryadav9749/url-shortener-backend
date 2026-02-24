const URL = require("../models/url");
const { nanoid } = require("nanoid");

const handleGenerateUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "url is required!", success: false });
  }

  try {
    const shortId = nanoid(8);
    await URL.create({ shortId, redirectUrl: url, visitHistory: [] });
    return res.status(201).json({
      success: true,
      message: "short url created successfully",
      id: shortId,
    });
  } catch (error) {
    return res.status(500).json({ error: error, success: false });
  }
};

const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
    );

    if (!entry) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    return res.redirect(entry.redirectUrl);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Analytics Handler
const handleGetAnalytics = async (req, res) => {
  const { shortId } = req.params;
  if (!shortId) {
    return res
      .status(400)
      .json({ message: "shortId is requires", success: false });
  }
  try {
    const result = await URL.findOne({ shortId });
    const totalClicks = result.visitHistory.length;
    const analytics = result.visitHistory;

    return res.status(200).json({ totolClicks: totalClicks, analytics });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: error });
  }
};

module.exports = {
  handleGenerateUrl,
  redirectToOriginalUrl,
  handleGetAnalytics,
};
