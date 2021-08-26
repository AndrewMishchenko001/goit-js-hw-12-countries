import { refs } from "./refs";
import { debounce } from "lodash";
import API from "./fetchContries";
import countryCard from "../templates/cards.hbs";
import countriesList from "../templates/country-list.hbs";
import { error } from "@pnotify/core";
import '@pnotify/core/dist/BrightTheme.css';

refs.input.addEventListener('input', debounce(onInputFill, 500));

function onInputFill() {
    
    const searchQuery = refs.input.value.trim();
    if (!searchQuery) {
        return;
    }
API.fetchCountry(searchQuery)
    .then(renderCountryCard)
    .catch(() => {
    onFetchError()
    })
};


function renderCountryCard(countries) {
    if (countries.length >= 10) {
        toMuchCountriesMessage();
    } else if
        (countries.length <= 10 && countries.length > 1) {
        refs.cardContainer.innerHTML = countriesList(countries);
    } else {
        
        refs.cardContainer.innerHTML = countryCard(countries[0])
        refs.input.value = '';
        }
}



function toMuchCountriesMessage() {
    error({
        title: 'Много стран с такими данными',
        text: 'Введи больше букв в запросе',
        delay: 2500,
        closerHover: true,
    },);
}

function onFetchError() {
  
        error({
            title: 'Нет таких стран',
            text: 'Проверь правильность ввода',
            delay: 2500,
            closerHover: true,
        })
    };
    
