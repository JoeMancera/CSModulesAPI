async function _ping(){
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

async function _auth(username, password){
    let AuthPost = 'username='+username+'&password='+password;
    let myHeaders = new Object({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    })
    const url = Confg.domain + Confg.url.auth;
    try{
        let response = await __OTPostRequest(AuthPost, 'POST', url, myHeaders);
        if(response.ticket == "401"){
            return "Error al iniciar sesión: usuario y contraseña invalido"
        } else {
            window.sessionStorage.setItem("ot_label", response.ticket);
            _userdata();
            return "OK";
        }
    } catch (e){
        return "Error al iniciar sesión: " + e
    }
}

async function _userdata(){
    let myHeaders = new Object({
        'OTCSTICKET' : window.sessionStorage.getItem("ot_label")
    });
    const url = Confg.domain + Confg.url.auth;
    let response = await __OTPostRequest(null, 'GET', url, myHeaders);
    window.sessionStorage.setItem("ot_user_data", JSON.stringify(response.data) )
}

async function _serverinfo(){
    let myHeaders = new Object({
        'OTCSTICKET' : window.sessionStorage.getItem("ot_label")
    });
    const url = Confg.domain + Confg.url.sInfo;
    let response = await __OTPostRequest(null, 'GET', url, myHeaders);
    console.log(response);
    return response;
}

async function _getNode(idNode){
    let myHeaders = new Object({
        'OTCSTICKET' : window.sessionStorage.getItem("ot_label")
    });
    const url = Confg.domain + Confg.url.nodeInfo.v2 + idNode;
    let response = await __OTPostRequest(null, 'GET', url, myHeaders);
    console.log(response);
    return response;
}

async function _getChildren(idNode){
    let myHeaders = new Object({
        'OTCSTICKET' : window.sessionStorage.getItem("ot_label")
    });
    const url = Confg.domain + Confg.url.nodeInfo.v1 + idNode + "/nodes";
    let response = await __OTPostRequest(null, 'GET', url, myHeaders);
    console.log(response.data);
    return response;
}