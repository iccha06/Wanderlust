const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Listing = require("../models/listings");
const { isLoggedIn } = require("../middleware");

// Add to wishlist
router.post("/:id", isLoggedIn, async (req, res) => {
    const userId = req.user._id;
    const listingId = req.params.id;

    const user = await User.findById(userId);

    if (!user.wishlist.includes(listingId)) {
        user.wishlist.push(listingId);
        await user.save();
    }

    req.flash("success", "Added to wishlist!");
    res.redirect(`/listings/${listingId}`);
});

// Remove from wishlist
router.delete("/:id", isLoggedIn, async (req, res) => {
    const userId = req.user._id;
    const listingId = req.params.id;

    await User.findByIdAndUpdate(userId, {
        $pull: { wishlist: listingId },
    });

    req.flash("success", "Removed from wishlist!");
    res.redirect(`/listings/${listingId}`);
});

// Show wishlist
router.get("/", isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user._id).populate("wishlist");

    res.render("wishlist/index.ejs", {
        wishlist: user.wishlist,
    });
});

module.exports = router;