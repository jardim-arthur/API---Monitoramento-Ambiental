
import { buscarDadosAmbientais } from "./api.js";

async function iniciar() {

    const dados = await buscarDadosAmbientais();

    if (!dados) {
        console.log("Não foi possível obter os dados.");
        return;
    }

    const unidades = dados.hourly_units;

    // Dados da primeira hora disponível
    const temperatura = dados.hourly.temperature_2m[0];
    const umidade = dados.hourly.relative_humidity_2m[0];
    const sensacao = dados.hourly.apparent_temperature[0];
    const pressao = dados.hourly.pressure_msl[0];
    const vento = dados.hourly.wind_speed_10m[0];
    const visibilidade = dados.hourly.visibility[0];

    // Exibindo os dados nos cartões
    document.getElementById("temperatura").textContent =
        `${temperatura} ${unidades.temperature_2m}`;

    document.getElementById("umidade").textContent =
        `${umidade} ${unidades.relative_humidity_2m}`;

    document.getElementById("sensacao").textContent =
        `${sensacao} ${unidades.apparent_temperature}`;

    document.getElementById("pressao").textContent =
        `${pressao} ${unidades.pressure_msl}`;

    document.getElementById("vento").textContent =
        `${vento} ${unidades.wind_speed_10m}`;

    document.getElementById("visibilidade").textContent =
        `${visibilidade} ${unidades.visibility}`;

    // Organizando os dados por horário
    const previsao = dados.hourly.time.map((horario, indice) => {

        return {
            horario: horario,
            temperatura: dados.hourly.temperature_2m[indice],
            umidade: dados.hourly.relative_humidity_2m[indice],
            chuva: dados.hourly.rain[indice],
            probabilidadeChuva: dados.hourly.precipitation_probability[indice],
            pressao: dados.hourly.pressure_msl[indice],
            velocidadeVento: dados.hourly.wind_speed_10m[indice]
        };

    });

    // Exibindo a previsão na tabela
    const tabela = document.getElementById("tabelaPrevisao");

    tabela.innerHTML = previsao.map(item => {

        return `
            <tr>
                <td>${item.horario.replace("T", " ")}</td>
                <td>${item.temperatura} ${unidades.temperature_2m}</td>
                <td>${item.umidade} ${unidades.relative_humidity_2m}</td>
                <td>${item.chuva} ${unidades.rain}</td>
                <td>${item.probabilidadeChuva} ${unidades.precipitation_probability}</td>
                <td>${item.pressao} ${unidades.pressure_msl}</td>
                <td>${item.velocidadeVento} ${unidades.wind_speed_10m}</td>
            </tr>
        `;

    }).join("");

}

iniciar();
