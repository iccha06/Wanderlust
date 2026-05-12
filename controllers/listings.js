const Listing=require("../models/listings");
const axios = require("axios");
module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}
module.exports.renderNewform=(req, res) => {
    res.render("listings/new.ejs");
}
module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    // create location string
    const location = `${req.body.listing.location}, ${req.body.listing.country}`;
    console.log("Searching location:", location);
    // geocoding request
    const geoResponse = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: location,
                format: "json",
                limit: 1,
            },
            headers: {
                "User-Agent": "WanderlustApp/1.0 (test@test.com)",
            },
        }
    );
    console.log("Geo Response:", geoResponse.data);
    const data = geoResponse.data[0];
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    // SAVE COORDINATES
    if (data) {
        newListing.geometry = {
            type: "Point",
            coordinates: [
                Number(data.lon),
                Number(data.lat),
            ],
        };
    }
    console.log("Saved Geometry:", newListing.geometry);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};
module.exports.showListings=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
    .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}
module.exports.editListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    let origImageUrl = "";

    // New format
    if (listing.image && listing.image.url) {
        origImageUrl = listing.image.url.replace(
            "/upload/",
            "/upload/h_200,w_250/"
        );
    }

    // Old format
    else if (typeof listing.image === "string") {
        origImageUrl = listing.image.replace(
            "/upload/",
            "/upload/h_200,w_250/"
        );
    }

    res.render("listings/edit.ejs", { listing, origImageUrl });
};
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // Update normal fields
    Object.assign(listing, req.body.listing);

    // If new image uploaded
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = { url, filename };
    }

    await listing.save();

    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
};
module.exports.deleteListing=async (req, res) => {
    const { id } = req.params;

    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listings");
}
module.exports.index = async (req, res) => {
    let { category, search } = req.query;
    let allListings;
    // SEARCH LOGIC (independent)
    if (search) {
        allListings = await Listing.find({
            location: {
                $regex: search,
                $options: "i",
            },
        });

    }
    // CATEGORY FILTER LOGIC
    else if (category && category !== "All") {
        allListings = await Listing.find({
            category: category,
        });

    }
    // SHOW ALL LISTINGS
    else {
        allListings = await Listing.find({});
    }
    res.render("listings/index.ejs", {
        allListings,
        category: category || "All",
        search,
    });
};