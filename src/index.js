import './css/styles.css';
import debounce from 'lodash.debounce';
import './fetchCountries';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require("lodash.debounce")

const refs = {
    countryСhoice: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info"),
    input: document.querySelector("#search-box"),
}
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener("input",debounce(onInput, DEBOUNCE_DELAY));


function onInput(e) {
  e.preventDefault();
// refs.countryСhoice.innerHTML = "";
  const nameCountry = refs.input.value.trim();
  
    if (nameCountry === "") {
      clearCountries();
      return
  };
  
  fetchCountries(nameCountry).then(lengthNameCountry).catch(onError);
   
}

function faindCountry(countries) {
  refs.countryInfo.innerHTML = "";

  const markupOne = countries
    .map(({ flags, name }) => {
      return `<li class="country-list__element">
    <img src="${flags.svg}" width="30" height="30" alt="">
               <p class="country-list__text">${name.common}</p></li>`; })
    .join("");
  
  refs.countryСhoice.innerHTML = markupOne;
 
};

function renderCountry(countries) {

    const markup = countries.map(({ name, capital, population, languages, flags }) => {
      return `<div class="country-info-card">
 <img src="${flags.svg}" width="45"  height="35" alt="">
  <p class="country-info__name">${name.official}</p></div>
  <p class="country-info__text">Capital: <span> ${capital} </span> </p>
  <p class="country-info__text">Population:<span> ${population} </span></p>
  <p class="country-info__text">Languages: <span>${Object.values(languages).join(',')} </span></p>`
    }).join("");
  
  
  refs.countryInfo.innerHTML =  markup;
};


function lengthNameCountry(country) {
  const countryLength = country.length;
  clearCountries();
  if (countryLength > 10) {
    clearCountries();
    info();
  }
  else if (countryLength >= 2 && countryLength <= 10) {
    refs.countryInfo.innerHTML = "";
    return faindCountry(country);
  }
  else if (countryLength === 1){
    clearCountries();
    return renderCountry(country);
  }
};

function onError() {
  clearCountries();
  Notiflix.Notify.failure("Oops, there is no country with that name.");
};
function info() {
  clearCountries();
  Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
};

function clearCountries() {
  refs.countryСhoice.innerHTML = "";
  refs.countryInfo.innerHTML = "";
};