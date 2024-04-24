import React, { useEffect, useState } from 'react';
import '../styles/createquiz.css';
import Alert from '../components/Alert';
import { useNavigate } from "react-router-dom";
import style from '../styles/quizesPage.css'



export default function CreateQuiz() {
    const navigate = useNavigate();
    const [subject, setSubject] = useState("");
    const [quizData, setQuizData] = useState([]);
    const [alertStatus, setAlertStatus] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],
        answer: '1',
        description: ''
    });
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'options') {
            const updatedOptions = [...formData.options];
            updatedOptions[index] = value;
            setFormData({ ...formData, options: updatedOptions });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddQuestion = () => {
        setQuizData(prevQuizData => [...prevQuizData, formData]);
        setFormData({
            question: '',
            options: ['', '', '', ''],
            answer: '1',
            description: ''
        });
    };

    const handleQuestionClick = (index) => {
        setSelectedQuestion(quizData[index]);
    };

    const renderQuestionList = () => {
        return quizData.map((data, index) => (
            <li key={index} className="list-group-item" onClick={() => handleQuestionClick(index)}>
                Question {index + 1}
            </li>
        ));
    };

    useEffect(() => {
        setTimeout(() => {
            setAlertVisible(true); 
        }, 3000);
    }, [setAlertStatus]); 
    
    const CreateQuiz = async () => {
        const quizObj = {
            subject: subject,
            questions: quizData
        };

        fetch('http://localhost:8000/api/createquiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizObj),
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return await response.json();
            })
            .then(data => {
                setAlertStatus({message:data.message, status:data.status});
                // console.log('Quiz created successfully:', data.message);
            })
            .catch(error => {
                setAlertStatus({message:error.message, status:"error"});
                console.error('There was a problem creating the quiz:', error.message);
            });

        navigate("/allquizes");
    };


    const renderQuestionCard = () => {
        if (!selectedQuestion) return null;

        return (
            <div className="card mt-4">
                <div className="card-header">
                    Question {quizData.indexOf(selectedQuestion) + 1}
                </div>
                <div className="card-body">
                    <p>{selectedQuestion.question}</p>
                    <ol>
                        {selectedQuestion.options.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ol>
                    <p><strong>Answer:</strong> {selectedQuestion.answer}</p>
                    <p><strong>Description:</strong> {selectedQuestion.description}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            {alertVisible && alertStatus ?  <Alert message={alertStatus.message} status={alertStatus.status}/> : <></>}
            <div className="header">
                <h1>Welcome Admin! Create Today's Quiz.</h1>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <form className="centered-form">
                        <div className="form-floating mt-1">
                            <input
                                type="text"
                                className="form-control"
                                id="question"
                                name="question"
                                placeholder="Question"
                                value={formData.question}
                                onChange={handleChange}
                            />
                            <label htmlFor="question">Question: *</label>
                        </div>
                        {[1, 2, 3, 4].map((index) => (
                            <div key={index} className="form-floating mt-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`option${index}`}
                                    name="options"
                                    placeholder={`Option ${index}`}
                                    value={formData.options[index - 1]}
                                    onChange={(e) => handleChange(e, index - 1)}
                                />
                                <label htmlFor={`option${index}`}>{`Option ${index}: `}</label>
                            </div>
                        ))}
                        <div className="form-group mt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Correct Option*</label>
                            <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                name="answer"
                                value={formData.answer}
                                onChange={handleChange}
                            >
                                {[1, 2, 3, 4].map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="description">Answer Description: </label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="form-group mt-2 d-flex justify-content-center">
                            <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>Add Question</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <div className="form-floating mt-1">
                        <input
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value);
                            }}
                        />
                        <label htmlFor="subject">Subject</label>
                    </div>
                    <div className="card mt-4">
                        <div className="card-header">
                            <b>All Questions</b>
                        </div>
                        <ul className="list-group list-group-flush">
                            {renderQuestionList()}
                        </ul>
                    </div>
                    {renderQuestionCard()}

                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-primary" onClick={CreateQuiz}>Create Quiz</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
