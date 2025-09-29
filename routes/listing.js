const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLooggedIn,isOwner,validateListing}  = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



router.route("/")
.get(wrapAsync(listingController.index)) // index route
.post(isLooggedIn, upload.single('listing[image]'), validateListing,
    wrapAsync (listingController.createListing)); //post route


router.get("/new", isLooggedIn, listingController.renderNewform);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLooggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateRoute))
.delete(isLooggedIn,isOwner, wrapAsync(listingController.deletRoute));

router.get("/:id/edit", isLooggedIn,isOwner, wrapAsync(listingController.editRoute));

module.exports = router;
