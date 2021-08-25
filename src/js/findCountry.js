import { refs } from "./refs";
import { debounce } from "lodash";
import API from "./fetchContries";
import countryCard from "../templates/cards.hbs";
import countriesList from "../templates/country-list.hbs";

import { error } from "@pnotify/core";
import '@pnotify/core/dist/BrightTheme.css';

refs.input.addEventListener('input', debounce(onInputFill, 500));




function onInputFill(e) {
    e.preventDefault();
    const form = e.target;
    const searchQuery = refs.input.value;

    API.fetchCountry(searchQuery)
        .then((res) => {
            if (res.status > 400) { throw new Error(res.status) } else return res
        })
        .then(renderCountryCard)
        .catch(() => {
            
          onFetchError()
        })
        .finally(() => form.reset);
};


function renderCountryCard(countries) {
    if (countries.length >= 10) {
        toMuchCountriesMessage();
    } else if
        (countries.length < 10 && countries.length > 1) {
        refs.cardContainer.innerHTML = countriesList(countries);
    } else if
        (countries.length === 1) {
        refs.cardContainer.innerHTML = countryCard(countries[0]);

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
    
