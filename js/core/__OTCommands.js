
async function _auth(username, password){
    let res;
    let AuthPost = 'username='+username+'&password='+password;
    let myHeaders = new Headers({
        "Content-Type": "text/javascript",
    })
    const url = Confg.domain+Confg.url.auth;
    let response = await __OTPostRequest(AuthPost, 'POST', url, myHeaders);
    
    return response;
}

async function _ping() {
    const url = Confg.domain + Confg.url.ping
    let status = false; 
    await fetch(url)
    .then((response) => {
        if (response.ok) {
            status = true
        } else {
            throw new Error('Algo anda mal');
        }
    })
    .then((responseJson) => {
        console.log("Todo bien!")
        status = true;
    })
    .catch((error) => {
        console.log("error del servidor: " + error)
        status = false
    });
    return status;
}