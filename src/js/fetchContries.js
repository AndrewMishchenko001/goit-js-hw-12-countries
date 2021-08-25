const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

function fetchCountry(searchQuery) {
    return fetch(`${BASE_URL}${searchQuery}`)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
        
       
           return response.json()
        })
}

export default { fetchCountry };