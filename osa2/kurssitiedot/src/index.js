import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => (
    <h1>{course.name}</h1>
)

const Content = (props) => (
    props.parts.map ( part => 
        <Part part={part.name} exercise={part.exercises} key={part.id}/>
    )
)

const Part = (props) => (
    <p>
        {props.part} {props.exercise}
    </p>
)

const Total = ({parts}) => {
    let exercise_count = parts.reduce ( (exercise_count, current_part) => (
        exercise_count+current_part.exercises 
    ), 0)
    return (
        <p>yhteensä {exercise_count} tehtävää</p>
    )
}

const Course = ({course}) => {
        return (
            <div>
                <Header course={course} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </div>
        )
}

const App = () => {
    const course = {
      name: 'Half Stack -sovelluskehitys',
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        },
        {
            name: 'Redux',
            exercises: 7,
            id: 4
          }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))