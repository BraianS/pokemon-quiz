class PokemonController {

   constructor(pokemonLocalStorage, pokemonView) {

      this.genSelected = "Gen 1";

      this.gen1URL = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
      this.gen2URL = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151';
      this.gen3URL = 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251';
      this.gen4URL = 'https://pokeapi.co/api/v2/pokemon?limit=107&offset=386';
      this.gen5URL = 'https://pokeapi.co/api/v2/pokemon?limit=156&offset=493';
      this.gen6URL = 'https://pokeapi.co/api/v2/pokemon?limit=72&offset=649';
      this.gen7URL = 'https://pokeapi.co/api/v2/pokemon?limit=88&offset=721';
      this.gen8URL = 'https://pokeapi.co/api/v2/pokemon?limit=96&offset=809';
      this.gen9URL = 'https://pokeapi.co/api/v2/pokemon?limit=120&offset=905';

      this.BUTTONS = [
         {
            NAME: "Gen 1",
            URL: this.gen1URL,
            CLASS: "button"
         },
         {
            NAME: "Gen 2",
            URL: this.gen2URL,
            CLASS: "button"
         },
         {
            NAME: "Gen 3",
            URL: this.gen3URL,
            CLASS: "button"
         },
         {
            NAME: "Gen 4",
            URL: this.gen4URL,
            CLASS: "button"
         },
         {
            NAME: "Gen 5",
            URL: this.gen5URL,
            CLASS: "button"
         },
         {
            NAME: "Gen 6",
            URL: this.gen6URL,
            CLASS: "button"
         },
         {
            NAME: "Gen 7",
            URL: this.gen7URL,
            CLASS: "button"
         },
         {
            NAME: "Gen 8",
            URL: this.gen8URL,
            CLASS: "button"
         },
         {
            NAME: "Gen 9",
            URL: this.gen9URL,
            CLASS: "button"
         }
      ];

      this.pokemonLocalStorage = pokemonLocalStorage;
      this.pokemonView = pokemonView;

      this.bindButtons('.pokemon__gens');
      this.bindButtons('.pokemon__buttons');

      this.fetchPokemon(this.BUTTONS[0].NAME, this.BUTTONS[0].URL);

   }

   fetchPokemon(genName,url) {
      fetch(url)
         .then(response => response.json())
         .then(pokemons => {
            this.pokemonView.getPokemon(genName,pokemons)
         })
   }

   bindButtons(containerSelector) {
      const container = document.querySelector(containerSelector);

      this.BUTTONS.forEach(button => {
         const but = document.createElement("button");
         but.name = button.NAME;
         but.innerText = button.NAME;
         but.type = "button"
         but.classList.add("button");

         but.addEventListener('click', () => {
            this.genSelected = button.NAME;
            this.fetchPokemon(button.NAME, button.URL);
         });

         container.append(but);
      });
   }
}
