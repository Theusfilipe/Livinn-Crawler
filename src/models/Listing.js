const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
    category : String,
    ListPrice : Number, //salvar alteração de preços
    ParkingTotal : Number,
    AssociationAmenities: String,
    LotFeatures : String,
    StreetName: String,
    SubdivisionName : String,
    City : String,
    PostalCode : String,
    BathroomsTotalInteger: Number,
    BedroomsTotal: Number,
    LotSizeArea: String,
    LivingArea: String,
    Iptu: String,
    AssociationFee: Number,
    PropertyType: String,
    Link: String,
    SourceSystemKey: Number,
    PhotosURL: String,
    TimeStamp: Date
    
    //adCode :
    //array de fotos :
    //publicado em: 
});

module.exports = mongoose.model('Listing', ListingSchema);