
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
        url:String,
        filename: String,
    },

    price: {
        type: Number,
        required: true,
    },

    location: String,
    country: String,

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
    type: {
        type: String,
        default: "Point",
    },

    coordinates: {
        type: [Number],
    },
    },
    category:{
        type:String,
        enum:[ "Trending","Rooms","Iconic Cities","Mountains","Castles","Amazing Pools","Beach","Arctic","Camping","Farms","Dome"],
        required: true,
    }
});




// Delete all associated reviews when listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({
            _id: { $in: listing.reviews },
        });
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;




