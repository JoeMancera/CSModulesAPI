function __OTPostRequest(data, method, url, headers) {       
    return fetch(url, {
        method: method, // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: headers
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));    
}