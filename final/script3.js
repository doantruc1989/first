var headers = new Headers();
headers.append("X-CSCAPI-KEY", "dTBhWmVvRDkxOWFPRWpkS2FGbk9NTmlNZlJLR3FkR2NmOUZxcnJTRg==");
var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};
const url = "https://api.countrystatecity.in/v1/countries";
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
    var selectedCountry = countries.value;
    getStates(selectedCountry);
    clearStateCity();
})

async function getStates(selectedCountry) {
    var url2 = `${url}/${selectedCountry}/states/`;
    const response = await fetch(url2, requestOptions);
    const dataState = await response.json();
    for (let i = 0; i < dataState.length; i++) {
        states.innerHTML += `<option value="${dataState[i].iso2}">${dataState[i].name}</option>`;
    }
}

states.addEventListener('change', function () {
    var selectedState = states.value;
    var selectedCountry = countries.value;
    getCities(selectedState, selectedCountry);
    clearCity();
})

async function getCities(selectedState, selectedCountry) {
    var url3 = `${url}/${selectedCountry}/states/${selectedState}/cities`;
    const response = await fetch(url3, requestOptions);
    const dataCity = await response.json();
    console.log(dataCity);
    for (let i = 0; i < dataCity.length; i++) {
        cities.innerHTML += `<option value="${dataCity[i].name}">${dataCity[i].name}</option>`
    }
}

function clearStateCity() {
    states.value = "";
    states.innerHTML = `<option value="">--- Select State---</option>`;
    cities.value = "";
    cities.innerHTML = `<option value="">--- Select City---</option>`;
}

function clearCity() {
    cities.value = "";
    cities.innerHTML = `<option value="">--- Select City---</option>`;
}

function clearAll() {
    countries.value = "";
    states.value = "";
    states.innerHTML = `<option value="">--- Select State---</option>`;
    cities.value = "";
    cities.innerHTML = `<option value="">--- Select City---</option>`;
}

function saveData() {
    var selectedCountry = [countries.value, states.value, cities.value];
    localStorage.setItem("saved", selectedCountry);
}

function loadData() {
    var getItem = localStorage.getItem("saved");
    console.log(getItem);
    
    // var arr = getItem.split(",");
    const [savedCountry, savedState, savedCity ] = getItem.split(',');

    
    countries.value = savedCountry;
    getStates(savedCountry).then(() => {
        states.value = savedState;
    });

    getCities(savedState,savedCountry).then(() =>{
        cities.value = savedCity;
    })

    // if (countries.value == arr[0]) {
    //     // async function getState2() {
    //     //     var url2 = `${url}/${arr[0]}/states/`;
    //     //     const response = await fetch(url2, requestOptions);
    //     //     const dataState = await response.json();
    //     //     for (let i = 0; i < dataState.length; i++) {
    //     //         states.innerHTML += `<option value="${dataState[i].iso2}">${dataState[i].name}</option>`;
    //     //         states.value = arr[1];
    //     //     }
    //     // }
    //     // getState2();

    // }

    // if (states.value == arr[1]) {
    //     async function getCities2() {
    //         var url3 = `${url}/${arr[0]}/states/${arr[1]}/cities`;
    //         const response = await fetch(url3, requestOptions);
    //         const dataCity = await response.json();
    //         for (let i = 0; i < dataCity.length; i++) {
    //             cities.innerHTML += `<option value="${dataCity[i].name}">${dataCity[i].name}</option>`
    //             cities.value = arr[2];
    //         }
    //     }
    //     getCities2();
    // }
}