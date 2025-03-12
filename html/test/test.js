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
    return tab;
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
    console.log(tab);
}

function withCommonLanguage()
// Tableau des pays ayant au moins un voisin parlant l’une de ses langues. 
//  Affichez aussi les pays voisins (objets Country) et les langues en question (objets Language)
{

}

function withoutCommonCurrency()
// Tableau des pays sans aucun voisin ayant au moins une de ses monnaies
{

}

function sortingDecreasingDensity()
// Tableau des pays triés par ordre décroissant de densité de population
{

}

function moreTopLevelDomains()
// Tableau des pays ayant plusieurs Top Level Domains Internet
{

}