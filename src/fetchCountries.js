function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
.then(res => res.json())
}
export default fetchCountries
