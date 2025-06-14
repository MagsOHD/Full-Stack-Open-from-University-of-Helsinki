import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const texts = {
    headerText: "Give feedback",
    tilteText: "Statistics",
    goodClick: "Good",
    badClick: "Bad",
    neutralClick: "Neutral"
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleGoodClick = () =>{
    setGood(good + 1)
  }

  return (
    <div>
      <Header text={texts.headerText}/>
      <Button onClick={handleBadClick} text={texts.badClick}/>
      <Button onClick={handleNeutralClick} text={texts.neutralClick}/>
      <Button onClick={handleGoodClick} text={texts.goodClick}/>
      <Titles text={texts.tilteText}/>
      <Statistics text={texts.goodClick} nb={good}/>
      <Statistics text={texts.neutralClick} nb={neutral}/>
      <Statistics text={texts.badClick} nb={bad}/>
    </div>
  )
}

const Header = ({text}) => <h1>{text}</h1>
const Titles = ({text}) => <h2>{text}</h2>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Statistics = ({text, nb}) => {
  return (
  <>
    <p>{text}: {nb}</p>
  </>)
}

export default App