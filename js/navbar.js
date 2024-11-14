document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("#div-links a");

    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
});

async function getData() {
    const url = "../API/travel_recommendation_api.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }

function searchPlace(){
    const searchInput = document.getElementById("search-input").textContent.toLowerCase();
    if(searchInput.includes("beach")){ // Verify if the input contains the word "beach"
        getData(); // Get data from JSON
    }else if(searchInput.includes("temple")){ // Verify if the input contains the word "temple"
        getData(); // Get data from JSON
    }else if(searchInput.includes("country")){ // Verify if the country
        getData(); // Get data from JSON
    }
  }