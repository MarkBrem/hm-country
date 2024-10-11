// 1. Створити функцію fetchCountreisByName яка буде отримувати назву країни і повертати розпарсені данні
// 2. Створити функцію showNotification 
// 3. Створити функцію createCountriesList яка буде отримувати масив країн і повертати список назв країн
// 4. Створити функцію createCountryCard яка буде отримувати обєкт країни і повертати розмітку картки однієї країни
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
 
defaultModules.set(PNotifyMobile, {});
 

const containerRef = document.querySelector('.container')
const inputRef = document.querySelector('.input')
const listRef = document.querySelector('.list')

inputRef.addEventListener('input', onSearchInput)

function onSearchInput(){
    fetchCountriesByName(event.target.value)
}

function fetchCountriesByName(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => response.json())
}

function showNotification(){
    alert({
        text: 'Notice me, senpai!'
      });
}

function createCountriesList(countries){
    return countries.map((country)=>{
        return`
        <li>
        <p>${country.name.officia}</p>
        </li>
        `
    })
}

function createCountryCard(country){
    return `<h1></h1>
        <p class="capital">capital:${country.capital}</p>
        <p class="population">population: ${country.population}</p>
        <ul class="languages">languages:${country.languages.map(lang =>`<li>${lang.name}</li>`).join(', ')}</ul>
        <img src="${country.flag}>`}
