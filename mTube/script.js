// const { default: Axios } = require("axios");

function getComment(){
    const apiKey = 'AIzaSyA6nEOSx0BLGwKNHwl_fNPFKyotcgdUezs'
    axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=kffacxfA7G4&maxResults=50`)
    .then(data=>{
        console.log(data)
    })
}

getComment()