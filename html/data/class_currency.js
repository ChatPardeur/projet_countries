class Currency {

    static all_currencies = {};

    constructor(c, n, s) {
        this.code = c;
        this.nom = n;
        this.symbole = s;
    }

    static fill_currencies(jsonString) {

        jsonString.forEach(pays => {
            if ("currencies" in pays) {
                pays["currencies"].forEach(currency => {
                    this.all_currencies[currency["code"]] = new Currency(currency["code"], currency["name"], currency["symbol"]);
                });
            }
        });
    }
    
    toString() {
        return `${this.code}, ${this.nom}, ${this.symbole}`
    }

}

Currency.fill_currencies(countries);
console.table(Currency.all_currencies);
