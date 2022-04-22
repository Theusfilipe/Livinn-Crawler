const request = require('request-promise')
const cheerio = require('cheerio');
const { find } = require('domutils');



var link =  "https://rj.olx.com.br/rio-de-janeiro-e-regiao/zona-sul/imoveis/venda?o=1&pe=100000&ps=1";

console.log(link);

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
  
async function retrieveData(){
    var i = 1;
    var number = 0;
    var minPrice=1;
    var maxPrice=100000;
    while (maxPrice<1000000000){


        while(i<50){
            

            request(link, (error, response, html ) =>{
    
                if(!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
    
                    $('#ad-list').find('a').each((i,el) =>{
                        const title = $(el);
                        const listing = $(el).attr('href');
                        console.log(listing);
                        number++;
                        console.log(number);        
                        //retrieveListingData(link);
                    });
                }
            });
            link = link.replace("o="+i,"o="+(i+1));
            i++;
        
        }
    
        link = link.replace("o="+i,"o=1");
        i=1;
        link = link.replace("pe="+(maxPrice),"pe="+(maxPrice+100000));
        link = link.replace("ps="+(minPrice),"ps="+(minPrice+100000));
        console.log(link);
        maxPrice = maxPrice+100000;
        minPrice = minPrice+100000;
    
    await sleep(60000)
    
    }
    
    }



retrieveData();

