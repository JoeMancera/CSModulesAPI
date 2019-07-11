
function _auth(username, password){
    let AuthPost = new Object();
    let myHeaders = new Headers();
    AuthPost.username = username;
    AuthPost.password = password;
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const url = Confg.domain+Confg.url.auth;
    let response = __OTPostRequest(AuthPost, 'POST', url, myHeaders);
    return response.json();
}