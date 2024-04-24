import React from 'react';

export default function RadioButton(props) {
    return (
        <div className="form-check m-2" style={{backgroundColor : props.bgcolor}}>
            <input className="form-check-input" type="radio" name={props.name} id={`radio-${props.name}-${props.num}`} value={props.num} onChange={props.handleOptionChange} />
            <label className="form-check-label" htmlFor={`radio-${props.name}-${props.num}`}>
                {props.option}
            </label>
        </div>
    );
}
