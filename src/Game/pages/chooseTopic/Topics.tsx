import "./topics.css"
import {useState, useEffect, useContext} from "react"
import type {FC, ReactElement} from "react"
import {topics as avalibleTopicsData } from "../../randomdata";
import {useNavigate} from "react-router-dom"
import {UniversalContext, TopicInterface} from "../../contexts/UniversalContext"

interface SingleTopicProps {
  topic: string;
  onSelectTopic: (topic:string) => void;
}

const SingleTopic:FC<SingleTopicProps> = (props):ReactElement => {
  
  return (
    <div 
      className="topic"
      onClick={() => {
        props.onSelectTopic(props.topic)
        document.getElementById(`${props.topic}`)?.click()
      }}
    >
      <div className="topic-icon">
        <span>x + 1</span>
      </div>
      
      <div className="topic-details">
        <input className="checkTopic" type="checkbox" id={props.topic} />
        <span className="topic-name">{props.topic}</span>
      </div>

    </div>
  )
}

const Topics:FC = ():ReactElement => {
  
  const universalContext = useContext(UniversalContext)
  const setSelectedTopics = universalContext!.setSelectedTopics
  
  const [avalibleTopics, setAvalibleTopics] = useState<Array<TopicInterface>>([])
  useEffect(() => {
    const newAvalibleTopics =  avalibleTopicsData.map(topic => {
      return {topic, isSelected: false}
    })
    setAvalibleTopics(newAvalibleTopics)
  }, [])
  
  const handleOnSelectTopic = (selectedTopic:string) => {
    const newAvalibleTopics = avalibleTopics.map(topic => {
      return selectedTopic ===  topic.topic 
        ? {...topic, isSelected: !topic.isSelected}
        : topic 
    })
    setAvalibleTopics(newAvalibleTopics)
    const newSelectedTopics = avalibleTopics.filter(topic => {
      return topic.isSelected
    })
    
    setSelectedTopics(newSelectedTopics)
  }
  
  const selectedTopicsCount = avalibleTopics
    .filter(topic => {
      return topic.isSelected 
    })
    .length

  const navigate = useNavigate()
  return (
    <div className="topics-wrap container">
      <div className="welcome-wrap">
        <span className="welc-message">Ol??. Bem vindo ao <strong>Quiz Game</strong></span>
        <span className="welc-feeling">Vamos Jogar?</span>
      </div>  
      <img src={require('../../images/initial_image.jpeg')} width="100%" height="100%"/>
      <div className="actions-btns">
        <button 
          className={`start-btn true`}
          onClick={() => navigate("/game")}
        >
          Start
        </button>
      </div>
    </div>
  )
}

export default Topics
