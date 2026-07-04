import express from "express";
import { getWeatherData } from "../services/weatherService.js";

const router = express.Router();

router.get("/:name", async (req, res) => {
  try {
    const result = await getWeatherData(req.params.name);
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ error: "Weather data not found" });
  }
});

export default router;