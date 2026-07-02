import express from "express";
import axios from "axios";

const router = express.Router();
router.get("/:name", async (req, res) => {
    // /:name is called the route parameter whatever coutry name comes it stores it here
  const countryName = req.params.name;//mini version of app that only handles routes under a specific prefix app controls the whole server router controls only country side routes

  try {
    console.log(countryName);
    const response = await axios.get(
      `https://api.restcountries.com/countries/v5/names.common/${countryName}`,{
        headers:{
            Authorization:`Bearer ${process.env.COUNTRY_API_KEY}`,
        },
      }
    );

    const data = response.data.data.objects[0]; // real shape: data -> data -> objects -> [0]

    const result = {
      country: data.names.common, // plural "names", not "name"
      capital: data.capitals?.[0]?.name, // capitals is an array of OBJECTS, need .name
      population: data.population,
      currency: data.currencies?.[0]?.code, // currencies is an array, not an object with keys
      flag: data.flag.url_png, // singular "flag", key is "url_png" not "png"
      region: data.region,
      languages: data.languages?.map((lang) => lang.name), // this part was already correct
    };//we create our own json api returns too much information we only extract wjat we need

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ error: "Country not found" });
  }
});

export default router;