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

        $chaine = "";

        if (this.borders.length == 0) {
            $chaine = `${this.alpha3code}, ${this.names["fr"]}, ${this.capital}, ${this.continent}, ${this.population} hab`;
        } else if (this.borders.length == 1) {
            $chaine = `${this.alpha3code}, ${this.names["fr"]}, ${this.capital}, ${this.continent}, ${this.population} hab, ${this.borders[0]}`;
        } else {
            $listBorders = "(" + $listBorders[0];
            for (let i = 1; i < this.borders.length; i++) {
                $listBorders += ", " + this.borders[i];
            }
            $listBorders += ")";

            $chaine = `${this.alpha3code}, ${this.names["fr"]}, ${this.capital}, ${this.continent}, ${this.population} hab, ${this.borders}`;
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
