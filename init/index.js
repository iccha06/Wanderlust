const mongoose = require("mongoose");
const Listing = require("../models/listings");
const sampleListingsData = require("./data");
const axios = require("axios");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    console.log("MongoDB connected!");
}

const initDB = async () => {

    // delete old data
    await Listing.deleteMany({});
    console.log("Existing data cleared.");

    const ownerId = "69fa3fb882cf117b1327483d";

    const listingsToInsert = [];

    for (let listing of sampleListingsData.data) {

        const location = `${listing.location}, ${listing.country}`;

        let geometry = {
            type: "Point",
            coordinates: [],
        };

        try {

            const geoResponse = await axios.get(
                "https://nominatim.openstreetmap.org/search",
                {
                    params: {
                        q: location,
                        format: "json",
                        limit: 1,
                    },

                    headers: {
                        "User-Agent": "WanderlustApp/1.0",
                    },
                }
            );

            const geoData = geoResponse.data[0];

            if (geoData) {

                geometry = {
                    type: "Point",
                    coordinates: [
                        Number(geoData.lon),
                        Number(geoData.lat),
                    ],
                };
            }

        } catch (err) {

            console.log(`Geocoding failed for ${location}`);
        }

        listingsToInsert.push({
            ...listing,
            geometry,
            owner: ownerId,
        });
    }

    await Listing.insertMany(listingsToInsert);

    console.log(
        `Sample data inserted successfully! Total listings: ${listingsToInsert.length}`
    );

    mongoose.connection.close();
};

main()
    .then(() => initDB())
    .catch((err) => {
        console.log(err);
    });