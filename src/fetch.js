function getData(){
    fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(response => response.json())
    .then(data=>console.log(data.results))
    .catch(e=> {console.log(e)})
}
getData()