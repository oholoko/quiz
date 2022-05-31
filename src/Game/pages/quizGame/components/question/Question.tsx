import "./question.css"
import Answer from "../answer/Answer"
import { useState, useEffect,useRef } from "react";
import { useContext } from "react"
import { FC, ReactElement } from "react"
import { QuizContext, allowedActions } from "../../../../contexts/QuizContext"

const Question:FC = ():ReactElement => {
  const quizContext = useContext(QuizContext);
  const success = require("../../../../sound/success.mp3")
  const failure = require("../../../../sound/failure.mp3")
  const audioS = useRef(new Audio(success));
  const audioF = useRef(new Audio(failure));

  const dispatch = quizContext?.dispatch

  const currentQuestion = quizContext?.state.questions[quizContext.state.currentQuestionIndex]
  const answers = quizContext?.state.currentQuestionAnswers
  const selectedAnswer = quizContext?.state.selectedAnswer
  const correctAnswer = quizContext?.state.correctAnswer
  const helpChances = quizContext!.state.helpChances
  const askedHelp = quizContext?.state.askedHelp 

  if (selectedAnswer == null)
  {
    audioS.current.pause()
    audioS.current.load()
    audioF.current.pause()
    audioF.current.load()
  }

  if (selectedAnswer)
  {
    if (selectedAnswer === correctAnswer)
    {
      audioS.current.play()
    }
    else
    {
      audioF.current.play()
    }
  }
  
  const helpDisabled = helpChances <= 0 
    ? "help-disabled disabled" 
    : null 

  return (
    <>

      <div className="question container">
        <p 
          className="question-text"
        >
          {currentQuestion?.question}
        </p>
        
        <div className="answers">
          { answers?.map((answer, index) => (
              <Answer 
                answer={answer} 
                key={index} 
                index={index} 
                onSelectAnswer={answer => dispatch && dispatch({type:allowedActions.SELECT_ANSWER, payload:answer})}
                selectedAnswer={selectedAnswer}
                correctAnswer={correctAnswer}
                askedHelp={askedHelp}
              />
            ))
          }
        </div>
        
        <div className="action-btns-wrap">

          <div 
            className="next-btn action-btn"
            onClick={() => dispatch && dispatch({type:allowedActions.NEXT_QUESTION, payload:null})}
          >
            <div className="action-btn-text"><p>Próxima questão</p></div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Question;
