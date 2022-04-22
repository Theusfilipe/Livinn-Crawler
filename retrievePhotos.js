const request = require('request-promise')
const cheerio = require('cheerio');
const { find } = require('domutils');
const axios = require('axios');
const fs = require("fs");

var link =  "https://rj.olx.com.br/rio-de-janeiro-e-regiao/imoveis/padrao-1018814134";

async function grabPhoto(url){
    const response = await axios.get(url,  { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data, "utf-8")
    //console.log(buffer);

    //fs.writeFileSync("new-path.jpg", buffer);
}

console.log(link);


  

request(link, (error, response, html ) =>{
    
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const photo = $('').html();
        $('div[data-testid="slides-wrapper"]').find('img').each((i,el) =>{
            const title = $(el);
            const url = $(el).attr('src');
            grabPhoto(url);        
                    
            console.log(url);    
            
            //retrieveListingData(link);
        });
        //console.log(photo);
    
                
    }
});

        






