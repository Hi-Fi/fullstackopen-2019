import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
    let sum = good + neutral + bad
    let average = (good - bad) / sum
    let positive = (100 * (good / sum))+ " %"
    let header = <h1>statistiikka</h1>
    if (sum === 0) {
        return (
            <>
                {header}
                <p>Ei yhtään palautetta annettu</p>
            </>
        )
    } else {
        return (
            <>
                {header}
                <table>
                    <tbody>
                        <Statistic text = "hyvä" value = {good} />
                        <Statistic text = "neutraali" value = {neutral} />
                        <Statistic text = "huono" value = {bad} />
                        <Statistic text = "yhteensä" value = {sum} />
                        <Statistic text = "keskiarvo" value = {average} />
                        <Statistic text = "positiivisia" value = {positive} />
                    </tbody>
                </table>
            </>
        )
    }
}

const Statistic = ({text, value}) => (
    <tr><td>{text}</td><td>{value}</td></tr>
)

const Button = ({name, handleClick}) => (
    <button onClick={handleClick}>{name}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = (newValue) => {
      setGood(newValue)
  }

  const addNeutral = (newValue) => {
    setNeutral(newValue)
}

const addBad = (newValue) => {
    setBad(newValue)
}

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button name="hyvä" handleClick={() => addGood(good + 1)} />
      <Button name="neutraali" handleClick={() => addNeutral(neutral + 1)} />
      <Button name="huono" handleClick={() => addBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)