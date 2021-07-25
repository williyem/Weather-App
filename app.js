const api ={
    apiKey: "3d3e777c19eead46410a11f233ee16d1",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather?q=",
    baseImgUrl:"https://openweathermap.org/img/w/"
};

const input = document.querySelector("[data-city-input]");
const btn = document.querySelector("[data-button]");
const error = document.querySelector("[data-error]");
const city = document.querySelector("[data-city-name]");
const currentDate = document.querySelector("[data-date]");
const currentWeather = document.querySelector("[data-current-weather]");
const humidity = document.querySelector("[data-current-humidity]");
const temperature = document.querySelector("[data-current-temperature]");
const windSpeed = document.querySelector("[data-wind-speed]");
const weatherIcon = document.querySelector("[data-icon]");
const weatherName = document.querySelector("[ data-weather-name]");
currentDate.textContent = displayDate();
btn.addEventListener("click",fixInput);



function fixInput(event){
    event.preventDefault();
    getData();
    
}

function getData(){
    fetch(api.baseUrl+`${input.value}`+"&units=metric&appid="+`${api.apiKey}`)
    .then(response => response.json())
    .then(displayData);

}

function displayData(response){
    if(response.cod === "404"){
        error.textContent = "Please enter a valid city";
        input.value = "";
    }else{
        error.textContent = "";
        replaceDomData(response);
      
    }
    changeBackground(response);

    

}
function changeBackground(response){
    const weatherNameString = response.weather[0].main;
    switch(weatherNameString){
        case "Rain":
             document.body.style.backgroundImage = "url('img/rain.jpg')";
            break;
        case "thunder":
             document.body.style.backgroundImage = "url('img/thunder.jpg')";
            break;
        case "Clear":
             document.body.style.backgroundImage = "url('img/clear.jpg')";
            break;
        case "Clouds":
             document.body.style.backgroundImage = "url('img/cloudy.jpg')";
            break;
        case "Snow":
             document.body.style.backgroundImage = "url('img/snowy.jpg')";
            break;
    }
}

function replaceDomData(response){
    city.textContent = `${response.name}, ${response.sys.country}`;
    currentWeather.textContent =`weather: ${response.weather[0].description}`;
    humidity.textContent=`humidity:${response.main.humidity}%`;
    temperature.textContent =`temperature:${response.main.temp}°C`;
    input.textContent ="";
    weatherName.textContent = `${response.weather[0].main}`;
    input.value = "";
    windSpeed.textContent =`wind:${response.wind.speed}km/h`;

    
    weatherIcon.src =`${api.baseImgUrl}${response.weather[0].icon}.png`;

}

function displayDate() {
    monthsArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    daysArr = ["Sun","Mon","Tue","Wed","Thu","fri","Fri","Sat"];
       
   let date = new Date();

   let month = date.getMonth();
   let day = date.getDay();
   let dayNumber = date.getDate();
   let year = date.getFullYear();

  return theDate= `${daysArr[day]},${monthsArr[month]} ${dayNumber} ${year} `;




}



