const apiKey = 'f4d2480458b2058e14f2bac6d120f3a9';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

let searchBox = document.querySelector('.search input');
let searchBtn = document.querySelector('.search button');
let weatherIcon = document.querySelector('.weather-icon');
//input di bawah di butuhkan untuk membuat enter bisa di gunakan
let input = document.querySelector('input');
// Function to fetch weather data
async function fetchWeatherData(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
      document.querySelector('.error').style.display = 'block';
      document.querySelector('.weather').style.display = 'none';
    } else {
      var data = await response.json();

      document.querySelector('.city').innerHTML = data.name;
      document.querySelector('.temp').innerHTML =
        Math.round(data.main.temp) + '°c';
      document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
      document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

      if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = 'images/clouds.png';
      } else if (data.weather[0].main == 'Clear') {
        weatherIcon.src = 'images/clear.png';
      } else if (data.weather[0].main == 'Rain') {
        weatherIcon.src = 'images/rain.png';
      } else if (data.weather[0].main == 'Drizzle') {
        weatherIcon.src = 'images/drizzle.png';
      } else {
        data.weather[0].main == 'Mist';
        weatherIcon.src = 'images/mist.png';
      }

      document.querySelector('.weather').style.display = 'block';
      document.querySelector('.error').style.display = 'none';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
}
searchBtn.addEventListener('click', () => {
  fetchWeatherData(searchBox.value);
});

//cara agar tombol enter dapat di gunakan pada saat search
input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    fetchWeatherData(searchBox.value);
  }
});
