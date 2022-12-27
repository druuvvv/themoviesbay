let url = document.URL;
let str = 916053;
let poster_URL = "https://image.tmdb.org/t/p/w780";
let searchURL = `https://api.themoviedb.org/3/movie/${str}?api_key=076113f04da878b9154d2580ddc6c02e&language=en-US`
console.log(searchURL);

fetch(searchURL).then(response => {
    return response.json();
}).then(json => {
    let movieName = json['title'];
    let movienametag = document.getElementById("movieId");
    movienametag.innerText = movieName;
    document.getElementById('movietag').innerText = json['tagline'];
    let postertag = document.getElementById("postertag");
    let posterlink = poster_URL + json['poster_path'];
    postertag.setAttribute('src' , posterlink);
})

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
    let newp = document.getElementById('newpage');
    let tt = "/" + movieid;

    newp.setAttribute('href' , tt);
}