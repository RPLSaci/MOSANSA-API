import fetch from 'node-fetch';


// const api_key = "AIzaSyAHkp6gQWdVXPHYhdCQnJMebLxpXG5Fg50"
// const folderId = '1bsglL6CE08UODrYp9R6k3V8n3RgIqyjc';

// var url = "https://www.googleapis.com/drive/v3/files?q='" + folderId + "'+in+parents&key=" + api_key;

// fetch(url).then(function(response) {
//     response.json().then(console.log)
// })


// fetch("https://moonlgh-orange-space-chainsaw-j94649gpgq6frq6-8080.preview.app.github.dev/api/getFiles",{
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         folderId:"1BBpO1FEZMC1UHOfECL1q-Ds6isGRm8U3"
//     })
// }).then(function(response) {
//     response.json().then(console.log)
// })
fetch("https://moonlgh-orange-space-chainsaw-j94649gpgq6frq6-8080.preview.app.github.dev/api/newUser",{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username:"mosansa",
        password:"mosansa",
        token:"SACHIE2023",
        tipe:"Organisasi"
    })
}).then(function(response) {
    response.json().then(console.log)
})