import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Content = ({ parts }) => (
    <div>
        <h1>statistiikka</h1>

        {parts.map ( part => 
            <Part part={part.name} votes={part.votes} key={part.name}/>
        )}
    </div>
)

const Part = (props) => (
    <p>
        {props.part} {props.votes}
    </p>
) 

const Statistics = ({good, neutral, bad}) => {
    let sum = good + neutral + bad
    let average = (good - bad) / sum
    let positive = 100 * (good / sum)
    return (
        <>
            <p>yhteensä {sum}</p>
            <p>keskiarvo {average}</p>
            <p>positiivisia {positive} %</p>
        </>
    )
}

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

  let parts = [
      {name: 'hyvä', votes: good},
      {name: 'neutraali', votes: neutral},
      {name: 'huono', votes: bad}
  ]

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button name="hyvä" handleClick={() => addGood(good + 1)} />
      <Button name="neutraali" handleClick={() => addNeutral(neutral + 1)} />
      <Button name="huono" handleClick={() => addBad(bad + 1)} />
      <Content parts={parts} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)