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
});

