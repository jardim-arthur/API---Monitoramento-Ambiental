import { buscarDadosAmbientais } from "./api.js";

async function iniciar() {
    
    const dados = await buscarDadosAmbientais();

    if(!dados) {
        console.log("Não foi possível obter os dados.");
        return;
    }

    console.log("Informações da localização: ");
    console.log(dados.latitude);
    console.log(dados.longitude);

    console.log("Unidades de medida:");
    console.log(dados.hourly_units);

    const previsao = dados.hourly.time.map((horario, indice) =>{

        return {
              horario: horario,
            temperatura: dados.hourly.temperature_2m[indice],
            umidade: dados.hourly.relative_humidity_2m[indice],
            sensacaoTermica: dados.hourly.apparent_temperature[indice],
            probabilidadeChuva: dados.hourly.precipitation_probability[indice],
            chuva: dados.hourly.rain[indice],
            pressao: dados.hourly.pressure_msl[indice],
            velocidadeVento: dados.hourly.wind_speed_10m[indice],
            visibilidade: dados.hourly.visibility[indice]
        };
    });

    console.table(previsao)
}

iniciar();