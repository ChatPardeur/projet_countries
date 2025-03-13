Country.fill_countries()



function outsideTheContinent() 
// Tableau JS des pays (objets Country) dont au moins un pays frontalier n’est pas dans le même continent.
{
    let tab = [];
    Object.values(Country.all_countries).forEach(country => { // On parcourt tous les pays
        let borders = country.getBorders();  // On récupère les pays voisins...
        borders.forEach(voisin => {          // ...et on les parcourt
            if (voisin.continent != country.continent) {    // si le continent du pays n'est pas le même que l'un de ces voisins... 
                tab.push(country.alpha3code);               // ...on ajoute le pays au tableau
            }
        });
    });
    console.table(tab);
}

function compareAmountOfNeighbors(c1, c2)
// compare 2 pays par rapport à la quantité de voisins qu'ils possèdent
{
    if(c1.borders.length < c2.borders.length)
    {
        return -1
    }
    else if (c1.borders.length > c2.borders.length)
    {
        return 1
    }
    else
    {
        return 0
    }
}

function moreNeighbors()
// Tableau des pays ayant le plus grand nombre de voisins. Affichez aussi les voisins
{
    let sortedCountriesByNeighbors = []
    Object.values(Country.all_countries).sort(compareAmountOfNeighbors).forEach(country => {        // trie les pays par rapport aux voisins, puis insère les données voulues dans sortedCountriesByNeighbors
        sortedCountriesByNeighbors.push(country)
    })

    sortedCountriesByNeighbors = sortedCountriesByNeighbors.reverse()       // inverse la tableau pour avoir les pays avec le plus de voisins au début

    let maxNeighbors = sortedCountriesByNeighbors[0].borders.length         // nombre max de voisins

    let maxCountries = []                                                   // pays ayant le max de voisins
    
    let i = 0
    while(i < sortedCountriesByNeighbors.length && sortedCountriesByNeighbors[i].borders.length == maxNeighbors)
    {
        maxCountries.push([sortedCountriesByNeighbors[i].alpha3code, sortedCountriesByNeighbors[i].borders])
        i++
    }

    console.log("maximum de voisins : " + maxNeighbors) 
    console.log("pays : ")
    console.table(maxCountries)
}

function neighborless()
// Tableau des pays n’ayant aucun voisin
{
    let neighborlessCountries = []
    Object.values(Country.all_countries).forEach(country => {
        if(country.borders.length == 0)         // si le pays n'a aucun voisin, on l'ajoute à neighborlessCountries
        {
            neighborlessCountries.push(country)
        }
    })

    console.log("les pays n'ayant aucun voisins")
    console.table(neighborlessCountries)
}

function moreLanguages()
// Tableau des pays parlant le plus de langues. Affichez aussi les langues
{
    let tab = [];
    let ordre = Object.values(Country.all_countries).sort((a, b) => b.languages.length - a.languages.length);
    tab.push([ordre[0].alpha3code, ordre[0].getLanguages()]);
    let i = 1;
    while (ordre[i].languages.length == ordre[0].languages.length) {
        tab.push([ordre[i].alpha3code, ordre[i].getLanguages()]);
        i += 1;
    }
    console.table(tab);
}

function withCommonLanguage()
// Tableau des pays ayant au moins un voisin parlant l’une de ses langues. 
//  Affichez aussi les pays voisins (objets Country) et les langues en question (objets Language)
{
    tab = [];
    let index = -1;
    Object.values(Country.all_countries).forEach(pays => {
        let langPays = pays.getLanguages();
        pays.getBorders().forEach(voisin => {
            let langVoisin = voisin.getLanguages();
            let nouv = true;
            for (let i = 0; i < langVoisin.length; i++) {
                if (langPays.includes(langVoisin[i])) {
                    if (nouv == true) {
                        nouv = false;
                        index += 1;
                        tab.push([pays, voisin, []]);
                    }
                    tab[index][2].push(langVoisin[i]);
                }
            }
        });
    });
    console.table(tab);
}


function withoutCommonCurrency()
// Tableau des pays sans aucun voisin ayant au moins une de ses monnaies
{
    let countriesWithoutCommonCurrency = []                         // tableau qui va contenir les pays sans voisins partageant une même monnaie

    Object.values(Country.all_countries).forEach(country => {
        let neighbors = country.getBorders()

        let indexBorders = 0
        let valid = true
        
        while (valid && indexBorders < neighbors.length)            // on regarde si parmis les voisins du pays, l'u d'eux partage une même monnaie
        {
            let neighbor = neighbors[indexBorders]
            if(country.currencies.some(currency => neighbor.currencies.includes(currency)))
            {
                valid = false                                       // si c'est la cas, on met le booléen valide à false, ce qui stoppe la recherhe
            }

            indexBorders++
        }

        if(valid)                                                   // si on a parcouru tous les voisins du pays sans trouver de monnaie commune, 
        {
            countriesWithoutCommonCurrency.push(country)            // alors on ajoute le pays dans le tableau
        }
    })

    return countriesWithoutCommonCurrency
}


function sortingDecreasingDensity()
// Tableau des pays triés par ordre décroissant de densité de population
{
    let ordre = Object.values(Country.all_countries).sort((a, b) => {
        let popDensityA = a.getPopDensity() == null ? -1 : parseFloat(a.getPopDensity());
        let popDensityB = b.getPopDensity() == null ? -1 : parseFloat(b.getPopDensity());
        return popDensityB - popDensityA;
    });
    console.table(ordre);
}

function moreTopLevelDomains()
// Tableau des pays ayant plusieurs Top Level Domains Internet
{
    let tab = [];
    let ordre = Object.values(Country.all_countries).sort((c1, c2) => c2.domain.length - c1.domain.length);
    
    tab.push([ordre[0].alpha3code, ordre[0].domain]);
    let i = 1;
    while (ordre[i].domain.length == ordre[0].domain.length) {
        tab.push([ordre[i].alpha3code, ordre[i].domain]);
        i += 1;
    }
    console.log(tab);
}

