const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(searchQuery) {
    return fetch(`${BASE_URL}/name/${searchQuery}`)
        .then(async response => {
            const res = await response.json()
        //   console.log('res :>> ', res);
           return res
        })
}

export default { fetchCountry };