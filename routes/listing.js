const express = require("express");
const router = express.Router();

const Listing = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudconfig.js")
const upload = multer({ storage })

// ---------------- VALIDATION MIDDLEWARE ----------------
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }

    next();
};

// ---------------- INDEX & CREATE ROUTE ----------------
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    ) ;

// ---------------- NEW ROUTE ----------------
router.get(
    "/new",
    isLoggedIn,
    listingController.renderNewform
);

// ---------------- SHOW, UPDATE & DELETE ROUTE ----------------
router.route("/:id")
    .get(wrapAsync(listingController.showListings))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.deleteListing)
    );
// ---------------- EDIT ROUTE ----------------
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editListing)
);

module.exports = router;