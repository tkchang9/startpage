import './styles/main.scss';

// Date function
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    if (m < 10) {m = "0" + m};
    document.getElementsByClassName('time')[0].innerHTML = 
        // h + ":" + m;
        `${h}:${m}`;
}

// Toggle links bar
const links = document.getElementsByClassName('links');
const linksBar = document.getElementsByClassName('left-bar-links')[0];
const categories = document.getElementsByClassName('category');

function linkShow() {
    const catNum = this.classList[1];
    const linkCat = document.getElementsByClassName(catNum)[1]
    if (this.classList.contains('active')) {
        // not applied in css so that on load the animation does not occur.
        // this allows the animation to display on open and close of links bar.
        linksBar.style.transition = '.5s ease-in-out';
        linksBar.classList.remove('open');
        // linkCat.style.display = 'none';
        this.classList.remove('active');
    } else {
        Array.from(categories).forEach(element => {
            element.classList.remove('active');
        });
        Array.from(links).forEach(element => {
            element.style.display = 'none';
        });
        linksBar.classList.add('open');
        linkCat.style.display = 'block';
        this.classList.add('active');
    }
}

// Weather
const city = 6167865; //Toronto
const API_KEY = 'decced15b101d1b855dac9a0d7c4d10e';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?id=';
const weatherDiv = document.getElementsByClassName('weather')[0];
fetch(API_URL+city+'&units=metric'+'&APPID='+API_KEY).then(response=>response.json()).then(
    json => {
        // console.log(json);
        const temperature = parseInt(json.main.temp);
        const icon = json.weather[0].id;
        // console.log('temperature', temperature);
        // console.log('icon', icon);
        weatherDiv.innerHTML = `<i class="wi wi-owm-${icon}"></i>
        <span class="temperature">${temperature}&deg;C</span>`
    }
)

// Setting Event Listeners onto page
Array.from(categories).forEach(element => {
    element.addEventListener("click", linkShow); 
});

setInterval(startTime, 1000);
window.onload = startTime();