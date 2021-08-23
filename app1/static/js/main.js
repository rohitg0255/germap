//var input=document.getElementById("search").value;
//input.onkeyup = function() {
//  var l = input.length;
//  console.log(l);
//}
//function checkTextField(field) {
//  document.getElementById("error").innerText =
//    (field.value === "") ? "Field is empty." : "Field is filled.";
//}
var a=0;
var search;
var url=window.location.href;
var jsonres;
//var inlt=parseFloat(19.0760);
//var inln=parseFloat(72.8777);
//var incoords={'lt':inlt,'ln':inln};
function initMapfn(coords){
            var options={
            zoom:8,
            center:coords,
            }
            var map=new google.maps.Map(document.getElementById('map'),options);

            var marker = new google.maps.Marker({
            position:coords,
            map:map
            });

        }
function initMetafn(r){
console.log(r);
//    var metadata=document.getElementById('metadata');
//    metadata.innerHTML='';

    return `
        <div id='metadata'>
            <h2>city:${r.city}</h2>
            <h2>capital:${r.capital}</h2>
            <h2>country:${r.country}</h2>
            <h2>admin:${r.admin}</h2>
            <h2>iso:${r.iso2}</h2>
            <h3>Latitude:${r.lat}</h3>
            <h3>Longitude:${r.lng}</h3>
            <h2>Population:${r.population}</h2>
            <h2>Population_proper:${r.population_proper}</h2>
        </div>
    `

}
function radio(c){
    var lt=parseFloat(jsonres[c.id].lat);
    var ln=parseFloat(jsonres[c.id].lng);
    var meta=jsonres[c.id];
//    console.log(lt);console.log(typeof(ln));
    initMapfn({'lat':lt,'lng':ln});
    var metadata=initMetafn(meta);
    var metaHtml=document.getElementById('inmeta');
    metaHtml.value='';
    metaHtml.innerHTML=metadata;
//    console.log(1);
//    console.log(c);
//    console.log(2);
//    console.log(jsonres[c.id].lat);console.log(3);
//    console.log(c.lng);
    dropup();
}
function m(){
//var suggest='';
var suggest=document.getElementById('suggest');

var url=window.location.href;
url+=search ;
//console.log(search);
//console.log(url);
fetch(url)
    .then(res=>res.json())
    .then(function(data){
    jsonres=data;
//    console.log(jsonres);
//    console.log(typeof(data));
//    for( var i = 0; i < data.length; i++ )
// {
//    var o = data[i];
//    var li = document.createElement("li");
//    li.appendChild(document.createTextNode(o.city));
//    suggest.appendChild(li);
// }
    const cityli=data
    .map((dat,index)=>{

//        console.log(dat.city);
//console.log(index);
        return `
        <div class="citys">
        <div type="radio" name="city" id=${index} onclick="radio(this);"
        value=${dat.id}>${dat.city} | ${dat.lat} | ${dat.lng} </div>
        </div>
        `;
//             <label for="city${dat.id}">${dat.city}</label><br>



    })
    .join('');
    suggest.innerHTML= cityli;
//     console.log(data.length);
//     let size=Object.keys(data).length;
//     while(page<=size){
//        let low=data[page][0];
//        let high=data[page][1];
//
//     }
    })
}
function cool(d)
{
//var suggest2=document.getElementById('suggest');
//    document.getElementById("error").innerText =d.value.length;
    a=d.value.length;
    search=d.value;
    if(a>=1){
    m();
    }
    if(a==0){
    dropup();
    }
//    console.log(d.value);
//    m();
}

function dropup(){
var suggest2=document.getElementById('suggest');
var box=document.getElementById('box');
suggest2.innerHTML='';
box.value='';
}


//console.log(url);
//console.log(search)
//document.querySelector('.search').onkeyup = function(e){
// document.querySelector('#counter').innerHTML =
//               this.value.length < min
//               ? (min - this.value.length)+' to go...'
//               : '';
//document.addEventListener('DOMContentLoaded',initMap(19.0760,72.8777));
