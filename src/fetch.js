function getData(){
    fetch("https://pokeapi.co/api/v2/pokemon/{id or name}/")
    .then(response => response.json())
    .then(data=>showUsers(data.results))
    .catch(e=> {console.log(e)})
}
getData()