let input_cidade = document.querySelector('.input-location');
let local_cidade = document.querySelector('.local');
let hours = document.querySelector('.hours');
let btn_procurar = document.querySelector('.btn-search');
let img = document.querySelector('.img-prevision');
let temperatura = document.querySelector('.temp');
let clima_cidade = document.querySelector('.about-prevision');
let humidade = document.querySelector('#humidity-porce');
let velocidade_vento = document.querySelector('#wind-km');
let box = document.querySelector('.box');
let container = document.querySelector('.container-content');
let container_error = document.querySelector('.container-error')

const lang = 'pt_br';
const chave_api = 'fd09144ec2677cbc9cfb5ee486269b3b';

async function previsao(cidade) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave_api}&units=metric&lang=${lang}`;

    const get_data = await fetch(`${url}`).then(Response => Response.json());
    console.log(get_data)

    const time_zone = {timezone :`${get_data.timezone}`};
    const horas = (-Math.sign(time_zone.timezone)) * Math.floor(Math.abs(time_zone.timezone) / 3600);
    const op = horas >= 0 ? '+' : '';
    const data = new Date();
    const data_temp = data.toLocaleString('pt-BR', { timeZone: `Etc/GMT${op}${horas}`})
    const hr_atual = new Array(data_temp.slice(12,14));
    const min_atual = new Array(data_temp.slice(15,17));

    // if (hr_atual[0] >= 0 || hr_atual[0] <= 11){
    //     hours.textContent = `${hr_atual}:${min_atual} AM`;
    // }else{
    //     hours.textContent = `${hr_atual}:${min_atual} PM`;
    // }

    hours.textContent = `${data.getHours}`
    if (get_data.cod == '404') {
        container_error.style.display = 'flex';
        container.style.display = 'none';
        box.style.height = '400px';
        box.style.backgroundImage = 'linear-gradient(#ffff,#ffff)';
        input_cidade.style.backgroundColor = '#e2effb';
        btn_procurar.style.backgroundColor = '#e2effb';
        return;
    } else {
        container.style.display = 'flex';
        container_error.style.display = 'none';
        box.style.height = '400px';
    }

    temperatura.innerHTML = `${get_data.main.temp.toFixed(0)}<sup>°C</sup>`;
    
    if (get_data.weather[0].main == 'Rain') {
        box.style.backgroundImage = 'linear-gradient(#DCE9F2 25%, #A7CCFC)';
        input_cidade.style.backgroundColor = '#e2effb';
        btn_procurar.style.backgroundColor = '#e2effb';
        img.src = 'assets/rain.png';
    } else if (get_data.weather[0].main == 'Clouds') {
        box.style.backgroundImage = 'linear-gradient(#FFDF01 10%, #C3C8C4 50%)';
        input_cidade.style.backgroundColor = '#F2F2C2';
        btn_procurar.style.backgroundColor = '#F2F2C2';
        img.src = 'assets/cloud.png';
    } else if (get_data.weather[0].main == 'Clear') {
        box.style.backgroundImage = 'linear-gradient(#FCD48F 55%, #FDC360)';
        input_cidade.style.backgroundColor = '#FBE6BF';
        btn_procurar.style.backgroundColor = '#FBE6BF';
        img.src = 'assets/clear.png';
    } else if (get_data.weather[0].main == 'Mist') {
        box.style.backgroundImage = 'linear-gradient(#C3C8C4 55%, #AEB1AE)';
        input_cidade.style.backgroundColor = '#D8DEDA';
        btn_procurar.style.backgroundColor = '#D8DEDA';
        img.src = 'assets/mist.png';
    } else {
        box.style.backgroundImage = 'linear-gradient(#C7FBFF 30%, #84D2EF)';
        input_cidade.style.backgroundColor = '#FFFFFF';
        btn_procurar.style.backgroundColor = '#FFFFFF';
        img.src = 'assets/snow.png';
    }

    local_cidade.textContent = `${get_data.name}` 
    clima_cidade.textContent = `${get_data.weather[0].description}`;
    humidade.textContent = `${get_data.main.humidity}%`;
    velocidade_vento.textContent = `${get_data.wind.speed * 3.701.toFixed()}Km/h`;
}   

btn_procurar.addEventListener('click', () => {
    previsao(input_cidade.value);
})


