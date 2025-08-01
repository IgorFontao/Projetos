document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        alert('Você precisa digitar uma cidade...');
        return;
    }
    const apiKey = 'bd9c24a5e7f94f6445269de16ba50e91'
    const apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${APIkey}&units=metric&lag=pt_br'

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0],icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector("#weather").classList.add.remove('show');
        showALert(`
            Não foi possivel localizar...
            
            <img src="src/images/not-found.svg"/>
            `)
    }
});

function showALert(json){
    showALert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#tittle').innerHTML = '${json.city}, ${json.country}';

    document.querySelector('#temp_value').innerHTML = '${json.temp.toFixed(1).toString().replace(`.`, ',')} <sup>C°</sup>';
    document.querySelector('#temp_description').innerHTML = '${json.descriptio}';
    document.querySelector('#temp_img').setAttribute('src', 'https://openweathermap.org/img/wn/${json.tempIcon}@2x.png')
    
    document.querySelector('#temp_max').innerHTML = '${json.tempMax.toFixed(1).toString().replace(. ,)} <sup>C°</sup>';
    document.querySelector('#temp_min').innerHTML = '${json.tempMinn.toFixed(1).toString().replace(. ,)} <sup>C°</sup>';
    document.querySelector('#humidity').innerHTML = '${json.humidity}%';
    document.querySelector('#windy').innerHTML = '${json.humidity,toFixed(1)}km/h';
}

function showALert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}

