

let URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=076113f04da878b9154d2580ddc6c02e";
let poster_URL = "https://image.tmdb.org/t/p/w500";
let upcoming_url = "https://api.themoviedb.org/3/movie/upcoming?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US&page=1";

const poster_images = [];
const titles = [];
const movieIds = [];
const overviews = [];
const rating = []
const upcoming = [];
const upcom_date = [];
const newposter = [];
const movieId = [];
const newmovieId = [];
fetch(URL).then(response => {
    return response.json();
}).then(json => {
    let trending = json['results'];

    for (let i = 0; i < 10; i++) {
        poster_images[i] = poster_URL + trending[i]['poster_path'];
        titles[i] = trending[i]['title'];
        movieIds[i] = trending[i]['id'];
        overviews[i] = trending[i]['overview'];
        rating[i] = trending[i]['vote_average'];
        movieId[i] = trending[i]['id'];
    }
    let poster = document.querySelectorAll(".poster");
    let trend_list = document.querySelectorAll(".trend-movie");
    let rat_badge = document.querySelectorAll(".badge");
    console.log(movieId);
    for (let i = 0; i < 10; i++) {
        poster[i].setAttribute("src", poster_images[i]);
        trend_list[i].innerText = titles[i];
        rat_badge[i].innerText = rating[i].toFixed(1);
    }

})

fetch(upcoming_url).then(resp => {
    return resp.json();
}).then(
    json => {
        let date = json['dates']['minimum'];
        let results = json['results'];

        for (let i = 0; i < results.length; i++) {
            if (results[i]['release_date'] >= date) {
                upcoming.push(results[i]['title']);
                upcom_date.push(results[i]['release_date']);
                newmovieId.push(results[i]['id']);
                newposter.push(poster_URL + results[i]['poster_path']);
                overviews.push(results[i]['overview']);
            }
        }
    }
)
upcoming_url = "https://api.themoviedb.org/3/movie/upcoming?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US&page=2"
fetch(upcoming_url).then(resp => {
    return resp.json();
}).then(
    json => {
        let date = json['dates']['minimum'];
        let results = json['results'];

        for (let i = 0; i < results.length; i++) {
            if (results[i]['release_date'] > date) {
                upcoming.push(results[i]['title']);
                upcom_date.push(results[i]['release_date']);
                newmovieId.push(results[i]['id']);
                newposter.push(poster_URL + results[i]['poster_path']);
                overviews.push(results[i]['overview']);
            }
        }
        console.log(upcoming + upcom_date);
    }
)
upcoming_url = "https://api.themoviedb.org/3/movie/upcoming?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US&page=3"
fetch(upcoming_url).then(resp => {
    return resp.json();
}).then(
    json => {
        let date = json['dates']['minimum'];
        let results = json['results'];

        for (let i = 0; i < results.length; i++) {
            if (results[i]['release_date'] >= date) {
                upcoming.push(results[i]['title']);
                upcom_date.push(results[i]['release_date']);
                newmovieId.push(results[i]['id']);
                overviews.push(results[i]['overview']);
                newposter.push(poster_URL + results[i]['poster_path']);
            }
        }
        let upcom_list = document.querySelectorAll(".upcoming-movie");
        let up_date = document.querySelectorAll(".badge-up");
        for(let k =0;k<10;k++){
            upcom_list[k].innerText = upcoming[k];
            if(upcom_date[k] != null)
            up_date[k].innerHTML = upcom_date[k];
            
        }
        console.log(upcom_date);
    }
)


function search(form){
    let url = "https://api.themoviedb.org/3/search/movie?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US&page=1&include_adult=false&query="
    let searched = form.searchbox.value;
    url = url + searched;
}




function moreinfo(clickId){
    let x = document.getElementById('modalbtn');
     let position = clickId.charCodeAt(6) - 48;
     console.log(position);
     x.click();
     let modaltitle = document.getElementById('modaltitle');
    let modalimage = document.querySelector(".modalimage");
    let modaloverview = document.getElementById('modaloverview');
    modaltitle.innerText = titles[position];
    modalimage.setAttribute('src' , poster_images[position]);
    modaloverview.innerText = overviews[position];

    let url = "https://api.themoviedb.org/3/movie/" + movieId[position] + "/credits?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US";
    console.log(url);
    const actors = [];
    const character = [];
    fetch(url).then(response => {
        return response.json();
    }).then(json => {
        let cast = json['cast'];
        for(let i=0;i<2;i++){
            actors.push(cast[i]['name']);
            character[i] = cast[i]['character'];
        }
        let cast1 = document.getElementById('cast1');
        cast1.innerText = actors[0];
        let cast2 = document.getElementById('cast2');
        cast2.innerText = character[0];
        let cast3 = document.getElementById('cast3');
        cast3.innerText = actors[1];
        let cast4 = document.getElementById('cast4');
        cast4.innerText = character[1];
    })
}

function moreinfo2(clickId){
    let x = document.getElementById('modalbtn');
     let position = clickId.charCodeAt(4) - 48;
     console.log(position);
     x.click();
     let modaltitle = document.getElementById('modaltitle');
    let modalimage = document.querySelector(".modalimage");
    let modaloverview = document.getElementById('modaloverview');
    modaltitle.innerText = upcoming[position];
    modalimage.setAttribute('src' , newposter[position]);
    modaloverview.innerText = overviews[position+10];

    let url = "https://api.themoviedb.org/3/movie/" + newmovieId[position] + "/credits?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US";
    console.log(url);
    const actors = [];
    const character = [];
    fetch(url).then(response => {
        return response.json();
    }).then(json => {
        let cast = json['cast'];
        for(let i=0;i<2;i++){
            actors.push(cast[i]['name']);
            character[i] = cast[i]['character'];
        }
        let cast1 = document.getElementById('cast1');
        cast1.innerText = actors[0];
        let cast2 = document.getElementById('cast2');
        cast2.innerText = character[0];
        let cast3 = document.getElementById('cast3');
        cast3.innerText = actors[1];
        let cast4 = document.getElementById('cast4');
        cast4.innerText = character[1];
    })
}

if(screen.availWidth < 736){
    console.log("bitch");

    let columns = document.querySelectorAll(".trend-list");
    let mcolumns = document.querySelectorAll(".modalcol");

    for(let i=0 ; i<3 ; i++){
        columns[i].classList.remove('col');
        columns[i].classList.add('col-12');
    }
    for(let i=0 ; i<2 ; i++){
        mcolumns[i].classList.remove('col');
        mcolumns[i].classList.add('col-12');
    }

    columns[1].classList.add('mt-2');
    columns[2].classList.add('h-50');
}

console.log(overviews);