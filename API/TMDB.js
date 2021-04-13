const API_KEY='c6421097ac8b94c8c539efbebfc62114'
export function getSerieFromApi(text,page){
    const url=
'https://api.themoviedb.org/3/search/tv?api_key='+API_KEY+'&language=fr&page='+page+'&query='+text+''
return fetch(url)
.then((response)=>response.json())
.catch((error)=>console.log(error))
}
export function getImageFromApi(name){
   return url='https://image.tmdb.org/t/p/w500/'+name
    
}
export function getDetailFromAPI(idSerie)
{
    const url='https://api.themoviedb.org/3/tv/'+idSerie+'?api_key='+API_KEY+'&language=fr'
    return fetch(url)
    .then((response)=>response.json())
    .catch((error)=>console.log(error))
}
export function getDetailFromSaison(idSerie,idSaison)
{
   const url='https://api.themoviedb.org/3/tv/'+idSerie+'/season/'+idSaison+'?api_key='+API_KEY+'&language=fr'
   return fetch(url)
   .then((response)=>response.json())
   .catch((error)=>console.log(error))
}
export function getDetailFromEpisode(idSerie,idSaison,idEpisode)
{
    const url='https://api.themoviedb.org/3/tv/'+idSerie+'/season/'+idSaison+'/episode/'+idEpisode+'?api_key='+API_KEY+'&language=fr'
    return fetch(url)
    .then((response)=>response.json())
    .catch((error)=>console.log(error))
}
export function getCastingSerie(idSerie)
{
    const url='https://api.themoviedb.org/3/tv/'+idSerie+'/aggregate_credits?api_key='+API_KEY+'&language=fr'
    return fetch(url)
    .then((response)=>response.json())
    .catch((error)=>console.log(error))
}
export function getNewsSeries(page){
    const url='https://api.themoviedb.org/3/discover/tv?api_key='+API_KEY+'&language=fr&sort_by=first_air_date.desc&vote_count.gte=1000&page='+page+''
    return fetch(url)
    .then((response)=>response.json())
    .catch((error)=>console.log(error))
}