class Currency {

    static tabCurrencies = 

    constructor(c, n, s) {
        this.code = c;
        this.nom = n;
        this.symbole = s;
    }

    static fill_currencies() {
        
    }
    
    toString() {
        return `${this.code}, ${this.nom}, ${this.symbole}`
    }

}