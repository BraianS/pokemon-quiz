class PokemonView {

    constructor(pokemonLocalStorage) {
        this.pokemonid = null
        this.pokemonCard = document.querySelector(".pokemon__card");
        this.pokeinfo = document.querySelector(".hero__pokeinfo");
        this.thumbnailPokemon = document.querySelector(".hero__thumbnail");
        this.pokemon__length = document.querySelector(".pokemon__length");

        this.pokemonLocalStorage = pokemonLocalStorage;
    }

    setPokemonSpriteIntoHeroThumbnail(pokemon) {
        this.thumbnailPokemon.src = pokemon.sprites.front_default;
        this.thumbnailPokemon.classList.remove("animation");
    }

    bindHeroInput(genName, pokemon) {
        const heroInput = document.querySelector('.hero__input');

        heroInput.addEventListener('input', (event) => {
            const input = event.target.value;

            if (input.toLowerCase() === pokemon.name.toLowerCase()) { // Make input case-insensitive

                const pokeThumbnail = document.getElementById(pokemon.name);

                this.thumbnailPokemon.classList.add("catch")

                pokemon.catch = true;
                alert("Catch: " + pokemon.name + " catch: " + pokemon.catch + " ");
                console.log(pokeThumbnail)

                setTimeout(() => {
                    // Update the catch status in the local storage
                    const pokeData = this.pokemonLocalStorage.getPokemonData(genName).map(poke => {
                        if (poke.name === pokemon.name) {
                            poke.catch = true;
                        }
                        return poke;
                    });

                    // Save the updated pokemon data to localStorage
                    this.pokemonLocalStorage.savePokemonData(genName, pokeData);

                    // Clear the input field
                    heroInput.value = "";

                    this.refreshRender(genName);
                    this.thumbnailPokemon.classList.remove("catch");
                }, 1000);

            }

        });
    }

    refreshRender(genName) {
        const storedData = this.pokemonLocalStorage.getPokemonData(genName);
        this.clearPokemonCard();

        // Re-render each Pokémon
        storedData.forEach(pokemon => {
            this.getPokemonWithSprites(pokemon);
        });

        const pokemonsDontCatch = storedData.filter(poke => poke.catch === false);
        const pokemonsCatch = storedData.filter(poke => poke.catch === true);

        this.pokemon__length.innerHTML = "You catch: "+pokemonsCatch.length+ " Pokemons";

        const randomIndex = Math.floor(Math.random() * pokemonsDontCatch.length);
        console.log(pokemonsDontCatch[randomIndex].name);

        this._getPokemonFromRandom(genName, pokemonsDontCatch[randomIndex])

    }

    _bindImageWithPokemonSprites(pokeData) {
        const spriteFront = pokeData.sprites.front_default;
        const img = document.createElement("img");
        img.id = pokeData.name;
        img.src = spriteFront;
        img.classList.add("pokemon__thumbnail");
        this.pokemonCard.append(img);
    }

    clearPokemonCard() {
        const pokemonThumbnail = this.pokemonCard.querySelectorAll("img");
        pokemonThumbnail.forEach(img => img.remove());
    }

    getPokemon(genName, pokemons) {
        this.clearPokemonCard()
        const storedData = this.pokemonLocalStorage.getPokemonData(genName);

        if (storedData.length === 0) {

            //   const randomIndex = Math.floor(Math.random() * pokemons.results.length);

            pokemons.results.map((pokemon) => {
                this.getPokemonWithSprites(pokemon);
                pokemon.catch = false;
                return pokemon;
            });

            this.getPokemonDetails(genName, pokemons);
            this.pokemonLocalStorage.savePokemonData(genName, pokemons.results);

        } else {
            this.getPokemonDetails(genName, storedData);
            console.log("else");
            //this._getPokemonFromRandom(genName, pokemons.results);
        }
    }

    getPokemonDetails(genName, poke) {
        const pokemons = poke.results || poke;

        pokemons.map((pokemon) => {
            this.getPokemonWithSprites(pokemon);
            if (pokemon.catch === false) {
                return pokemon;
            }
        });

        const pokemonsCatch = pokemons.filter(poke => poke.catch === true);

        this.pokemon__length.innerHTML = "You catch: "+pokemonsCatch.length+ " Pokemons";

        const pokemonsDontCatch = pokemons.filter(poke => poke.catch === false);

        const randomIndex = Math.floor(Math.random() * pokemonsDontCatch.length);
        console.log(pokemonsDontCatch[randomIndex].name);

        this._getPokemonFromRandom(genName, pokemonsDontCatch[randomIndex]);
    }

    getPokemonWithSprites(pokemon) {
        const url = pokemon.url;
        fetch(url)
            .then(response => response.json())
            .then(pokeData => {
                this._bindImageWithPokemonSprites(pokeData);

                if (pokemon.catch) {
                    const poke = document.getElementById(pokemon.name);
                    poke.classList.remove("pokemon__thumbnail");
                    poke.classList.add("pokemon__thumbnail.catch");
                }
            });
    }

    _getPokemonFromRandom(genName, pokemon) {
        console.log("pokemon detail random" + JSON.stringify(pokemon));
        fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemon => {
                this.setPokemonSpriteIntoHeroThumbnail(pokemon);
                this.bindHeroInput(genName, pokemon);
            });
    }
}
