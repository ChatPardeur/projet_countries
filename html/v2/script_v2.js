Country.fill_countries();

$(document).ready(function() {
    // Le DOM est complet et prêt à être modifié
    let tbody = $("#tableauCountries tbody");

    if (!document.cookie.includes("pageActu")) {
        document.cookie = "pageActu=1;expires=31 Dec 2026 23:59:59 GMT;path=/;SameSite=Lax";
    }

    function getCookie(name) {
        let cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            let [key, value] = cookie.split("=");
            if (key.trim() == name) {
                return value;
            }
        }
    }


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
            else
            {
                densP = parseFloat(densP.toFixed(2))
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

        $("#numPage").text("Page " + currentPage + " / " + Math.ceil(Object.values(Country.all_countries).length / 25));
    }

    $("#prec").click(function() {
        let pageActu = getCookie("pageActu");
        if (pageActu > 1) {
            pageActu--;
            document.cookie = "pageActu=" + pageActu + ";expires=Fri, 31 Dec 2026 23:59:59 GMT;path=/";
            remplirTab(pageActu);
        }
    });

    $("#suiv").click(function() {
        let pageActu = getCookie("pageActu");
        if (pageActu < Math.ceil(Object.values(Country.all_countries).length / 25)) {
            pageActu++;
            document.cookie = "pageActu=" + pageActu + ";expires=Fri,31Dec202623:59:59GMT;path=/";
            remplirTab(pageActu);
        }
    });

    $("#prem").click(function() {
        document.cookie = "pageActu=1;expires=Fri, 31 Dec 2026 23:59:59 GMT;path=/";
        remplirTab(1);
    });
    
    $("#dern").click(function() {
        document.cookie = "pageActu=" + Math.ceil(Object.values(countries_filtre).length / 25) + ";expires=Fri, 31 Dec 2026 23:59:59 GMT;path=/";
        remplirTab(Math.ceil(Object.values(countries_filtre).length / 25));
    });
    
    remplirTab(getCookie("pageActu"));
});

