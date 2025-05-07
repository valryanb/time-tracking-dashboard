let dataArr;

async function retrieveData(){
    dataArr = await fetch('./data.json')
    .then(response => {
    return response.json();
})
generateAppHtml(dataArr);
};

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

function renderUserContent(){
    document.getElementById("user-content").innerHTML= `<div id="user-card" style="grid-area: box-1">
  <div id="user-profile">
    <div id="user-detail">
    <img src="/images/image-jeremy.png" id="user-icon" alt="An image of the user Jeremy Robson, a smiling young bearded man.">
  <span class="subheading">Report for</span>
  <h1>Jeremy Robson</h1></div>
  </div>
  <section id="links">
  <button id="daily">Daily</button>
    <button id="weekly">Weekly</button>
      <button id="monthly"> Monthly</button></section>
</div>`
  }

function updateAppHtml(dataArr, timeSelection = "weekly"){
    renderUserContent()
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
};

function generateAppHtml(dataArr, timeSelection = "weekly") {
let appHtml = [];
let previousTimescale;

dataArr.forEach(function(item){
    const { title, timeframes } = item;
    const { current, previous } = timeframes[timeSelection];
    
    switch (timeSelection) {
    case "weekly":
        previousTimescale = "Last Week";
        break;
    case "monthly":
        previousTimescale = "Last Month";
        break;
    case "daily":
        previousTimescale = "Yesterday";
        break;
    };

    appHtml += `
    <div class="info-card">
  <div class="banner ${title.toLowerCase().replace(/ /g, '-')}" style="grid-area: box-2"></div>

  <div class="card-details">
  <p>${title}</p>
  <img src="/images/icon-ellipsis.svg" class="hamburger-menu">
  <h2>${current}hrs</h2>
  <span class="previous">${previousTimescale} - ${previous}hrs</span>
</div>
</div>
    `
});
return document.getElementById("feed-content").innerHTML = appHtml;
}

renderUserContent();
retrieveData();