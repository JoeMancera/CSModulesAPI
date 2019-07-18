async function infoNode(idNode){
    document.querySelector('#load').style = "display: block;"
    let node = await _getNode(idNode);
    let infoNode =  node.results.data;
    document.querySelector('#node-name').innerHTML = infoNode.properties.name
    let children = await _getChildren(idNode);
    emptyTableNode();
    const childs = children.data.length;
    
    for (let i = 0; i < childs; i++) {
        let tableRef = document.getElementById('node-children').getElementsByTagName('tbody')[0];
        let newRow   = tableRef.insertRow();
        let newCell0  = newRow.insertCell(0);
        let nameNode  = document.createTextNode(children.data[i].name);
        
        switch (children.data[i].type) {
            case Confg.types.folder:
                newCell0.setAttribute('onclick', `infoNode(${children.data[i].id})` );
                break;
            case Confg.types.shortcut:
                newCell0.setAttribute('onclick', `infoNode(${children.data[i].original_id})` );
                break;
            case Confg.types.document:
                newCell0.setAttribute('onclick', `window.open('${Confg.instance}${children.data[i].actions[0].url}', '_blank')` );
                break;
            default:
            newCell0.setAttribute('onclick', `infoNode(${children.data[i].id})` );
            break;
        }
        
        newCell0.appendChild(nameNode);
        newCell0.style.cursor='pointer';
        newCell0.classList.add("item-node-list");
        let newCell1  = newRow.insertCell(1);
        let typeNode  = document.createTextNode(children.data[i].type_name);
        newCell1.appendChild(typeNode);
        let newCell2  = newRow.insertCell(2);
        let contNode  = document.createTextNode(children.data[i].size_formatted);
        newCell2.appendChild(contNode);
        let newCell3  = newRow.insertCell(3);
    }
    document.querySelector('#load').style = "display: none;"
    return true;
}