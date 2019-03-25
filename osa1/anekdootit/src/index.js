import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({name, handleClick}) => (
    <button onClick={handleClick}>{name}</button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(Array(props.anecdotes.length).fill(0))

  const nextAnecdote = () => {
      let min = 0
      let max = props.anecdotes.length
      setSelected(Math.floor(Math.random() * (max - min)) + min)
  }

  const addVote = (anecdoteIndex) => {
      let newVotes = [...points]
      newVotes[anecdoteIndex] += 1
      setPoint(newVotes)
  }

  let maxIndex = points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} points</p>

      <p>
        <Button name="vote" handleClick={() => addVote(selected)} />
        <Button name="next anecdote" handleClick={nextAnecdote} />
      </p>

      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[maxIndex]}</p>
      <p>has {points[maxIndex]} points</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)