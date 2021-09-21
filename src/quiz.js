
const getType = (id) => {
    fetch('https://pokeapi.co/api/v2/type/'+ `${id}`)
        .then((response) => response.json())        
      .then((data) => {
        document.getElementById("answer").innerText = data.name.toUpperCase();
        elem = document.getElementById("message")
        elem.classList.add("show")
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.getElementById("close").addEventListener("click", () => {
          el = document.getElementById("message")
          el.style.display = "none"
          location.reload();
        })
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
  getType(count)
 
})
