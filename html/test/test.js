Country.fill_countries()



function outsideTheContinent() 
// Tableau JS des pays (objets Country) dont au moins un pays frontalier n’est pas dans le même continent.
{

}


function compareAmountOfNeighbors(c1, c2)
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
    Object.values(Country.all_countries).sort(compareAmountOfNeighbors).forEach(country => {
        sortedCountriesByNeighbors.push([country.names["fr"], country.getBorders()])
    })

    console.log("5 pays avec le plus de voisins")
    
    console.log(sortedCountriesByNeighbors.slice(-5).reverse())
}

function neighborless()
// Tableau des pays n’ayant aucun voisin
{
    let neighborlessCountries = []
    Object.values(Country.all_countries).forEach(country)
}

function moreLanguages()
// Tableau des pays parlant le plus de langues. Affichez aussi les langues
{

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