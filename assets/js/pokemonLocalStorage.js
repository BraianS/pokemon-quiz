class PokemonLocalStorage {    

    getPokemonData(gen){
        return JSON.parse(localStorage.getItem(gen)) || [];
    }

    savePokemonData(gen,data) {
        localStorage.setItem(gen, JSON.stringify(data))
    }    
}
