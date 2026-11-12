const variaveis = [
   "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "precipitation_probability",
    "dew_point_2m",
    "precipitation",
    "rain",
    "snowfall",
    "snow_depth",
    "pressure_msl",
    "cloud_cover_mid",
    "visibility",
    "wind_speed_10m",
    "wind_direction_10m",
    "wind_gusts_10m",
    "soil_temperature_0cm",
    "soil_moisture_0_to_1cm" 
]

const URL_API = "https://api.open-meteo.com/v1/forecast";

async function buscarDadosAmbientais() {
    
    try {
        const parametros = new URLSearchParams({
            latitude: -23.550112,
            longitude: -46.824713,
            hourly: variaveis.join(","),
            timezone: "America/Sao_Paulo",
            forecast_days: 1
        })
        const resposta = await fetch(`${URL_API}?${parametros}`)
    
        if (!resposta.ok) {
            throw new Error("Erro ao consultar a API!");
        }

        const dados = await resposta.json();

        return dados;

    } catch (error) {
        console.console.log("Erro: ", error.message);
        
    }

}