const request = require('request-promise')
const cheerio = require('cheerio');
const { find } = require('domutils');
const { children } = require('cheerio/lib/api/traversing');
var websiteLinkSearch = 'https://rj.olx.com.br/rio-de-janeiro-e-regiao/zona-sul/imoveis/venda?o=1&pe=5000&ps=1'

const api = require('./src/services/api.js');
const axios = require('axios');
class Listing {
    constructor() {
        
        //this.dataCadastro = new Date();
    }

    setProperty(propertyName,value){
        if(propertyName == "Categoria"){
            this.category = value;
        }
        if(propertyName == "Tipo"){
            this.PropertyType = value;
        }
        if(propertyName == "Condomínio"){
            value = ""+value;
            var str = value.slice(3);
            str = str.replace('.','');
            this.AssociationFee = parseFloat(str);
        }
        if(propertyName == "IPTU"){
            value = ""+value;
            var str = value.slice(3);
            str = str.replace('.','');
            this.Iptu = parseFloat(str);
        }
        if((propertyName == "Área útil")|| (propertyName == "Área construída")){
            this.LivingArea = value;
        }
        if(propertyName == "Tamanho"){
            this.LotSizeArea = value;
        }
            
        if(propertyName == "Quartos"){
            this.BedroomsTotal = parseFloat(value);
        }
        if(propertyName == "Banheiros"){
            this.BathroomsTotalInteger =parseFloat(value);
        }
        if(propertyName == "CEP"){
            this.PostalCode = value;
        }
        if(propertyName == "Município"){
            this.City = value;
        }
        if(propertyName == "Bairro"){
            this.SubdivisionName = value;
        }
        if(propertyName == "Logradouro"){
            this.StreetName = value;
        }
        if(propertyName == "Detalhes do imóvel"){
            this.LotFeatures = value;
        }
        if(propertyName == "Detalhes do condominio"){
            this.AssociationAmenities = value;
        }
        if(propertyName == "Vagas na garagem"){
            this.ParkingTotal = parseFloat(value);
        }
        if(propertyName == "ListPrice"){
            value = ""+value;
            var str = value.slice(3);
            str = str.replace('.','');
            this.ListPrice = parseFloat(str);
        }
        if(propertyName == "Link"){
            this.Link = value;
        }
        if(propertyName == "SourceSystemKey"){
            this.SourceSystemKey = value;
        }
        if(propertyName == "TimeStamp"){
            this.TimeStamp = value;
        }
        if(propertyName == "TimeStamp"){
            this.TimeStamp = value;
        }
    }

    setPhotos(url){
        if(!this.PhotosURL){
            this.PhotosURL = url;
        } else{
            this.PhotosURL = this.PhotosURL + " ; " +url;
        }

    }
    async saveListing(){
        return new Promise((resolve,reject) => {api.post('/listing',this)});
    }
    
    
}
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}





function retrieveListingData(link){
    request(link, (error, response, html ) =>{
        //console.log(link);
        if(!error && response.statusCode == 200) {
            
            const $ = cheerio.load(html);
            const listing = new Listing();
            listing.setProperty('Link',link);
            const listingCode = link.slice(-10);
            //console.log(listingCode);
            listing.setProperty('SourceSystemKey', listingCode);
            const price =$('div[data-testid="ad-price-wrapper"]').children().children().children().children().html();
            //console.log(price);
            listing.setProperty('ListPrice', price);
            
            $('div[data-testid="ad-properties"]').children().each((i,el) =>{
                
                const property = $(el).children().children().html();
                const value = $(el).children().children().next().text();
                listing.setProperty(property, value);
                //console.log(property + " : "+ value);
                //console.log(element);
                //const link = $(el).attr('href');
                          
                
            });
            
            

            
            
    
            //console.log(listresponse);
            $('div[data-testid="slides-wrapper"]').find('img').each((i,el) =>{
                //const title = $(el);
                const url = $(el).attr('src');
                listing.setPhotos(url);
            
            });
            listing.setProperty('TimeStamp',new Date());

            listing.saveListing();
            //
            console.log(listing);
            
        }
    });
}

async function retrieveData(){
    var i = 1;
    var number = 0;
    var minPrice=1;
    var maxPrice=5000;
    while (maxPrice<=1000000000){

        while(i<50){
            request(websiteLinkSearch, (error, response, html ) =>{
    
                if(!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);

                    $('#ad-list').find('a').each((i,el) =>{
                        const title = $(el);
                        const link = $(el).attr('href');
                        number++;
                            
                        retrieveListingData(link);
                    });
                }
            });
            websiteLinkSearch = websiteLinkSearch.replace("o="+i,"o="+(i+1));
            i++;
        
        }
        websiteLinkSearch = websiteLinkSearch.replace("o="+i,"o=1");
        i=1;
        websiteLinkSearch = websiteLinkSearch.replace("pe="+(maxPrice),"pe="+(maxPrice+100000));
        websiteLinkSearch = websiteLinkSearch.replace("ps="+(minPrice),"ps="+(minPrice+100000));
        console.log(websiteLinkSearch);
        maxPrice = maxPrice+5000;
        minPrice = minPrice+5000;
        await sleep(240000);
    }
}

retrieveData();

// criar o dashboard para mostrar os imóveis, mudanças feitas, preços etc
   
