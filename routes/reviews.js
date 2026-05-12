const express = require("express");
const router = express.Router({ mergeParams: true });

const Listing = require("../models/listings.js");
const Review = require("../models/review.js");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController=require("../controllers/review.js");

// Validation Middleware
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }

    next();
};

// Create Review
router.post("/", validateReview,isLoggedIn, wrapAsync(reviewController.createReview));

// Delete Review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;