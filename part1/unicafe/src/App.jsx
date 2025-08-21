import { useState } from 'react'

const Title = (props) => {
  return <h1>{props.title}</h1>
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => (
  <div>
    {props.text} {props.clicks}
  </div>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = total ? ((good - bad) / total).toFixed(2) : 0
  const positive = total ? ((good / total) * 100).toFixed(1) + "%" : "0%"

  return (
    <div>
      <Title title="statistics" />
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <StatisticLine text="good" clicks={good} />
          <StatisticLine text="neutral" clicks={neutral} />
          <StatisticLine text="bad" clicks={bad} />
          <StatisticLine text="all" clicks={total} />
          <StatisticLine text="average" clicks={average} />
          <StatisticLine text="positive" clicks={positive} />
        </>
      )}
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    console.log("good clicks", good)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    console.log("neutral clicks", neutral)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    console.log("bad clicks", bad)
  }

  return (
    <div>
      <Title title={"give feedback"}/>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
