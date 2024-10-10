const apiKey = "f4083d1bd27cd3e11cb9e7ffb610185f"; //api key of weather

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // api url of weather

let city = "surat";

const searchBox = document.querySelector(".header input"); // serach box is selected
searchBox.value=""

const searchBtn = document.querySelector(".header button"); // serach button is selected

let weatherIcon = document.querySelector(".weather-icon"); // weather icon is selected

//function to fetch api of weather and get details

async function checkWeather(city) {
  let data = await fetch(apiUrl + city + `&appid=${apiKey}`); //fetching api

  //if wrong city name has enter then error will show
  if (data.status == 404) {
    document.querySelector(".error").style.display = "block"; //error will show
    document.querySelector(".weatherinfo").style.display = "none"; //weather info will hide
  } else {
    let result = await data.json(); // geting api data in json format

    // console.log(result)

    document.querySelector(".city").innerHTML = result.name; //updating city name
    document.querySelector(".temp").innerHTML =
      Math.round(result.main.temp) + "°C"; //updating city temperature
    document.querySelector(".humidity").innerHTML = result.main.humidity + "%"; //updating city humidity
    document.querySelector(".wind").innerHTML = result.wind.speed + " km/h"; //updating city wind speed

    weatherIcon.src = `images/${result.weather[0].main.toLowerCase()}.png`; //updating weather icon on the basis of weather

    // function to handle error when image of weather icon is not found
    weatherIcon.onerror = function () {
      weatherIcon.src = "images/clear.png"; // Set default image if the specific weather icon is not found
    };

    document.querySelector(".weatherinfo").style.display = "block"; //Show weather info if previously hidden
    document.querySelector(".error").style.display = "none"; // Hide error if previously shown
  }
}


// -------------------------------------------------------------------------------------------------------



//calling "checkWeather" function when search button is clicked
searchBtn.addEventListener("click", () => {
  if (searchBox.value.trim() !== "") {
    //if search box is not empty then run "checkWeather" function
    checkWeather(searchBox.value);
  } else {
    document.querySelector(".error").style.display = "block"; //Show error
    document.querySelector(".weatherinfo").style.display = "none"; // hide weather info
  }
});




// -------------------------------------------------------------------------------------------------------





//calling "checkWeather" function when key is pressed
searchBox.addEventListener("keypress", function (e) {
  //checking the key is "enter key" then run "checkWeather" function
  if (e.key === "Enter") {
    //checking search box is empty or not
    if (searchBox.value.trim() !== "") {
      //if search box is not empty then run "checkWeather" function
      checkWeather(searchBox.value);

    } else {
      document.querySelector(".error").style.display = "block"; //Show error
      document.querySelector(".weatherinfo").style.display = "none"; // hide weather info
    }
  }
});




// -------------------------------------------------------------------------------------------------------



