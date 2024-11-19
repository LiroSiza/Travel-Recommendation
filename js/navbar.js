document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("#div-links a");
    const searchInput = document.getElementById('search-input');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });

    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        searchPlace();
      }
    });
});

function clear(){
  document.getElementById("search-input").innerHTML = " ";
}

let jsonData = [];  // Contains all the places from json
getData();
async function getData() {
    const url = "../API/travel_recommendation_api.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      
      jsonData = await response.json();
      console.log("Data loaded:", jsonData);

    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
}

function searchPlace(){  // Search places by keywords
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    let results = [];

    if (searchInput.includes("beach")) {
      jsonData.forEach(country => {  // Search by type = beach
        country.cities.forEach(city => {
          if (city.type.toLowerCase() === "beach") {
            results.push({
              country: country.name,
              city: city.name,
              imageURL: city.imageURL,
              description: city.description,
            });
          }
        });
      });
    } else if (searchInput.includes("temple")) {
      jsonData.forEach(country => {  // Search by type = temple
        country.cities.forEach(city => {
          if (city.type.toLowerCase() === "temple") {
            results.push({
              country: country.name,
              city: city.name,
              imageURL: city.imageURL,
              description: city.description,
            });
          }
        });
      });
    } else {
      jsonData.forEach(country => {  // Search by Country Name
        if (country.name.toLowerCase().includes(searchInput)) {
          country.cities.forEach(city => {  // Search by Country Name
              results.push({
                country: country.name,
                city: city.name,
                imageURL: city.imageURL,
                description: city.description
              });
          });
        }
      });
    }
    //  Display places
    const searchContainer = document.getElementById("search-container");
    var string = "";
    results.forEach(city => {
      console.log("Country: ",city.country);
      console.log("City: ",city.city);
      console.log("Img: ",city.imageURL);
      console.log("Desc: ",city.description);
      if(city.description.length > 48){
        string += `<div class='item'><div><img src='${city.imageURL}' alt='' width='100%' height='auto'></div><div id='item-text-box'><p id='item-text'><b id='black-text'>${city.city}, ${city.country}</b></p><p id='item-text-desc'>${city.description}</p><button id='btn-visit' type='button' class='btn btn-light'>Visit</button></div></div>`;
      }else{
        string += `<div class='item-2'><div><img src='${city.imageURL}' alt='' width='100%' height='auto'></div><div id='item-text-box'><p id='item-text'><b id='black-text'>${city.city}, ${city.country}</b></p><p id='item-text-desc'>${city.description}</p><button id='btn-visit' type='button' class='btn btn-light'>Visit</button></div></div>`;
      }
      });
    searchContainer.innerHTML = string;
}