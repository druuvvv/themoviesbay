let URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=076113f04da878b9154d2580ddc6c02e";
let poster_URL = "https://image.tmdb.org/t/p/w780";
let upcoming_url = "https://api.themoviedb.org/3/movie/upcoming?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US&page=1";
const searchMovies = [];
const searchIds = [];
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
        upcom_date.push(trending[i]['release_date']);
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
                newposter.push(poster_URL + results[i]['poster_path']);
                overviews.push(results[i]['overview']);
                rating.push(results[i]['vote_average']);
                movieId.push(results[i]['id']);
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
                movieId.push(results[i]['id']);
                newposter.push(poster_URL + results[i]['poster_path']);
                overviews.push(results[i]['overview']);
                rating.push(results[i]['vote_average']);
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
                movieId.push(results[i]['id']);
                overviews.push(results[i]['overview']);
                newposter.push(poster_URL + results[i]['poster_path']);
                rating.push(results[i]['vote_average']);
            }
        }
        let upcom_list = document.querySelectorAll(".upcoming-movie");
        let up_date = document.querySelectorAll(".badge-up");
        for(let k =0;k<10;k++){
            upcom_list[k].innerText = upcoming[k];
            if(upcom_date[k] != null)
            up_date[k].innerHTML = upcom_date[k+10];
            
        }
        console.log(upcom_date);
    }
)

function moreinfo(clickId){
    let x = document.getElementById('modalbtn');
    let position = clickId.charCodeAt(6) - 48;
    console.log(position);
    x.click();
    let modalRelease = document.getElementById('modalRelease');
    modalRelease.innerText = upcom_date[position];
    let modalRating = document.getElementById('modalRating');
    let modaltitle = document.getElementById('modaltitle');
    let modalimage = document.querySelector(".modalimage");
    let modaloverview = document.getElementById('modaloverview');
    modaltitle.innerText = titles[position];
    modalimage.setAttribute('src' , poster_images[position]);
    modaloverview.innerText = overviews[position];
    modalRating.innerText = rating[position].toFixed(1);

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

    let videourl = "https://api.themoviedb.org/3/movie/" + movieId[position] +"/videos?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US";

    fetch(videourl).then(resp => {
        return resp.json();
    }).then(json => {
        let links = json['results'];

        for(let i=0 ; i<links.length ; i++){
            let utube = document.getElementById('youtube');
            let uu = "https://www.youtube.com/embed/"+links[i]['key'];
            if(links[i]['type'] == 'Trailer'){
                utube.setAttribute('src' , uu);
                utube.classList.remove('d-none');
                break;

            }
            else{
                utube.className = 'd-none';
            }
        }
    })
}

function moreinfo2(clickId){
    let x = document.getElementById('modalbtn');
    let position = clickId.charCodeAt(4) - 48;
    console.log(position);
    x.click();
    let modalRating = document.getElementById('modalRating');
    let modalRelease = document.getElementById('modalRelease');
    let modaltitle = document.getElementById('modaltitle');
    let modalimage = document.querySelector(".modalimage");
    let modaloverview = document.getElementById('modaloverview');
    modalRelease.innerText =upcom_date[position+10];
    modaltitle.innerText = upcoming[position];
    modalimage.setAttribute('src' , newposter[position]);
    modaloverview.innerText = overviews[position+10];
    if(rating[position+10].toFixed(1) == 0.0){
        modalRating.innerText = "Unrated";
    }
    else
    modalRating.innerText = rating[position+10].toFixed(1);
    
    let url = "https://api.themoviedb.org/3/movie/" + movieId[position+10] + "/credits?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US";
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

    let videourl = "https://api.themoviedb.org/3/movie/" + movieId[position+10] +"/videos?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US";

    fetch(videourl).then(resp => {
        return resp.json();
    }).then(json => {
        let links = json['results'];
        for(let i=0 ; i<links.length ; i++){
            let utube = document.getElementById('youtube');
            let uu = "https://www.youtube.com/embed/"+links[i]['key'];
            if(links[i]['type'] == 'Trailer'){
                utube.setAttribute('src' , uu);
                utube.className = '';
                break;
            }
            else{
                utube.className = 'd-none';
            }
        }
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

function search(form){
    let searchURL = "https://api.themoviedb.org/3/search/movie?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US&page=1&include_adult=false&query="
    let searched = form.searchbox.value;
    let btnsearch = document.getElementById('btnsearch');
    searched = searched.replaceAll(" " , "+");
    searchURL = searchURL + searched;
    btnsearch.click();
    fetch(searchURL).then(response => {
        return response.json();
    }).then(json => {
        let searchjson = json['results'];
        let searchList = document.querySelectorAll('.search-list');
        for(let i=0;i<5;i++){

            searchMovies[i] = searchjson[i]['original_title'];
            searchIds[i] = searchjson[i]['id'];
        }


        for(let i=0;i<5;i++){
            searchList[i].innerText = searchMovies[i];
        }
        
    })
   
}
function searchinfo(clicksearch){
    let x = document.getElementById('modalbtn');
    x.click();
    let position = clicksearch.charCodeAt(7) - 48;
    let modalRelease = document.getElementById('modalRelease');
    modalRelease.innerText = upcom_date[position];
    let modalRating = document.getElementById('modalRating');
    let modaltitle = document.getElementById('modaltitle');
    let modalimage = document.querySelector(".modalimage");
    let modaloverview = document.getElementById('modaloverview');
    modaltitle.innerText = titles[position];
    modalimage.setAttribute('src' , poster_images[position]);
    modaloverview.innerText = overviews[position];
    modalRating.innerText = rating[position].toFixed(1);
    
    let movieid = searchIds[position];
    console.log(movieid);
    let url = "https://api.themoviedb.org/3/movie/" + movieid + "?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US";
    fetch(url).then(resp => {
        return resp.json();
    }).then(
        json => {
            let result = json;
            modaltitle.innerText = result['title'];
            modaloverview.innerText = result['overview'];
            modalRating.innerText = result['vote_average'].toFixed(1);
            let posterurl =  "https://image.tmdb.org/t/p/w780" + result['poster_path'];
            modalimage.setAttribute('src' , posterurl);
            let url = "https://api.themoviedb.org/3/movie/" + movieid + "/credits?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US";
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
             let videourl = "https://api.themoviedb.org/3/movie/" + movieid +"/videos?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US";

             fetch(videourl).then(resp => {
                 return resp.json();
             }).then(json => {
                 let links = json['results'];
         
                 for(let i=0 ; i<links.length ; i++){
                     let utube = document.getElementById('youtube');
                     let uu = "https://www.youtube.com/embed/"+links[i]['key'];
                     if(links[i]['type'] == 'Trailer'){
                         utube.setAttribute('src' , uu);
                         utube.classList.remove('d-none');
                         break;
         
                     }
                     else{
                         utube.className = 'd-none';
                     }
                 }
             }).catch(err => {
                console.log(err);
             })
            
        }
    )
}

