import axios from "axios";

// This function fetches country data from the external API.
// It takes a country name and returns a simplified result.
export async function getCountryData(countryName) {
  // Make an API request to the external REST Countries API
  const response = await axios.get(
    `https://api.restcountries.com/countries/v5/names.common/${countryName}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.COUNTRY_API_KEY}`, // Using the Bearer token from the environment variables
      },
    }
  );

  // Extract the first country object from the array returned by the API
  const data = response.data.data.objects[0]; // API response shape: data -> data -> objects -> [0]

  // Return a simplified object with only the required fields
  return {
    country: data.names.common, // plural "names", not "name"
    capital: data.capitals?.[0]?.name, // capitals is an array of objects, take the first and use .name
    population: data.population, // population count
    currency: data.currencies?.[0]?.code, // currencies is an array; extract the first currency code
    flag: data.flag.url_png, // singular "flag"; key is "url_png" (not "png")
    region: data.region, // region of the country
    languages: data.languages?.map((lang) => lang.name), // languages: map to extract names
  };
}