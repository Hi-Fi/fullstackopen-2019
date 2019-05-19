import React from 'react'

const Country = (props) => {
    let country = props.country
    
    const Languages = (props) => (
        props.languages.map ( language => 
            <li>{language.name}</li>
    )
    )

    return (
    <div id={country.name}>
        <h1>
            {country.name} 
        </h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>Languages</h2>
        <ul>
            <Languages languages={country.languages} />
        </ul>
        <img src={country.flag} alt="Country flag" width="100px"/>
    </div>
    )
} 
  
  export default Country