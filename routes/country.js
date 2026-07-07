import express from "express";
import { getCountryData } from "../services/countryService.js"; // Import the service function

const router = express.Router();

// Define the route: GET /api/country/:name
// This route takes a country name as a parameter and returns country info
router.get("/:name", async (req, res) => {
  // /:name is called the route parameter; whatever country name is in the URL, it is captured here
  const countryName = req.params.name;

  try {
    console.log(countryName); // Log the country name for debugging

    // Call the service to fetch the country data
    const result = await getCountryData(countryName);

    // Respond with the simplified result
    res.json(result);
  } catch (error) {
    // If any error occurs (e.g., country not found), log it and send a 404 response
    console.error(error.message);
    res.status(404).json({ error: "Country not found" });
  }
});

export default router;//mini version of app that only handles routes under a specific prefix app controls the whole server router controls only country side routes// /:name is called the route parameter whatever coutry name comes it stores it here