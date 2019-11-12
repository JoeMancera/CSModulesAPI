const Confg = {
    instance : "http://explorationlab.techedgegroup.co"
    , domain:"http://explorationlab.techedgegroup.co/OTCS/cs.exe/api/"
    , url: {
        auth: "v1/auth"
        , ping: "v1/ping"
        , sInfo: "v1/serverinfo"
        , nodeInfo: {
            v2 : "v2/nodes/"
            ,v1: "v1/nodes/"
        }
    }
    , supportPath: '/OTCS/cs.exe/img'
    , types: { 
        folder: 0
        , shortcut: 1
        , category: 131
        , cdocument: 136
        , url : 140
        , document: 144
        , project: 202
        , tasklist: 204
        , taskgroup: 205
        , task: 206
        , channel: 207
        , news: 208
        , taskmilistone: 212
        , virtual_folder: 899
        , bussines_workspace: 848 
    }
};