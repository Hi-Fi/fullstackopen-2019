import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import axios from 'axios'
import Countries from './components/countries';

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ filter, setFilter] = useState([]) 

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />

      <Countries countries={countries} filter={filter} onClick={setFilter}/>
    </div>
  )

}

export default App