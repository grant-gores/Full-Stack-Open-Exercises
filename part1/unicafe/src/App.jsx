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

const Display = (props) => (
  <div>
    {props.text} {props.clicks}
  </div>
)

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
      <Title title={"statistics"}/>
      <Display text={"good"} clicks={good}/>
      <Display text={"neutral"} clicks={neutral}/>
      <Display text={"bad"} clicks={bad}/>
      <Display text={"all"} clicks={good + neutral + bad}/>
      <Display text={"average"} clicks={(good - bad) / (good + neutral + bad)}/>
      <Display text={"positive"} clicks={(good) / (good + neutral + bad)+"%"}/>
    </div>
  )
}

export default App
