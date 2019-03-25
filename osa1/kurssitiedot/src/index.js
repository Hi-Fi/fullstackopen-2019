import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <h1>{props.course}</h1>
)

const Content = (props) => (
    props.parts.map ( part => 
        <Part part={part.name} exercise={part.exercises} key={part.name}/>
    )
)

const Part = (props) => (
    <p>
        {props.part} {props.exercise}
    </p>
)

const Total = (props) => {
    let exercise_count = 0
    props.parts.forEach ( part => exercise_count =+ part.exercises)
    return (
        <p>yhteensä {exercise_count} tehtävää</p>
    )
}

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const parts = [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))