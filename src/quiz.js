
const getType = (id) => {
    fetch('https://pokeapi.co/api/v2/type/'+ `${id}`)
        .then((response) => response.json())        
      .then((data) => {
        alert(data.name)
        })        
		.catch((e) => {
			console.log(e.message);
		});
}


submit = document.getElementById('submit');
submit.addEventListener("click", (event) => {
  event.preventDefault();
  answer = document.querySelectorAll("input")
  let count = 1
  answer.forEach((el) => {
    if(el.value === "Yes" && el.checked){count+= 1};
  })
  
  getType(count.toString())
    
})