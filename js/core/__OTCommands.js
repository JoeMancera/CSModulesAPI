let __OTConfig      = require('./__OTConfig.js');

global.__OTVARIABLES = [];

class __OTCommands {

    constructor() {
        this._OTConfig = new __OTConfig();
    }

    auth(username, password){
        return this._auth(username, password);
        
    }

    _auth(username, password){
        xml = xml || false;
        var _OTRequestData = new __OTRequestData();

        var url = this._OTConfig.__OTDOMAIN+'v1/auth/';

        return this.post(_OTRequestData);
    }
}
module.exports = __OTCommands;
