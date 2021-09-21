// Return a list of abilities
const getAbilities = () => {
    fetch('https://pokeapi.co/api/v2/ability')
        .then((response) => response.json())        
        .then((data) => createDropdown(data.results,"Abilities"))
		.catch((e) => {
			console.log(e.message);
		});
}

// Return a list of types
const getTypes = () => {
    fetch('https://pokeapi.co/api/v2/type')
        .then((response) => response.json())        
        .then((data) => createDropdown(data.results,"Types"))
        //.then((obj) => console.log(obj))        
		.catch((e) => {
			console.log(e.message);
		});
}

//Generete a dropdown with a list of options
const createDropdown = (objArray, title) => {
    option = document.createElement('option');
        option.value = "";
        option.innerText = title;
        document.getElementById(title).appendChild(option)
    objArray.forEach((el) => {
		option = document.createElement('option');
        option.value = el.name;
        option.innerText = el.name;
        document.getElementById(title).appendChild(option)		
    });
       
}
getAbilities()
getTypes()


//Clear list and render list of pokemons with details 
const render = () => {
    let pokemonContainer = document.querySelector('#pokemon')
    pokemonContainer.innerText = "";
    getPokemonList()
}

//Return a list of all pokemons, name and url only
const getPokemonList = () => {
	fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then((response) => response.json()) 
        .then((pokemons) => { pokemons.results.forEach((pokemon) => getPokemonObject(pokemon,getAbility(), getText(),getType())); })        
		.catch((e) => {
			console.log(e.message);
		});
};

//This function create and Append div to the HTML (CARD)
const renderCards = (obj) => {
	if (obj) {
        // All card container 
        let cards = document.getElementById('pokemon');

        // Flip card containers 
        let card = document.createElement('div');
        let back = document.createElement('div');
        let content = document.createElement('div');
        let front = document.createElement('div');

        let pokeName = document.createElement('h2')
        let stats = document.createElement('ul');
        let pokeTypes = document.createElement('li');
        let hp = document.createElement('li')
        let attack = document.createElement('li')
        let defence = document.createElement('li')
        let specialAttack = document.createElement('li')
        let specialDefence = document.createElement('li')
        let speed = document.createElement('li')


        // pokeSpecies = document.createElement('li')
        //pokeIsLegendary = document.createElement('li')
        front.classList.add("front");
        front.classList.add(obj.types[0].type.name)
        card.classList.add("card");
        back.classList.add("back");
        content.classList.add("content")
        pokeName.classList.add("pokeName")
        stats.classList.add("stats");
        hp.classList.add("stat");
        attack.classList.add("stat");
        defence.classList.add("stat");
        specialAttack.classList.add("stat");
        specialDefence.classList.add("stat");
        speed.classList.add("stat");

        pokeName.innerText = capitalizeFirstLetter(obj.name)
        pokeTypes.innerText = "Type: " + capitalizeFirstLetter(obj.types[0].type.name) 
        hp.innerText = "HP: " + obj.stats[0].base_stat
        attack.innerText = "Attack: " + obj.stats[1].base_stat
        defence.innerText = "Defence: " + obj.stats[2].base_stat
        specialAttack.innerText = "Special Attack: " + obj.stats[3].base_stat
        specialDefence.innerText = "Special Defence: " + obj.stats[4].base_stat
        speed.innerText = "Speed: " + obj.stats[4].base_stat


        // pokeIsLegendary = obj.isLeg
        cards.append(card);
        card.append(content);
        card.append(back);
        content.append(front)
        front.append(pokeName)
        front.append(stats)
        stats.append(pokeTypes)
        stats.append(hp)
        stats.append(attack)
        stats.append(defence)
        stats.append(specialAttack)
        stats.append(specialDefence)
        stats.append(speed)

        front.append(createImage(obj.id))

    // createImage(obj.id,cards)
	}
};

//This function create and Append img to the HTML (CARD)
function createImage(id, cards){
    let container = document.createElement('div')
    container.classList.add('image')
    let image = document.createElement('img')
    image.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
    image.classList.add("pokeImage")
    return image
    // container.append(image);
    // cards.append(container);
}

//Return search box text
const getText = () => {
	text = document.getElementById('search-box');
	return text.value;
};

//Return selected Ability
const getAbility = () => {
	cat = document.getElementById('Abilities');
	return cat.value;
};

//Return selected Type
const getType = () => {
	cat = document.getElementById('Types');
	return cat.value;
};


// This function takes a pokemon name as argument and fetch and push a single pokemon object to pokemonObjectArray
const getPokemonObject = (pokemon, ability, text, type) => {    
	fetch(pokemon.url)
		.then((response) => response.json())
        .then((data) => {
            //Render card if no args
            if (!ability && !text && !type) { renderCards(data); console.log(data)}

            //Render card if ability only
            if (ability && ability == data.abilities[0].ability.name && !text && !type) { renderCards(data); console.log(1); };

            //Render card if ability & text
            if (ability && ability == data.abilities[0].ability.name && text && data.name.includes(text) && !type) { renderCards(data); console.log(2); };

            //Render card if ability & text & type
            if (ability && ability == data.abilities[0].ability.name && text && data.name.includes(text) && type && type == data.types[0].type.name) { renderCards(data); console.log(3); };

            //Render card if ability & type
            if (ability && ability == data.abilities[0].ability.name && !text && type && type == data.types[0].type.name) { renderCards(data); console.log(4); };


            //Render card if text only
            if (!ability && text && data.name.includes(text) && !type) { renderCards(data); console.log(5); };

            //Render card if text & type
            if (!ability && text && data.name.includes(text) && type && type == data.types[0].type.name) { renderCards(data); console.log(6); };

            //Render card if type only
            if (type && type == data.types[0].type.name && !ability && !text) { renderCards(data); console.log(7); };
            
            
        })
		.catch((e) => {
			console.log(e.message);
		});
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

//On click search button, return pokemons
search = document.getElementById('showPokemon');
search.addEventListener('click', render);

