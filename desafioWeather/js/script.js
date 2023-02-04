//variáveis e seleção de elementos
const resultado = document.querySelector(".resultado"); 
const apiKey = "18364ebabe34dbb09ff4fa05d5f98bb4";  
const apiCountryURL = "https://countryflagsapi.com/png/";  
const requi = document.querySelector(".required")
const spans = document.querySelector('.span-requirid')
const inputLugar = document.querySelector("#input-lugar");
const btnBuscar = document.querySelector("#btn-buscar");
const dadosWeather = document.querySelector(".dados-weather");
const grauC = document.querySelector(".grauC");
const grauF = document.querySelector(".grauF");
const lugarElement = document.querySelector("#cidade");
const tempElementC = document.querySelector(".tempC");
const tempElementF = document.querySelector(".tempF");
const descElement = document.querySelector(".descrição");
const iconElement = document.querySelector("#icon-weather");
const countryElement = document.querySelector("#country");
const umidadeElement = document.querySelector(".umidade span");
const ventoElement = document.querySelector(".vento span");

//funções
const getDadosWeather = async (lugar) => {  
    const linkApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${lugar}&units=metric&appid=${apiKey}&lang=pt_br` 

    const res = await fetch(linkApiURL);
    const data = await res.json();

    return data;
}

const mostrarDadosWeather = async (lugar) => {
    const data = await getDadosWeather(lugar);

    let celcius = Math.round(parseFloat(data.main.temp));
	let fahrenheit = Math.round((9*celcius/5) + 32);

    lugarElement.innerText = data.name;
    tempElementC.innerHTML = celcius;
    tempElementF.innerHTML = fahrenheit; 
    descElement.innerText = data.weather[0].description;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    umidadeElement.innerText = `${data.main.humidity}%`;
    ventoElement.innerText = `${data.wind.speed}km/h`

}

function mostrarTemp() {
    let temp = tempElementC.style.display = "block";
    let tempF = tempElementF.style.display = "none"
    let dados = dadosWeather.style.display = "block" ;
    tempElementC.style.fontSize = "28px";
    let lugar = inputLugar.value;
    mostrarDadosWeather(lugar);
}

function setError() {
    requi.style.border = '2px solid #8d0f0f';
    spans.style.display = 'block';
}

function removeError() {
    requi.style.border = '';
    spans.style.display = 'none';
}


//eventos

btnBuscar.addEventListener("click", (event) => {
    event.preventDefault();
    if(requi.value.length == 0 ){
        setError();
    } else {
        removeError();
        mostrarTemp();
    }
}) 


inputLugar.addEventListener("keyup", (event) => {
    if(event === "Enter") {
        let lugar = event.target.value;
        mostrarDadosWeather(lugar);
    }
})

grauC.addEventListener("click", () => {
    let temp2 = tempElementC.style.display = "block"
    let tempF = tempElementF.style.display = "none"
    tempElementC.style.fontSize = "28px";
}) 

grauF.addEventListener("click", () => {
    let tempF = tempElementF.style.display = "block"
    let temp2 = tempElementC.style.display = "none"
    tempElementF.style.fontSize = "28px"
})
