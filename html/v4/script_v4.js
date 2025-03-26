Country.fill_countries();

$(document).ready(function() {
    // Le DOM est complet et prêt à être modifié
    let tbody = $("#tableauCountries tbody");
    let pageActu = 1;

    let filtreNom = $("#searchNom");

    function remplirTab(currentPage) {
        tbody.empty();

        let start = (currentPage - 1) * 25;
        let end = start + 25;

        // let countries_filtre = Country.all_countries;
        let countries_filtre = listePaysFiltre();
        
        let page = Object.entries(countries_filtre).slice(start, end);

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

        $("#numPage").text("Page " + currentPage + " / " + Math.ceil(Object.values(countries_filtre).length / 25));
    }

    function listePaysFiltre() {
        let liste = {};

        Object.entries(Country.all_countries).forEach(([code, country]) => {
            if (verifyFiltre(country)) {
                liste[code] = country;
            }
        });

        return liste;
    }

    function verifyFiltre(pays) {
        match = true;
        if (filtreNom.val() != "") {
            if ((!pays.names["fr"].toLowerCase().includes(filtreNom.val().toLowerCase())) && (!pays.names["en"].toLowerCase().includes(filtreNom.val().toLowerCase()))) {
                match = false;
            }
        }

        return match;
    }

    filtreNom.on("input", function() {
        remplirTab(pageActu);
    });

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
});

