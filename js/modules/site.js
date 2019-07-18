function toggleSidebar() {
  var mini = localStorage.getItem("ot_menu_view");
  console.log(mini);
  if (mini == 'true') {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    localStorage.setItem("ot_menu_view", "false");
  } else {
    document.getElementById("mySidebar").style.width = "85px";
    document.getElementById("main").style.marginLeft = "85px";
    localStorage.setItem("ot_menu_view", "true");
  }
}

/***colocar usuario en el header***/
const userData = JSON.parse(window.sessionStorage.getItem('ot_user_data'));
document.querySelector('#current-user').innerHTML = userData.display_name;

function emptyTableNode(){
  const table = document.getElementById('node-children');
  let cellNumber = table.rows.length-1
  for (let i = 1; i <= cellNumber ; i++) {
    table.deleteRow(1);    
  }
  
}
