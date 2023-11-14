import React, {useState} from 'react'
import { Fighting, FightCodeSequence } from "../../components";

function index() {
const [checkAnswer, setCheckAnswer] = useState(false)

const isAnswerCorrect = () => {
  console.log('hello');
  setCheckAnswer(prevState => !prevState);
}

  return (
    <>
    <FightCodeSequence checkAnswer={checkAnswer} isAnswerCorrect={isAnswerCorrect}/>
    <Fighting checkAnswer={checkAnswer} />
    </>
  )
}

export default index
