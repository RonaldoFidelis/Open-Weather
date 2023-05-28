let input_cidade = document.querySelector('.input-location');
let btn_procurar = document.querySelector('.btn-search');
let img = document.querySelector('.img-prevision');
let temperatura = document.querySelector('.temp');
let clima_cidade = document.querySelector('.about-prevision');
let humidade = document.querySelector('#humidity-porce');
let velocidade_vento = document.querySelector('#wind-km');
let box = document.querySelector('.box')
let container = document.querySelector('.container-content');
let container_error = document.querySelector('.container-error')


async function previsao(cidade) {
    const lang = 'pt_br';
    const chave_api = 'fd09144ec2677cbc9cfb5ee486269b3b'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave_api}&units=metric&lang=${lang}`

    const get_data = await fetch(`${url}`).then(Response => Response.json());

    if (get_data.cod == '404') {
        container.style.display = 'none';
        container_error.style.display = 'flex';
        return;
    }

    container.style.display = 'flex';
    box.style.height = '400px';
    temperatura.innerHTML = `${get_data.main.temp.toFixed(0)}<sup>°C</sup>`;

    clima_cidade.textContent = `${get_data.weather[0].description}`;
    
    humidade.textContent = `${get_data.main.humidity}%`;
    velocidade_vento.textContent = `${get_data.wind.speed * 3.701.toFixed()}Km/h`

    if (get_data.weather[0].main == 'Rain') {
        img.src = 'assets/rain.png'
    } else if (get_data.weather[0].main == 'Clouds') {
        img.src = 'assets/cloud.png'
    } else if (get_data.weather[0].main == 'Clear') {
        img.src = 'assets/clear.png'
    } else if (get_data.weather[0].main == 'Mist') {
        img.src = 'assets/mist.png'
    } else {
        img.src = 'assets/snow.png'
    }
}

btn_procurar.addEventListener('click', () => {
    previsao(input_cidade.value);
})


