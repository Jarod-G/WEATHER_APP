const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');


search.addEventListener('click', () => {

    const APIKey = 'YOUR_API_KEY';
    const city = document.querySelector('.search-box input').value;

    if(city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if(json.cod == '404'){
            container.style.height = '450px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            notFound.style.display = 'block';
            notFound.classList.add('fadeIn');
            return;
        }

        notFound.style.display = 'none';
        notFound.classList.remove = 'fadeIn';

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temp');
        const description = document.querySelector('.weather-box .desc');

        const humidity = document.querySelector('.humidity span');
        const windSpeed = document.querySelector('.wind-speed span');

        switch (json.weather[0].main){
            case "Clear":
                image.src = 'ressources/clear.png';
                break;
            case "Clouds":
                image.src = 'ressources/clouds.png';
                break;
            case "Drizzle":
                image.src = 'ressources/drizzle.png';
                break;
            case "Mist":
                image.src = 'ressources/mist.png';
                break;
            case "Rain":
                image.src = 'ressources/rain.png';
                break;
            case "Snow":
                image.src = 'ressources/snow.png';
                break;
            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)} °C`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
        windSpeed.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';


    });
});