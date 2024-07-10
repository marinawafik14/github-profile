const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")


getuser("florinpop17")

// function get username
async function getuser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();
    createUserCard(respData);
   getRepos(username)
}

// function get repos
 async function getRepos(username){
    const resp = await fetch(APIURL + username + "/repos");

    const respData = await resp.json();  

    addReposToCard(respData)
 }


//function create user card

function createUserCard(user) {
    const cardHTML = `
  <div class="card" >

    
     <img  class="avatar" src="${user.avatar_url}" alt="${user.name}" />
    
   
    <div class ="user_info" >
    <h2>${user.name}</h2>
        <p>${user.bio}</p>

    <ul class="info">
        <li>${user.followers}
        <strong> followers </strong>
        </li>
            <li>${user.following}
            <strong> following </strong>
            </li>
        <li>${user.public_repos}
        <strong> repos </strong>
        </li>
    </ul>
<div class="repos" id="repos"></div>

    </div>
  </div>
 `;
 
    main.innerHTML = cardHTML


}

//function add repos to the card 

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos")

repos.sort((a,b)=> b.stargazers_count - a.stargazers_count).slice(0,9).forEach((repo) => {
    const repoEl = document.createElement("a")
repoEl.classList.add("repo")
repoEl.href = repo.html_url
repoEl.target="_blank"
repoEl.innerText = repo.name


reposEl.appendChild(repoEl)
});


}



form.addEventListener("submit", (e) => {
    e.preventDefault()
    const user = search.value;
    if (user) {
        getuser(user)
        search.value = ""
    }
})

