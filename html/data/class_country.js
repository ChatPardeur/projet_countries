class Country 
{
    static all_countries = {}

    constructor(alpha3Code, names, capital, continent, population, superficie, borders, gentile, domain, flag)
    {
        this.alpha3code = alpha3Code
        this.names = names
        this.capital = capital
        this.continent = continent
        this.population = population
        this.superficie = superficie
        this.borders = borders
        this.gentile = gentile
        this.domain = domain
        this.flag = flag
    }

    toString() {

        let chaine = "";

        if (this.borders.length == 0) {
            chaine = `${this.alpha3code}, ${this.names["fr"]}, ${this.capital}, ${this.continent}, ${this.population} hab`;
        } else if (this.borders.length == 1) {
            chaine = `${this.alpha3code}, ${this.names["fr"]}, ${this.capital}, ${this.continent}, ${this.population} hab, ${Country.all_countries[this.borders[0]].names["fr"]}`;
        } else {
            let listBorders = "(" + this.borders[0];
            for (let i = 1; i < this.borders.length; i++) {
                listBorders += ", " + Country.all_countries[this.borders[i]].names["fr"];
            }
            listBorders += ")";

            chaine = `${this.alpha3code}, ${this.names["fr"]}, ${this.capital}, ${this.continent}, ${this.population} hab, ${listBorders}`;
        }
        
        return chaine;

    }

    static fill_countries()
    {
        countries.forEach(country => {
            let names = []
            names["fr"] = country.translations["fr"]
            names["en"] = country.name
            names["de"] = country.translations["de"]
            names["es"] = country.translations["es"]
            names["it"] = country.translations["it"]

            let borders = country.borders == undefined ? [] : country.borders

            this.all_countries[country.alpha3Code] = new Country(country.alpha3Code, 
                names, 
                country.capital, 
                country.region, 
                country.population,
                country.area, 
                borders, 
                country.demonym, 
                country.topLevelDomain, 
                country.flags.svg)
        })
    }
}
