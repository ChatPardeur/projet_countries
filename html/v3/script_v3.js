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
                densP = densP.toFixed(2)
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
                            .attr("class", "drapeau")
                    )
                )
            );
        });

        $("#numPage").text("Page " + currentPage + " / " + Math.ceil(Object.values(Country.all_countries).length / 25));

        $("tr:has(td)").on("click", (event) => {
            if(event.target.classList.contains("drapeau"))
            {
                afficherDrapeau(event)
            }
            else
            {
                afficheDetail(event)
            }

        } ) // permet d'afficher le détail sur les pays chargés 

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


    /* ------------------- V3 ------------------- */

    // détail
    
    let overlay = $("#overlay");

    $("#overlay").children("button").on("click", function(){
        overlay[0].style.display = "none";
        overlay.children(":not(button)").remove()
    })


    function afficheDetail(event){

        let country = Country.all_countries[event.currentTarget.id];

        let liste = $("<ul>").attr("id", "listeDetail")

        // noms du pays
        liste.append(
            $("<li>").append(
                $("<h3>").text("Noms"),
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

        // pays voisins
        liste.append(
            $("<li>").append(
                $("<h3>").text("Pays voisins"),
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

        // monnaies
        liste.append(
            $("<li>").append(
                $("<h3>").text("Monnaies"),
                $("<ul>")
            )
        )

        let currencies = country.getCurrencies()
        if(currencies.length == 0)
        {
            liste.children("li:last").children("ul").append(
                $("<li>").append(
                    $("<p>").text("aucune monnaie")
                )
            )
        }
        else
        {
            currencies.forEach(currency => {
                liste.children("li:last").children("ul").append(
                    $("<li>").append(
                        $("<p>").text(currency.nom)
                    )
                )
            })
        }

        // languages
        liste.append(
            $("<li>").append(
                $("<h3>").text("Languages"),
                $("<ul>")
            )
        )

        let languages = country.getLanguages()
        if(languages.length == 0)
        {
            liste.children("li:last").children("ul").append(
                $("<li>").append(
                    $("<p>").text("aucun language")
                )
            )
        }
        else
        {
            languages.forEach(language => {
                liste.children("li:last").children("ul").append(
                    $("<li>").append(
                        $("<p>").text(language.name)
                    )
                )
            })
        }


        // capitale
        liste.append(
            $("<li>").append(
                $("<h3>").text("Capitale"),
                $("<ul>").append(
                    $("<li>").append(
                        $("<p>").text(country.capital)
                    )
                )
            )
        )

        // alpha3code
        liste.append(
            $("<li>").append(
                $("<h3>").text("Alpha3Code"),
                $("<ul>").append(
                    $("<li>").append(
                        $("<p>").text(country.alpha3code)
                    )
                )
            )
        )

        // gentile
        liste.append(
            $("<li>").append(
                $("<h3>").text("Gentile"),
                $("<ul>").append(
                    $("<li>").append(
                        $("<p>").text(country.gentile)
                    )
                )
            )
        )

        // nom de domaine
        liste.append(
            $("<li>").append(
                $("<h3>").text("Nom de domaine"),
                $("<ul>").append(
                    $("<li>").append(
                        $("<p>").text(country.domain)
                    )
                )
            )
        )

        // drapeau
        liste.append(
            $("<li>").append(
                $("<h3>").text("Drapeau"),
                $("<ul>").append(
                    $("<li>").append(
                        $("<img>").attr("src", country.flag)
                    )
                )
            )
        )

        overlay.prepend(liste)

        overlay[0].style.display = "flex"
    }

    // drapeau
    function afficherDrapeau(event)
    {
        let country = Country.all_countries[event.currentTarget.id];
        let liste = $("<ul>").attr("id", "listeDetail")

        let imgDrapeau = $("<img>").attr("src", country.flag)

        overlay.prepend(imgDrapeau)
        overlay[0].style.display = "flex"

    }

    /* -------------------- raccourcis clavier -------------------- */

    document.addEventListener("keydown", (event) => {
        if(event.key === "Escape")
        {
            if(overlay[0].style.display = "flex")
            {
                overlay[0].style.display = "none"
                overlay.children(":not(button)").remove()
            }
        }
       
    })
});
