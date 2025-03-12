
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
outsideTheContinent();

function moreNeighbors()
// Tableau des pays ayant le plus grand nombre de voisins. Affichez aussi les voisins
{

}

function neighborless()
// Tableau des pays n’ayant aucun voisin
{

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