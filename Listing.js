class Listing {
    constructor(data) {
        this.id = data;
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
            this.AssociationFee = value;
        }
        if(propertyName == "IPTU"){
            this.Iptu = value;
        }
        if(propertyName == "Área útil"){
            this.LivingArea = value;
        }
        if(propertyName == "Quartos"){
            this.BedroomsTotal = value;
        }
        if(propertyName == "Banheiros"){
            this.BedroomsTotal =value;
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
    }
}
