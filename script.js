let dataArr;

async function retrieveData(){
    dataArr = await fetch('./data.json')
    .then(response => {
    return response.json();
})
generateAppHtml(dataArr);
};

retrieveData();

document.addEventListener("click", function(e){
    if(e.target.id === "weekly"){
        generateAppHtml(dataArr,"weekly");
      document.getElementById("weekly").classList.toggle("active");
    }

    else if(e.target.id === "daily"){
        generateAppHtml(dataArr,"daily");
        document.getElementById("daily").classList.toggle("active");
      }

      else if(e.target.id === "monthly"){
        generateAppHtml(dataArr,"monthly");
        document.getElementById("monthly").classList.toggle("active");
      }
  });

function generateAppHtml(dataArr, timeSelection = "weekly") {
let appHtml = [];

dataArr.forEach(function(item){
    const { title, timeframes } = item;
    const { current, previous } = timeframes[timeSelection];
    
    appHtml += `
    <div class="info-card">
  <div class="banner ${title.toLowerCase().replace(/ /g, '-')}" style="grid-area: box-2"></div>

  <div class="card-details">
  <p>${title}</p>
  <img src="/images/icon-ellipsis.svg" class="hamburger-menu">
  <h2>${current}hrs</h2>
  <span class="previous">Last Week - ${previous}hrs</span>
</div>
</div>
    `
})
return document.getElementById("feed-content").innerHTML += appHtml
}