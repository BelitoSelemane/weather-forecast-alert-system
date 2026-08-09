// Seleciona os elementos do HTML que vamos manipular
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const alertBox = document.getElementById('alertBox');
const forecastSection = document.getElementById('forecastSection');

// Dados falsos (mock) - vamos trocar pela API real no próximo assignment
const mockWeatherData = {
    city: "Maputo",
    temp: 32,
    description: "Strong wind alert",
    humidity: 65,
    windSpeed: 45,
    forecast: [
        { day: "Tomorrow", temp: 30 },
        { day: "Day after Tomorrow", temp: 29 },
        { day: "in 3 days", temp: 33 }
    ]
};

// Função principal: busca (simulada) e atualiza a tela
function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("please, put city name.");
        return;
    }

    // Por enquanto, usamos sempre os dados mock, só trocando o nome da cidade
    const data = { ...mockWeatherData, city: city };

    updateWeatherCard(data);
    checkAlert(data);
    updateForecast(data.forecast);
}

// Atualiza o card principal do clima (DOM Manipulation)
function updateWeatherCard(data) {
    cityName.textContent = data.city;
    temperature.textContent = `${data.temp} °C`;
    description.textContent = data.description;
    humidity.textContent = `Umidade: ${data.humidity} %`;
    wind.textContent = `Vento: ${data.windSpeed} km/h`;
}

// Verifica se deve mostrar um alerta
function checkAlert(data) {
    alertBox.innerHTML = ""; // limpa alertas anteriores

    if (data.temp >= 35) {
        alertBox.innerHTML = "⚠️ alert extreme heat!";
    } else if (data.windSpeed >= 60) {
        alertBox.innerHTML = "⚠️ alert  strong wind !";
    }
    // Se nenhuma condição for atingida, a caixa fica vazia (sem alerta)
}

// Atualiza a secção de previsão dos próximos dias
function updateForecast(forecast) {
    forecastSection.innerHTML = ""; // limpa antes de recriar

    forecast.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `<p>${item.day}</p><strong>${item.temp}°C</strong>`;
        forecastSection.appendChild(card);
    });
}

// Evento: quando o botão é clicado, busca o clima
searchBtn.addEventListener('click', getWeather);

// Bónus: permite pesquisar pressionando Enter no input
cityInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});