//index, show, store, update, destroy
const Image = require('../models/image');

module.exports ={
    async store(req, res) {
        const {url} = req.body;

        let photo = await Image.findOne({ Link });

        if(!photo){
            photo = await Image.create(req.body);
        }
        
        return res.json(photo);
    }
};