let dropdown = document.getElementById('cities');
dropdown.length = 0;

let offset=5.5;

const url = './assets/countries.json';

fetch(url).then(res => res.json())
.then(data => loadData(data))
.catch(err => console.log(err))


function loadData(data){
    for( row of data){
        opt = document.createElement('option');
        opt.text = row.name;
        opt.value = row.timezone_offset;
        if(opt.text == 'India'){
             opt.selected = "selected"
        }

        dropdown.options.add(opt);
    }
}

function updateLatLong(){
    let sel = document.getElementById('cities');
    let text = sel.options[sel.selectedIndex].text;
    fetch(url).then(res => res.json())
    .then(data => updatelatLongData(data,text))
    .catch(err => console.log(err))
    
}
function updatelatLongData(data,text){
    for(row of data){
        if(row.name == text){
            let d = document.getElementById("latlong");
            d.innerHTML = row.latlong;
            let city = document.getElementById("city");
            city.innerHTML = row.name;

            // setting offset to appopriate value
            offset = (row.timezone_offset);
            // alert(offset);
        }
    }
}

setInterval(getTime,1000);

function getTime(){
    let d = new Date()
    let localTime = d.getTime();
    let localOffset =d.getTimezoneOffset()*60000;
    let utc = localOffset + localTime;
    let nd = new Date(utc+ offset*3600000);
    h = nd.getHours();
    m = nd.getMinutes();
    s = nd.getSeconds();
    if (h>12){
        h = h%12;
        x = "PM";
    }else{
        x = "AM"
    }

    if (h<10){
        h = "0"+ h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    var time = h + ":" + m + ":" + s + " "+ x;
    document.getElementById("time").innerHTML = time;
}
