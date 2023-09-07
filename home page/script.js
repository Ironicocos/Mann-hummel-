const memberButton = document.getElementById('memberList');
let isShown = false;
function toggleList (){
    if (isShown){
        document.getElementById('list').style.display = 'none'
        document.getElementById('list').style.width = '0px'

        isShown = false;
    }
    else{    
        document.getElementById('list').style.display = 'block'
        document.getElementById('list').style.width = '250px'
        isShown = true;
    }
}
