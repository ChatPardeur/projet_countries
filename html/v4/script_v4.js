Country.fill_countries();

$(document).ready(function() {
    // Le DOM est complet et prêt à être modifié
    let tbody = $("#tableauCountries tbody");
    let pageActu = 1;

    let filtreNom = $("#searchNom");
    let filtreCont = $("#cont-select");
    let filtreLang = $("#lang-select");

    // On remplie les listes dépliantes des filtres...

    // ...des contients
    let listeCont = [];
    Object.values(Country.all_countries).forEach(pays => {
        if (!listeCont.includes(pays.continent)) {
            listeCont.push(pays.continent);
        }
    });

    let listContTries = listeCont.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    for (let cont of listContTries) {
        filtreCont.append(
                $("<option>")
                .attr("value", cont)
                .text(cont)
        )
    }

    // ...des langues
    if(Object.keys(Language.all_languages).length === 0)
    {
        Language.fill_languages();
    }

    let listLangTriees = Object.values(Language.all_languages).sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    
    for (let lang of listLangTriees) {
        filtreLang.append(
                $("<option>")
                .attr("value", lang.name)
                .text(lang.name)
        )
    }


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
                nomP = "N/a";
            }
            let popP = country.population;
            if (popP == null) {
                popP = "N/a";
            }
            let supP = country.superficie;
            if (supP == null) {
                supP = "N/a";
            }
            let densP = country.getPopDensity();
            if (densP == null) {
                densP = "N/a";
            }
            let cont = country.continent;
            if (cont == null) {
                cont = "N/a";
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

        $("#numPage").text("Page " + currentPage + " / " + Math.ceil(Object.values(countries_filtre).length / 25));

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

        if (filtreCont.val() != "") {
            if (pays.continent != filtreCont.val()) {
                match = false;
            }
        }
        
        if (filtreLang.val() != "") {
            let it = 0;
            let matchLocal = false;
            while ((matchLocal == false) && (it < pays.languages.length)) {
                if (Language.all_languages[pays.languages[it]].name == filtreLang.val()) {
                    matchLocal = true;
                }
                it++;
            }
            if ((matchLocal == false) && (match == true)) {
                match = false;
            }
        }

        return match;
    }

    filtreNom.on("input", function() {
        remplirTab(pageActu);
    });

    filtreCont.on("change", function () {
        remplirTab(pageActu);
    });

    filtreLang.on("change", function () {
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

