import fetchCountries from './fetchCountries'
import debounce from 'lodash.debounce'
import { error, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaultModules.set(PNotifyMobile, {});

const searchQuery = document.querySelector('.search')
const resultsContainer = document.querySelector('.country-info')
const counryList = document.querySelector('.country-list')


searchQuery.addEventListener('input', debounce((e) => {
    resultsContainer.innerHTML = '';
    counryList.innerHTML = '';
    const query = e.target.value.trim();
    if (!query) return;

    fetchCountries(searchQuery.value).then(countries => {
        if (countries.length === 1) {
            createCounryCard(countries)
        } else if(countries.length > 1 && countries.length <= 10){
            createCounryList(countries)
        }else if (countries.length > 10) {
            createNotification('Too many matches found. Please enter a more specific query.');
        }
    }
    ).catch(err => createNotification('Country not found.'));
    e.target.value = ''
}, 500))

function createCounryList(countries) {
    const listMarkup = countries.map(country => {
        return `<li>${country.name.official}</li>`
    }).join('')
counryList.innerHTML = listMarkup
}

function createCounryCard(country) {
    const languages = country[0].languages;
    const languageKeys = Object.keys(languages);
    const language = languageKeys.map(lang => `<li>${languages[lang]}</li>`).join(' ')
const cardMarkup = `<h1>${country[0].name.official}</h1>
<p>Capital: ${country.capital}</p>
<p>Population: ${country.population}</p>
<ul>Languages: ${language}</ul>
<img src="${country[0].flags.png}" alt="Flag of ${country[0].flags.alt}">
`
resultsContainer.innerHTML = cardMarkup
}

function createNotification(message) {
    error({
        text: 'message',
            type: 'info',
        delay: 500,
    })
}
