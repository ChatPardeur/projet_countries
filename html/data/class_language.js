class Language {

    static all_languages = {}

    constructor (code, name)
    {
        this.codesIso639_2 = code
        this.name = name
    }

    toString()
    {
        return `${this.name}(${this.codesIso639_2})`
    }

    

    static fill_languages()
    {
        countries.forEach((country)=>{
            country.languages.forEach(language => {
                if(this.all_languages[language.iso639_2] == undefined)
                {
                    this.all_languages[language.iso639_2] = new Language(language.iso639_2, language.name)
                }
            });
        })
    }
}