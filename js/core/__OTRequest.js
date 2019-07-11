async function __OTPostRequest(data, method, url, headers) {  
    let res;
    let myInit = { 
        //mode: 'no-cors',
        method: method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        cache: 'default',
        body: data, // data can be `string` or {object}! 
    };
    await fetch(url, myInit)
    .then((response) => {
        if (response.ok){
            res = response.json();
        } else {
            throw new Error('Algo anda mal:' + response.statusText);
        }
    })
    .catch(error => {
        console.log(error)
    });
    return res;
}