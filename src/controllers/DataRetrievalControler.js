//index, show, store, update, destroy
const Listing = require('../models/listing');

module.exports ={
    async store(req, res) {
        const {url} = req.body;
        const SourceSystemKey = req.body.SourceSystemKey;
        let listing = await Listing.findOne(SourceSystemKey);

        if(!listing){
        listing = await Listing.create(req.body);
        }
        
        return res.json(listing);
    }
};