import './answer.css';
import {FC, ReactElement} from "react"

interface AnswerProps {
  answer:string;
  index: number;
  onSelectAnswer: (answer:string) => void;
  selectedAnswer:string|null|undefined;
  correctAnswer:string|null|undefined;
  askedHelp:boolean|null|undefined;
}

const Answer:FC<AnswerProps> = ({answer, index, onSelectAnswer, selectedAnswer, correctAnswer, askedHelp}):ReactElement => {
  let audio = new Audio("https://www.pacdv.com/sounds/applause-sound/app-5.mp3")

  const start = () => {
    audio.play()
  }

  const answerLetterMapping:Array<string> = ['A', 'B', 'C', 'D', 'E']
  const isCorrect = 
    selectedAnswer 
      && 
    correctAnswer 
      === 
    answer 
    ? "correct-answer"  
    : null

  const isWrong =
    selectedAnswer 
      && 
    selectedAnswer 
      === 
    answer 
      && 
    answer 
      !== 
    correctAnswer
    ? "wrong-answer"
    : null

    
  const isDisabled = selectedAnswer ? "disabled-answer" : null
    
  const help =
    askedHelp 
      &&
    !selectedAnswer
      &&
    answer === correctAnswer
    ? "help-answer"
    : null

  return(
    <>
      <div 
        className={`answer ${isCorrect} ${isWrong} ${isDisabled} ${help}`}
        onClick={() => onSelectAnswer(answer)}
      >
        <div className="answer-option">
          <div className="answer-letter"><p>{answerLetterMapping.at(index)}</p></div>
          <div className="answer-text"><p>{answer}</p></div>
        </div>
      </div>
    </>
  );
};

export default Answer;
