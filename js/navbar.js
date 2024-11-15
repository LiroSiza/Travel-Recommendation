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
    results.forEach(city => {
      console.log("Country: ",city.country);
      console.log("City: ",city.city);
      console.log("Img: ",city.imageURL);
      console.log("Desc: ",city.description);
    });
}