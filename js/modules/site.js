var mini = true;

function toggleSidebar() {
  if (mini) {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    this.mini = false;
  } else {
    document.getElementById("mySidebar").style.width = "85px";
    document.getElementById("main").style.marginLeft = "85px";
    this.mini = true;
  }
}

/***colocar usuario en el header***/
const userData = JSON.parse(window.sessionStorage.getItem('ot_user_data'));
document.querySelector('#current-user').innerHTML = userData.display_name;
