const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLooggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

router.post("/", isLooggedIn, validateReview,wrapAsync(reviewController.reviewCreate));  

//Review delete  Route
 router.delete("/:reviewId",isLooggedIn, isReviewAuthor, wrapAsync(reviewController.isLoggin));

 module.exports = router;