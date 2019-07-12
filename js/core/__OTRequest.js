async function __OTPostRequest(data, method, url, headers) {  
    if(method == "POST"){
        let res;
        let myInit = {
            method: method,
            headers: headers,
            cache: 'default',
            body: data, // data can be `string` or {object}! 
        };
        await fetch(url, myInit)
        .then((response) => {
            if (response.ok){
                res = response.json();
            } else {
                res = {"ticket" : "401", "resp" : res}
            }
        })
        .catch(error => {
            console.log(error)
        });
        return res;
    } else if (method == "GET"){
        let res;
        let myInit = {
            method: method,
            headers: headers,
            cache: 'default'
        };
        await fetch(url, myInit)
        .then((response) => {
            if (response.ok){
                res = response.json();
            } else {
                res = {"ticket" : "401", "resp" : res}
            }
        })
        .catch(error => {
            console.log(error)
        });
        return res;
    }

}