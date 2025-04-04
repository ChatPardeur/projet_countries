class Country 
{
    static all_countries = {}

    constructor(alpha3Code, names, capital, continent, population, superficie, borders, gentile, domain, flag, languages, currencies)
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
        this.languages = languages
        this.currencies = currencies
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

    getCurrencies() {
        let tab = [];
        if(Object.keys(Currency.all_currencies).length === 0)
        {
            Currency.fill_currencies(countries);
        }

        for (let i = 0; i < this.currencies.length; i++) {
            tab.push(Currency.all_currencies[this.currencies[i]]);
        }
        return tab;
    }

    getLanguages() {
        let tab = [];
        if(Object.keys(Language.all_languages).length === 0)
        {
            Language.fill_languages();
        }

        for (let i = 0; i < this.languages.length; i++) {
            tab.push(Language.all_languages[this.languages[i]]);
        }
        return tab;
    }

    getPopDensity()
    {
        return this.superficie == null ? null : this.population / this.superficie;
    }

    getBorders()
    {
        let ret = []

        if(Object.keys(Country.all_countries).length === 0)
        {
            Country.fill_countries()
        }
        this.borders.forEach(borderCode => {
            ret.push(Country.all_countries[borderCode])
        })

        return ret
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

            let languages = []

            country.languages.forEach(language => {
                languages.push(language.iso639_2)
            });

            let currencies = []

            if(country.currencies != undefined)
            country.currencies.forEach(currency => {
                currencies.push(currency.code)
            })

            this.all_countries[country.alpha3Code] = new Country(               // met la valeur à null si elle n'est pas trouvée dans countries.js (exemple : UMI n'a pas de capitale ou de superficie)
                country.alpha3Code == undefined ? null : country.alpha3Code, 
                names, 
                country.capital == undefined ? null : country.capital,  
                country.region == undefined ? null : country.region, 
                country.population == undefined ? null : country.population,
                country.area == undefined ? null : country.area,
                borders,
                country.demonym == undefined ? null : country.demonym, 
                country.topLevelDomain == undefined ? null : country.topLevelDomain, 
                country.flags.svg == undefined ? null : country.flags.svg,
                languages, 
                currencies)
        })
    }

    static compare(c1, c2, attribut)        // prends en paramètres 2 instances de Country et l'attribut sur lequel les comparer.
                                            // renvoie 1 si c1.attribut > c2.attribut, -1 si c1.attribut < c2.attribut, 0 l'attribut entré 
                                            // est invalide ou si c1 = c2
                                            // si les pays sont égaux sur l'attribut entré, alors compare les pays sur leur nom français
                                            // les attributs possibles sont ceut utilisés pour trier le tableau lors de la partie 2
    {
        switch (attribut) {
            case "name":
                return c1.names["fr"].localeCompare(c2.names["fr"])

            case "population":
                if(c1.population > c2.population)
                {
                    return 1
                }
                else if(c1.population < c2.population)
                {
                    return -1
                }
                else
                {
                    return Country.compare(c1, c2, "name")
                }
            

            case "superficie":
                if(c1.superficie > c2.superficie)
                {
                    return 1
                }
                else if(c1.superficie < c2.superficie)
                {
                    return -1
                }
                else
                {
                    return Country.compare(c1, c2, "name")
                }
            
            case "density":
                if(c1.getPopDensity() > c2.getPopDensity())
                {
                    return 1
                }
                else if(c1.getPopDensity() < c2.getPopDensity())
                {
                    return -1
                }
                else
                {
                    return Country.compare(c1, c2, "name")
                }

            case "continent":
                return c1.continent.localeCompare(c2.continent)

            default:
                return 0
        }
    }
}
