// function renderCards(){
//     return new Promise((resolve, reject) =>{
        
//     })
// }
// function checkLength(string){
//     if(string.length >5){
//         console.log(string + "...")

//     }else{
//         throw new Error("string length must be greater than 5")
//     }
// }
// capitalise("new")
// .then((data)=>{return(data)})
// //.then((value)=>console.log(value +"***"))
// .then(checkLength)
// .catch(e=>{console.log("error:" +e.message)})
// .finally(console.log("Promise execution completed"))





const getAbilities = () => {
    fetch('https://pokeapi.co/api/v2/ability')
        .then((response) => response.json())        
        .then((data) => createDropdown(data.results,"Abilities"))
        //.then((obj) => console.log(obj))        
		.catch((e) => {
			console.log(e.message);
		});
}
const getNature = () => {
    fetch('https://pokeapi.co/api/v2/ability')
        .then((response) => response.json())        
        .then((data) => createDropdown(data.results,"Natures"))
        //.then((obj) => console.log(obj))        
		.catch((e) => {
			console.log(e.message);
		});
}
const getTypes = () => {
    fetch('https://pokeapi.co/api/v2/type')
        .then((response) => response.json())        
        .then((data) => createDropdown(data.results,"Types"))
        //.then((obj) => console.log(obj))        
		.catch((e) => {
			console.log(e.message);
		});
}

const createDropdown = (objArray, title) => {
    console.log(title)
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
getNature()
getTypes()

//Return a list of all pokemons
const getPokemonList = () => {
	fetch('https://pokeapi.co/api/v2/pokemon')
        .then((response) => response.json())
        
        .then((data) => { return getPokemonNames(data.results); })
        .then((obj) => console.log(obj))
        //.then((names) => { return names.map((name)=> getPokemonObject(name))     })
        .then((obj) => console.log(obj))
		.catch((e) => {
			console.log(e.message);
		});
};

const renderCards = (objArray) => {
	if (objArray && objArray.length > 0) {
		cards = document.getElementById('pokemon');
		createCard(objArray);
	}
};

//Return search box text
const getSearchText = () => {
	text = document.getElementById('search-box');
	return text.value;
};

//Return selected category
const getCategory = () => {
	cat = document.getElementById('Select');
	return cat.value;
};

//Takes the array pokemon object and Return an array of pokemon names 
const getPokemonNames = (objArray) => {
	return objArray.map((el) => el.name);
};

// This fucntion takes a pokemon name as argument and return a single pokemon object
const getPokemonObject = (name) => {
	fetch('https://pokeapi.co/api/v2/pokemon/'+ name)
		.then((response) => response.json())
		.then((data) => {return data})
		.catch((e) => {
			console.log(e.message);
		});
};

//This function create and Append div to the HTML (CARD)
const createCard = (objArray) => {
	objArray.forEach((el) => {
		div = document.createElement('div');
		div.innerText = el.name;
		cards.append(div);
	});
};

const test = () => {
    console.log(getPokemonList())
}
//On click search button, return values
search = document.getElementById('showPokemon');
search.addEventListener('click', getPokemonList);
