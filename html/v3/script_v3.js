Country.fill_countries();

$(document).ready(function() {
    // Le DOM est complet et prêt à être modifié
    let tbody = $("#tableauCountries tbody");
    let pageActu = 1;

    function remplirTab(currentPage) {
        tbody.empty();

        let start = (currentPage - 1) * 25;
        let end = start + 25;
        
        let page = Object.entries(Country.all_countries).slice(start, end);

        // On parcourt chaque pays de la page
        page.forEach((country) => {
            country = country[1];

            let nomP = country.names["fr"];
            if (nomP == null) {
                nomP = "/";
            }
            let popP = country.population;
            if (popP == null) {
                popP = "/";
            }
            let supP = country.superficie;
            if (supP == null) {
                supP = "/";
            }
            let densP = country.getPopDensity();
            if (densP == null) {
                densP = "/";
            }
            let cont = country.continent;
            if (cont == null) {
                cont = "/";
            }
            
            //Puis on ajoute le pays au tableau
            tbody.append(
                $("<tr>")
                .attr("id", country.alpha3code)
                .append(
                    $("<td>").text(nomP),
                    $("<td>").text(popP),
                    $("<td>").text(supP),
                    $("<td>").text(densP),
                    $("<td>").text(cont),
                    $("<td>").append(
                        $("<img>")
                            .attr("src", country.flag)
                            .attr("alt", "Drapeau de " + nomP)
                    )
                )
            );
        });

        $("#numPage").text("Page " + currentPage + " / " + Math.ceil(Object.values(Country.all_countries).length / 25));
    }

    $("#prec").click(function() {
        if (pageActu > 1) {
            pageActu--;
            remplirTab(pageActu);
        }
    });

    $("#suiv").click(function() {
        if (pageActu < Math.ceil(Object.values(Country.all_countries).length / 25)) {
            pageActu++;
            remplirTab(pageActu);
        }
    });

    remplirTab(pageActu);


    /* ------------------- V3 ------------------- */


    let overlay = $("#overlay");

    $("#overlay").children("button").on("click", function(){
        overlay[0].style.display = "none";
        overlay.children("ul").remove()
    })

    $("tr").on("click", function(){


        let country = Country.all_countries[event.currentTarget.id];

        let liste = $("<ul>").attr("id", "listeDetail")


        liste.append(
            $("<li>").append(
                $("<p>").text("Noms"),
                $("<ul>")
            )
        )

        Object.keys(country.names).forEach(key => {
            liste.children("li:last").children("ul").append(
                $("<li>").append(
                    $("<p>").text(key + " : " + country.names[key])
                )
            )
        })

        liste.append(
            $("<li>").append(
                $("<p>").text("Pays voisins"),
                $("<ul>")
            )
        )

        let neighbors = country.getBorders()
        if(neighbors.length == 0)
        {
            liste.children("li:last").children("ul").append(
                $("<li>").append(
                    $("<p>").text("aucun pays voisin")
                )
            )
        }
        else
        {
            neighbors.forEach(neighbor => {
            liste.children("li:last").children("ul").append(
                $("<li>").append(
                    $("<p>").text(neighbor.names["fr"])
                )
            )
        })
        }


        liste.append(
            $("<li>").append(
                $("<p>").text("Capitale")
            ),
            $("<ul>").append(
                $("<li>").append(
                    $("<p>").text(country.capital)
                )
            )
        )

        liste.append(
            $("<li>").append(
                $("<p>").text("Alpha3Code")
            ),
            $("<ul>").append(
                $("<li>").append(
                    $("<p>").text(country.alpha3code)
                )
            )
        )




        overlay.append(liste)

        overlay[0].style.display = "flex"
    })
});

