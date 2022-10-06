var headers = new Headers();
headers.append("X-CSCAPI-KEY", "dTBhWmVvRDkxOWFPRWpkS2FGbk9NTmlNZlJLR3FkR2NmOUZxcnJTRg==");
var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

const url = "https://api.countrystatecity.in/v1/countries";
let countries = $('#country');
let states = $('#state');
let cities = $('#city');

async function getCountries() {
    const response = await fetch(url, requestOptions);
    const dataCountry = await response.json();
    for (let i = 0, len = dataCountry.length; i < len; i++) {
        // countries.innerHTML += `<option value='${dataCountry[i].iso2}'>${dataCountry[i].name}</option>`;
        countries.append(`<option value='${dataCountry[i].iso2}'>${dataCountry[i].name}</option>`);
    }
}
getCountries();

async function getStates(selectedCountry) {
    let url2 = `${url}/${selectedCountry}/states/`;
    const response = await fetch(url2, requestOptions);
    const dataState = await response.json();
    for (let i = 0, len = dataState.length; i < len; i++) {
        states.append(`<option value='${dataState[i].iso2}'>${dataState[i].name}</option>`);
    }
};

async function getCities(selectedCountry, selectedState) {
    let url3 = `${url}/${selectedCountry}/states/${selectedState}/cities`;
    const response = await fetch(url3, requestOptions);
    const dataCity = await response.json();
    for (let i = 0, len = dataCity.length; i < len; i++) {
        cities.append(`<option value='${dataCity[i].name}'>${dataCity[i].name}</option>`);
    }
};



countries.change(function () {
    var selectedCountry = countries.val();
    getStates(selectedCountry);
    clearStateCity();
})

states.change(function () {
    var selectedCountry = countries.val();
    var selectedState = states.val();
    getCities(selectedCountry, selectedState);
    clearCity();
})

function clearStateCity() {
    states.value = "";
    states.html(`<option value="">--- Select State---</option>`);
    cities.value = "";
    cities.html(`<option value="">--- Select City---</option>`);
}

function clearCity() {
    cities.value = "";
    cities.html(`<option value="">--- Select City---</option>`);
}

function clearAll() {
    getCountries();
    countries.value = "";
    countries.html(`<option value="">--- Select Country---</option>`);
    states.value = "";
    states.html(`<option value="">--- Select State---</option>`);
    cities.value = "";
    cities.html(`<option value="">--- Select City---</option>`);
}

function saveData() {
    var selectedCountry = [countries.val(), states.val(), cities.val()];
    localStorage.setItem("saved", selectedCountry);
}

function loadData() {
    var getItem = localStorage.getItem("saved");
    console.log(getItem);
    const [savedCountry, savedState, savedCity] = getItem.split(',');

    countries.val(savedCountry);

    getStates(savedCountry).then(() => {
        states.val(savedState);
    });

    getCities(savedCountry,savedState).then(() => {
        cities.val(savedCity);
    })
}

