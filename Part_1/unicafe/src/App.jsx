import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const texts = {
    headerText: "Give feedback",
    tilteText: "Statistics",
    goodClick: "Good",
    badClick: "Bad",
    neutralClick: "Neutral",
    average: "Average",
    positive: "Positive",
    all: "All"
  }
  const handleBadClick = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  const handleNeutralClick = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  const handleGoodClick = () => {
    setAll(all + 1)
    setGood(good + 1)
  }

  return (
    <div>
      <Header text={texts.headerText} />
      <Button onClick={handleBadClick} text={texts.badClick} />
      <Button onClick={handleNeutralClick} text={texts.neutralClick} />
      <Button onClick={handleGoodClick} text={texts.goodClick} />
      <Titles text={texts.tilteText} />
      <Statistics texts={texts} bad={bad} neutral={neutral} good={good} all={all} />
    </div>
  )
}

const Header = ({ text }) => <h1>{text}</h1>
const Titles = ({ text }) => <h2>{text}</h2>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const StatisticsLine = ({ text, nb, pct = '' }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{nb}{pct}</td>
    </tr>)
}

const Statistics = ({ texts, bad, neutral, good, all }) => {
  if (all !== 0) {
    return (<table>
      <tbody>
        <StatisticsLine text={texts.goodClick} nb={good} />
        <StatisticsLine text={texts.neutralClick} nb={neutral} />
        <StatisticsLine text={texts.badClick} nb={bad} />
        <StatisticsLine text={texts.all} nb={all} />
        <StatisticsLine text={texts.average} nb={all != 0 ? ((good - bad) / all) : 0} />
        <StatisticsLine text={texts.positive} nb={all != 0 ? (good * 100 / all) : 0} pct='%' />
      </tbody>
    </table>)
  }

  return (
    <div>
      <p>No feedback given</p>
    </div>)
}

export default App