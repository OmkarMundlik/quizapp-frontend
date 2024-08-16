import React, { useState } from 'react'
import RadioButton from './RadioButton'
import style from "../styles/Question.css"

export default function Question(props) {
    // const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
    //   setSelectedOption(event.target.value);
      props.onAnswerSelected(event.target.value, props.id);
    };

    return (
        <div className="card bg-light mb-3" >
            <div className="card-header"><b>Question {props.id +1}</b></div>
            <div className="card-body">
                <h5 className="card-title">{props.question.question}</h5>
                <div className="card-text">
                    <RadioButton option={"A. "+props.question.options[0]} num="1" name={props.id} handleOptionChange={handleOptionChange} required/> 
                    <RadioButton option={"B. "+props.question.options[1]} num="2" name={props.id} handleOptionChange={handleOptionChange} required/> 
                    <RadioButton option={"C. "+props.question.options[2]} num="3" name={props.id} handleOptionChange={handleOptionChange} required/> 
                    <RadioButton option={"D. "+props.question.options[3]} num="4" name={props.id} handleOptionChange={handleOptionChange} required/> 
                </div>
            </div>
        </div>
    )
}
