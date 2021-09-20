// Return a list of abilities
const getAbilities = () => {
    fetch('https://pokeapi.co/api/v2/ability')
        .then((response) => response.json())        
        .then((data) => createDropdown(data.results,"Abilities"))
        //.then((obj) => console.log(obj))        
		.catch((e) => {
			console.log(e.message);
		});
}

// Return a list of genders
const getGenders = () => {
    const gender = [{ name: "Male" }, { name: "Female" }]
   createDropdown(gender,"Gender")
}

// Return a list of genders
const getLegendaries = () => {
    const legendary = [{ name: "True" },{name:"False"}]
   createDropdown(legendary,"Legendary")
}

// Return a list of natures
const getNatures = () => {
    fetch('https://pokeapi.co/api/v2/nature')
        .then((response) => response.json())        
        .then((data) => createDropdown(data.results,"Natures"))
        //.then((obj) => console.log(obj))        
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
//getGenders()
//getLegendaries()
//getNatures()
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
        .then((pokemons) => { pokemons.results.forEach((pokemon) => getPokemonObject(pokemon,getAbility(), getNature(), getText(),getType())); })        
		.catch((e) => {
			console.log(e.message);
		});
};

//This function create and Append div to the HTML (CARD)
const renderCards = (obj) => {
	if (obj) {
        cards = document.getElementById('pokemon');
        div = document.createElement('div');
        div.innerText = obj.name;
        cards.append(div);
    createImage(obj.id,cards)
	}
};

//This function create and Append img to the HTML (CARD)
function createImage(id, cards){
    let container = document.createElement('div')
    container.classList.add('image')
    let image = document.createElement('img')
    image.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
    container.append(image);
    cards.append(container);
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
//Return selected gender
const getGender = () => {
	cat = document.getElementById('Gender');
	return cat.value;
};
//Return selected Legendary
const getLegendary = () => {
	cat = document.getElementById('Legendaries');
	return cat.value;
};

//Return selected Nature
const getNature = () => {
	cat = document.getElementById('Natures');
	return cat.value;
};


//Return selected Type
const getType = () => {
	cat = document.getElementById('Types');
	return cat.value;
};


// This function takes a pokemon name as argument and fetch and push a single pokemon object to pokemonObjectArray
const getPokemonObject = (pokemon, ability, nature, text, type) => {    
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

//On click search button, return pokemons
search = document.getElementById('showPokemon');
search.addEventListener('click', render);

