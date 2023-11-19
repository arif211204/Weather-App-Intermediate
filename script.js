const apiKey = 'f4d2480458b2058e14f2bac6d120f3a9';
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=';

let searchBox = document.querySelector('.search input');
let searchBtn = document.querySelector('.search button');
let weatherIcon = document.querySelector('.weather-icon');
//input di bawah di butuhkan untuk membuat enter bisa di gunakan
let input = document.querySelector('input');
// Function to fetch weather data
async function fetchWeatherData(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = response.data;

    if (response.status === 404) {
      console.log('City not found');
      // Handle the case where the city is not found
    } else {
      if (data.name) {
        console.log('City:', data.name);
        console.log('Temperature:', Math.round(data.main.temp) + '°C');
        console.log('Humidity:', data.main.humidity + '%');
        console.log('Wind speed:', data.wind.speed + ' km/h');

        let weatherIcon;

        switch (data.weather[0].main) {
          case 'Clouds':
            weatherIcon = 'images/clouds.png';
            break;
          case 'Clear':
            weatherIcon = 'images/clear.png';
            break;
          case 'Rain':
            weatherIcon = 'images/rain.png';
            break;
          case 'Drizzle':
            weatherIcon = 'images/drizzle.png';
            break;
          default:
            weatherIcon = 'images/mist.png';
        }

        console.log('Weather icon:', weatherIcon);
      } else {
        console.log('City name not available in the response');
        // Handle the case where the city name is not available
      }
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
