var mongoose = require('mongoose');
  
var imageSchema = new mongoose.Schema({
    url: String,
    listingID: String,
    data: Buffer,
    
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('Image', imageSchema);