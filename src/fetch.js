function getData(){
    fetch('https://randomuser.me/api/?results=5')
    .then(response => response.json())
    .then(data=>showUsers(data.results))
    .catch(e=> {console.log(e)})
}
getData()

const userContainer = document.querySelector('#users')

function createUser(user){
    let userDiv = document.createElement("div")
    let userEmail = document.createElement("h5")
    let userName = document.createElement("h1")

    let userImage = document.createElement("img")
    userImage.src = user.picture.large
    userDiv.appendChild(userImage)

    userEmail.innerText = user.email
    userDiv.appendChild(userEmail)
    userContainer.appendChild(userDiv)

    userName.innerText = user.name.first + " " + user.name.last
    userDiv.appendChild(userName)

    
}

function showUsers(users) {
    userContainer.innerText = ""
    for(let user of users){
        createUser(user)
        console.log(user.picture.large)
        console.log(user.name.first+ " "+user.name.last)
        console.log(user.email)
        console.log(user.cell)
    }
}

const showButton = document.getElementById("showUsers")
showButton.addEventListener('click', getData)