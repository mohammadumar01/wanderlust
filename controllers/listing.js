const Listing = require("../models/listing");
const { geocoding, config} = require("@maptiler/client");
config.apiKey = process.env.MAP_KEY;

module.exports.index = async (req,res) => {
    const allListing = await Listing.find({});
    res.render("./listing/index.ejs",{allListing} );

};

module.exports.renderNewform =  (req,res) =>{
    res.render("./listing/new.ejs");
};



module.exports.createListing =  async (req,res,next) =>{
        const response = await geocoding.forward(req.body.listing.location);
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url,filename};
        newListing.geometry = response.features[0].geometry;
         let savedListing = await newListing.save();
        console.log(savedListing);
        req.flash("success"," Listing created successfuly");
       res.redirect("/listing");

};

module.exports.showListing = async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },

    }).populate('owner');
    if(!listing){
        req.flash("error"," Listing you requested for does not exist!");
        return res.redirect("/listing");
    }
    res.render("./listing/show.ejs",{listing});
};

module.exports.editRoute = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error"," Listing you requested for does not exist!");
        return res.redirect("/listing");
    }
    let originalImgUrl = listing.image.url;
    originalImgUrl = originalImgUrl.replace("/upload","/upload/w_250");
    res.render("./listing/edit.ejs",{listing,originalImgUrl});
    res.render("./listing/edit.ejs",{listing,originalImgUrl});

};

module.exports.updateRoute = async(req,res)=>{
    let {id} = req.params;
    let updatedListing =  await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = {url,filename};
        await updatedListing.save();
    }
    req.flash("success","listing updated successfuly");
    res.redirect(`/listing/${id}`);
}

module.exports.deletRoute = async (req,res)=>{
    let {id} = req.params;
    const DeleteListing = await Listing.findByIdAndDelete(id);
    console.log(DeleteListing);
     req.flash("success","listing deleted successfuly");
res.redirect("/listing");
};