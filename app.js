const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})



 async function main() {
    await mongoose.connect(MONGO_URL );
 };

 app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded ({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("hello, i am root");
});

app.get("/listing", async (req,res) => {

    const allListing = await Listing.find({});
    res.render("./listing/index.ejs",{allListing} );

});
app.get("/listing/new", async(req,res) =>{
    
    res.render("./listing/new.ejs");
})
app.get("/listing/:id", async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listing/show.ejs",{listing});
});
//post raoute for new
app.post("/listing", async(req,res) =>{
    let newListing = new Listing(req.body.listing);
    await newListing.save();
   res.redirect("/listing");


});
//edit route

app.get("/listing/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listing/edit.ejs",{listing});

});

app.put("/listing/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);

});

app.delete("/listing/:id", async (req,res)=>{
    let {id} = req.params;
    const DeleteListing = await Listing.findByIdAndDelete(id);
    console.log(DeleteListing);
    res.redirect("/listing");
})

// app.get("/testListing", async (req,res)=>{
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India"
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("succesfull testing");
// })

app.listen(8080, () =>{
    console.log("server is listening to port 8080");
})