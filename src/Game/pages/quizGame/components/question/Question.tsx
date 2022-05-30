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


  const dispatch = quizContext?.dispatch

  const currentQuestion = quizContext?.state.questions[quizContext.state.currentQuestionIndex]
  const answers = quizContext?.state.currentQuestionAnswers
  const selectedAnswer = quizContext?.state.selectedAnswer
  const correctAnswer = quizContext?.state.correctAnswer
  const helpChances = quizContext!.state.helpChances
  const askedHelp = quizContext?.state.askedHelp 

  if (selectedAnswer)
  {
    if (selectedAnswer === correctAnswer)
    {
      const rS = new Audio(success)
      rS.play()
    }
    else
    {
      const rF = new Audio(failure)
      rF.play()
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
            className={`help-btn action-btn ${helpDisabled}`}
            onClick={() => dispatch && dispatch({type:allowedActions.ASK_HELP, payload:null})}
          >
            <span className="action-btn-text"><p>Ajuda</p></span>
            <span className="help-chances">{helpChances}</span>
          </div>

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
