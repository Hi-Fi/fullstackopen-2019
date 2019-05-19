import React from 'react'
import Country from './country'

const Countries = (props) => {
  let i = 0
  let filteredCountries = props.countries.filter ( country => country.name.toLowerCase().includes(props.filter.toString().toLowerCase()))
  if (filteredCountries.length === 0 ) {
    return <div>No matches</div>
  } else if (filteredCountries.length === 1 ) {
    return <Country country={filteredCountries[0]} />
  } else if (filteredCountries.length < 10 ) {
    return filteredCountries.map ( country => 
        <p>{country.name}</p>
    )
  } else {
    return <div>Too many matches, specify another filter</div>
  }
}

export default Countries