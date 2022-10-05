var headers = new Headers();
headers.append("X-CSCAPI-KEY", "dTBhWmVvRDkxOWFPRWpkS2FGbk9NTmlNZlJLR3FkR2NmOUZxcnJTRg==");
var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};
var url = "https://api.countrystatecity.in/v1/countries";
let countries = document.getElementById('country');
let states = document.getElementById('state');
let cities = document.getElementById('city');

async function getCountries() {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        countries.innerHTML += `<option value="${data[i].iso2}">${data[i].name}</option>`;
    }
}
getCountries();

countries.addEventListener('change', function () {
    var selectedCountry = this.value;
    getStates(selectedCountry);
})

async function getStates(selectedCountry) {
    var url2 = `${url}/${selectedCountry}/states/`;
    console.log(url2);
    const response = await fetch(url2, requestOptions);
    const dataState = await response.json();
    for (let i = 0; i < dataState.length; i++) {
        states.innerHTML += `<option value="${dataState[i].iso2}">${dataState[i].name}</option>`;
    }
}

states.addEventListener('change', function () {
    var selectedState = this.value;
    var selectedCountry = countries.value;
    getCities(selectedState, selectedCountry);
})

async function getCities(selectedState, selectedCountry) {
    var url3 = `${url}/${selectedCountry}/states/${selectedState}/cities`;
    console.log(url3);
    const response = await fetch(url3, requestOptions);
    const dataCity = await response.json();
    console.log(dataCity);
    for (let i = 0; i< dataCity.length; i++) {
        cities.innerHTML += `<option>${dataCity[i].name}</option>`
    }
}

function clearCountry() {
    url = "https://api.countrystatecity.in/v1/countries";
    getCountries();
}

function clearState() {
    var selectedCountry = countries.value;
    var url2 = `${url}/${selectedCountry}/states/`;
    getStates(selectedCountry);
}

function clearAll() {
    clearCountry();
    clearState();
    var selectedCountry = countries.value;
    var selectedState = states.value;
    getCities(selectedState, selectedCountry);
}