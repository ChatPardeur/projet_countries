Country.fill_countries();

$(document).ready(function() {
    // Le DOM est complet et prêt à être modifié
    let tbody = $("#tableauCountries tbody");

    // On parcourt chaque pays
    Object.values(Country.all_countries).forEach((country) => {
        //Puis on ajoute le pays au tableau
        tbody.append(
            $("<tr>")
            .attr("id", country.alpha3Code)
            .append(
                $("<td>").text(country.names["fr"]),
                $("<td>").text(country.population),
                $("<td>").text(country.supeficie),
                $("<td>").text(country.getPopDensity()),
                $("<td>").text(country.continent),
                $("<td>").append(
                    $("<img>")
                        .attr("src", country.flag)
                        .attr("alt", "Drapeau de " + country.name)
                )
            )
        );
    });
});

