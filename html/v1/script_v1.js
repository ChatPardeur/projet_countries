Country.fill_countries();

$(document).ready(function() {
    // Le DOM est complet et prêt à être modifié
    let tbody = $("#tableauCountries tbody");

    // On parcourt chaque pays
    Object.values(Country.all_countries).forEach((country) => {
        // On récupère les données

        //Puis on ajoute le pays au tableau
        let nomP = country.names["fr"];
        if (nomP == null) {
            nomP = "N/A";
        }
        let popP = country.population;
        if (popP == null) {
            popP = "N/A";
        }
        let supP = country.superficie;
        if (supP == null) {
            supP = "N/A";
        }
        let densP = country.getPopDensity();
        if (densP == null) {
            densP = "N/A";
        }
        let cont = country.continent;
        if (cont == null) {
            cont = "N/A";
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
});

