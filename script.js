// to do: unique templates based on user selection of week/day/month

function generateAppHtml(dataArr) {
let appHtml = [];

dataArr.forEach(function(item){
    const { title, timeframes: {weekly: {current, previous}} } = item;
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

async function retrieveData(){
    const dataArr = await fetch('./data.json')
    .then(response => {
    return response.json();
})
generateAppHtml(dataArr);
};

retrieveData();