import React from 'react'
import RadioButton from './RadioButton';

export default function Answer(props) {
    const correct = props.selected == props.answer;
    const getBgColor = (id) => {
        if (props.selected == id) {
            return "#ff474c";
        }
        if (props.answer == id) {
            return "#82B84D";
        }
        return "";
    }
    // const correctOption = props.answer; 
    return (
        <div className="card bg-light mb-3" >
            <div className="card-header">Question {props.id + 1}</div>
            <div className="card-body">
                <h5 className="card-title">{props.question.question}</h5>
                {correct ? <div className="card-text">
                    <p style={{ backgroundColor: props.answer == "1" ? "#82B84D" : "", padding: "5px", margin: "0px" }} >{props.question.options[0]}</p>
                    <p style={{ backgroundColor: props.answer == "2" ? "#82B84D" : "", padding: "5px", margin: "0px" }} >{props.question.options[1]}</p>
                    <p style={{ backgroundColor: props.answer == "3" ? "#82B84D" : "", padding: "5px", margin: "0px" }} >{props.question.options[2]}</p>
                    <p style={{ backgroundColor: props.answer == "4" ? "#82B84D" : "", padding: "5px", margin: "0px" }} >{props.question.options[3]}</p>
                </div> :
                    <div className="card-text">
                        <p style={{ backgroundColor: getBgColor("1"), padding: "5px", margin: "0px" }} >{props.question.options[0]}</p>
                        <p style={{ backgroundColor: getBgColor("2"), padding: "5px", margin: "0px" }} >{props.question.options[1]}</p>
                        <p style={{ backgroundColor: getBgColor("3"), padding: "5px", margin: "0px" }} >{props.question.options[2]}</p>
                        <p style={{ backgroundColor: getBgColor("4"), padding: "5px", margin: "0px" }} >{props.question.options[3]}</p>
                    </div>}
            </div>

            {!correct &&
                <div className='description' style={{margin:"20px", backgroundColor : "#fff", borderRadius:"5px", padding:"5px", boxShadow:"10px"}}>
                    <b>{props.question.description}</b>
                </div>
            }
        </div>

    )
}
