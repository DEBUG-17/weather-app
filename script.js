const apiKey = '7f951856a1d171bd4c1d83724cce9297'; // Replace with your actual OpenWeatherMap API key

async function getWeather() {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput && cityInput.value ? cityInput.value : "";
    const weatherResult = document.getElementById("weatherResult");

    if (!city) {
        if (weatherResult) {
            weatherResult.innerHTML = `<div class="fade-in error">Please enter a city.</div>`;
        }
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        const { name, main, weather } = data;
        const icon = weather[0].icon;

        if (weatherResult) {
            weatherResult.innerHTML = `
                <div class="weather-card fade-in">
                    <h2>${name}</h2>
                    <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weather[0].description}" />
                    <p class="temp"><strong>${main.temp}°C</strong></p>
                    <p class="desc">${weather[0].main}</p>
                </div>
            `;
        }
    } catch (error) {
        if (weatherResult) {
            weatherResult.innerHTML = `<div class="fade-in error">Error: ${error instanceof Error ? error.message : String(error)}</div>`;
        }
    }
}

// Add this CSS to your HTML or a linked stylesheet for animation and design
const style = document.createElement('style');
style.innerHTML = `
.weather-card {
    background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
    padding: 24px 32px;
    text-align: center;
    max-width: 320px;
    margin: 32px auto 0 auto;
    animation: pop-in 0.5s cubic-bezier(.68,-0.55,.27,1.55);
}
.weather-icon {
    width: 100px;
    height: 100px;
    animation: float 2s infinite ease-in-out alternate;
}
.temp {
    font-size: 2.5rem;
    margin: 12px 0 4px 0;
    color: #333;
}
.desc {
    font-size: 1.2rem;
    color: #555;
    letter-spacing: 1px;
}
.fade-in {
    animation: fadeIn 0.7s;
}
.error {
    color: #fff;
    background: #ff5252;
    border-radius: 8px;
    padding: 12px;
    margin-top: 16px;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px);}
    to { opacity: 1; transform: translateY(0);}
}
@keyframes pop-in {
    0% { transform: scale(0.8);}
    100% { transform: scale(1);}
}
@keyframes float {
    0% { transform: translateY(0);}
    100% { transform: translateY(-12px);}
}
`;
document.head.appendChild(style);
