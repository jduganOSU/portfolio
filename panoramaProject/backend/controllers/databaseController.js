const mongoose = require('mongoose');
require('dotenv').config();


// Connect to mongoose 
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const mdb = mongoose.connection;


// verify the database has connected. Print a message verifying connection/failure to connect
mdb.once("open", (err) => {
    if(err){
        res.status(500).json({error: "500: Server connection failed"});
    } 
});


// Create the schema for the panorama collection
const PanoramaSchema = mongoose.Schema({
    latitude:               {type: Number, required: true},
    longitude:              {type: Number, required: true},
    description:            {type: String, required: false, maxlength: 25}, 
    dateGenerated:          {type: Date, required: true}
});  


// create the document from the Schema
const Panorama = mongoose.model('Panoramas', PanoramaSchema);


// createPanorama model
const createPanorama = async(latitude, longitude, description) => {
    const panorama = new Panorama({
        latitude: latitude, 
        longitude: longitude,
        dateGenerated: new Date(), 
        description: description
    });
    return panorama.save();
}


// Retrieve based on a filter
const retrievePanorama = async () => {
    const query = Panorama.find();
    return query.exec();
}


// export all models
module.exports = {
    createPanorama, 
    retrievePanorama
};