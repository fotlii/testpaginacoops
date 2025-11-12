const axios = require("axios");

const STEAM_API_BASE_URL = "https://store.steampowered.com/api";

module.exports = async (req, res) => {
  try {
    const { appids } = req.query;
    if (!appids) {
      return res.status(400).json({ error: "Missing appids parameter" });
    }

    const ids = appids.split(",");

    const results = {};

    // Fetch secuencial o en paralelo
    const responses = await Promise.all(
      ids.map(async (id) => {
        try {
          const url = `${STEAM_API_BASE_URL}/appdetails?appids=${id}`;
          const resp = await axios.get(url);
          return resp.data[id];
        } catch (e) {
          console.error(`Error loading appid ${id}`);
          return null;
        }
      })
    );

    ids.forEach((id, i) => {
      results[id] = responses[i];
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(results);
  } catch (error) {
    console.error("[Vercel Function] Fatal Error:", error.message);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};
