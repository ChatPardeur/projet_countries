import * as countries from "countries.js"
class Language {
    constructor (code, name)
    {
        this.codesIso639_2 = code
        this.name = name
    }

    toString()
    {
        return `${name}(${code})`
    }

    static fillLanguages()
    {

    }
}

test = Language("pus", "Pastho")

console.log(test)