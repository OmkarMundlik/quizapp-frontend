import React, { useContext, useState, useEffect } from 'react';  
import '../styles/createquiz.css';  
import Alert from '../components/Alert';  
import Spinner from '../components/Spinner'; // Add a Spinner component  
import { useNavigate } from "react-router-dom";  
import style from '../styles/quizesPage.css';  
import ResultContext from '../context/ResultContext';  
  
export default function CreateQuiz() {  
    const HOST = process.env.REACT_APP_HOST_NAME;  
    const navigate = useNavigate();  
    const [quizText, setQuizText] = useState("");  
    const [quizJson, setQuizJson] = useState({ questions: [] });  
    const [batches, setBatches] = useState([]);  
    const [isPremium, setIsPremium] = useState(false);  
    const [selectedBatchName, setSelectedBatchName] = useState(""); // Store batch name selected by the user  
    const [loadingBatches, setLoadingBatches] = useState(false);  
  
    const { setAlertContext } = useContext(ResultContext);  
  
    useEffect(() => {  
        if (isPremium) {  
            setLoadingBatches(true);  
            fetch(`${HOST}api/fetch-premium-batches`, {  
                method: 'GET',  
                headers: {  
                    'Content-Type': 'application/json',  
                    'admin-token': localStorage.getItem('admin-token')  
                }  
            })  
            .then(async response => {  
                if (!response.ok) {  
                    throw new Error('Network response was not ok');  
                }  
                return await response.json();  
            })  
            .then(data => {  
                setBatches(data || []);  
                setLoadingBatches(false);  
            })  
            .catch(error => {  
                showAlert('There was a problem fetching premium batches', 'danger');  
                console.error('There was a problem fetching premium batches:', error.message);  
                setLoadingBatches(false);  
            });  
        }  
    }, [isPremium]);  
  
    const showAlert = (message, status) => {  
        setAlertContext({  
            isActive: true,  
            message: message,  
            status: status  
        });  
        setTimeout(() => {  
            setAlertContext(prevState => ({ ...prevState, isActive: false }));  
        }, 2000);  
    };  
  
    const parseQuestions = (input) => {  
        const lines = input.split('\n').filter(line => line.trim() !== '');  
        const subject = lines.shift().trim();  
        const questions = [];  
        let currentQuestion = null;  
        let questionText = '';  
  
        lines.forEach(line => {  
            const questionMatch = line.match(/^\(\d+\) (.*)/);  
            if (questionMatch) {  
                if (currentQuestion) {  
                    currentQuestion.question = questionText.trim();  
                    questions.push(currentQuestion);  
                }  
                currentQuestion = { question: "", options: [], answer: "", description: "" };  
                questionText = questionMatch[1];  
            } else if (currentQuestion) {  
                const optionMatch = line.match(/^([A-D])\. (.*)/);  
                if (optionMatch) {  
                    let optionText = optionMatch[2].replace(' √', '').replace('√', '').replace('√√', '').trim();  
                    currentQuestion.options.push(optionText);  
                    if (line.includes('√')) {  
                        currentQuestion.answer = (optionMatch[1].charCodeAt(0) - 'A'.charCodeAt(0) + 1).toString();  
                    }  
                } else {  
                    questionText += ' ' + line.trim();  
                }  
            }  
        });  
  
        if (currentQuestion) {  
            currentQuestion.question = questionText.trim();  
            questions.push(currentQuestion);  
        }  
  
        return {  
            subject: subject,  
            questions: questions  
        };  
    };  
  
    const handleTextChange = (event) => {  
        setQuizText(event.target.value);  
    };  
  
    const createQuiz = () => {  
        try {  
            const parsedQuiz = parseQuestions(quizText);  
            setQuizJson(parsedQuiz);  
            showAlert('Quiz parsed successfully. You can now review and edit the questions.', 'success');  
        } catch (error) {  
            showAlert('There was a problem parsing the quiz text. Please check the format and try again.', 'danger');  
        }  
    };  
  
    const handleQuestionChange = (index, key, value) => {  
        const updatedQuiz = { ...quizJson };  
        if (index === -1) {  
            updatedQuiz[key] = value;  
        } else {  
            updatedQuiz.questions[index][key] = value;  
        }  
        setQuizJson(updatedQuiz);  
    };  
  
    const handleOptionChange = (questionIndex, optionIndex, value) => {  
        const updatedQuiz = { ...quizJson };  
        updatedQuiz.questions[questionIndex].options[optionIndex] = value;  
        setQuizJson(updatedQuiz);  
    };  
  
    const handleCorrectOptionChange = (questionIndex, value) => {  
        const updatedQuiz = { ...quizJson };  
        updatedQuiz.questions[questionIndex].answer = value;  
        setQuizJson(updatedQuiz);  
    };  
  
    const handleCheckboxChange = (event) => {  
        setIsPremium(event.target.checked);  
    };  
  
    const handleBatchSelectChange = (event) => {  
        setSelectedBatchName(event.target.value);  
    };  
  
    // Find batchId using the selected batch name  
    const getBatchIdByName = (batchName) => {  
        const batch = batches.find(batch => batch.name === batchName);  
        // console.log("batch ", batch)
        return batch ? batch._id : null;  
    };  
  
    const saveQuiz = () => {  
        let url = `${HOST}api/createquiz`;  
        if (isPremium) {  
            url = `${HOST}api/create-premium-quiz`;  
        }  
  
        const batchId = getBatchIdByName(selectedBatchName); // Get batchId from batch name  
        // console.log("BatchId: ", batchId)

        const quizToSave = {  
            ...quizJson,  
            batchId // Include the batchId in the payload  
        };  
        // console.log("Payload: ", quizToSave)
        fetch(url, {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json',  
                'admin-token': localStorage.getItem('admin-token')  
            },  
            body: JSON.stringify(quizToSave),  
        })  
        .then(async response => {  
            if (!response.ok) {  
                throw new Error('Network response was not ok');  
            }  
            return await response.json();  
        })  
        .then(data => {  
            showAlert('Quiz Created Successfully!', 'success');  
        })  
        .catch(error => {  
            showAlert('There was a problem creating the quiz', 'danger');  
            console.error('There was a problem creating the quiz:', error.message);  
        });  
        navigate(`/premium-tests/${batchId}`);  

    };  
  
    return (  
        <div className="container">  
            <div className="header">  
                <h1>Welcome Admin! Create Today's Quiz.</h1>  
            </div>  
            <h1>Enter Test Text</h1>  
            <textarea  
                className='container'  
                rows="20"  
                cols="100"  
                value={quizText}  
                onChange={handleTextChange}  
                placeholder="Enter your test text here"  
            />  
            <br />  
            <button onClick={createQuiz}>Parse Questions</button>  
            {quizJson && (  
                <div>  
                    <h2>Review and Edit Quiz</h2>  
                    <div>  
                        <label>Subject:</label>  
                        <input  
                            type="text"  
                            value={quizJson.subject || ''}  
                            onChange={(e) => handleQuestionChange(-1, 'subject', e.target.value)}  
                        />  
                    </div>  
                    <label>  
                        <input  
                            type="checkbox"  
                            checked={isPremium}  
                            onChange={handleCheckboxChange}  
                        />  
                        Premium  
                    </label>  
                    {isPremium && (  
                        <div>  
                            <label>Select Premium Batch:</label>  
                            {loadingBatches ? (  
                                <Spinner /> // Show spinner while loading  
                            ) : (  
                                <select  
                                    value={selectedBatchName}  
                                    onChange={handleBatchSelectChange}  
                                >  
                                    <option value="" disabled>Select batch</option>  
                                    {batches.map(batch => (  
                                        <option key={batch.id} value={batch.name}>   
                                            {batch.name}  
                                        </option>  
                                    ))}  
                                </select>  
                            )}  
                        </div>  
                    )}  
                    {quizJson.questions?.map((question, qIndex) => (  
                        <div key={qIndex} className="question-container">  
                            <textarea  
                                rows="3"  
                                cols="100"  
                                value={question.question || ''}  
                                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}  
                            />  
                            {question.options?.map((option, oIndex) => (  
                                <div key={oIndex} className="option-container">  
                                    <input  
                                        type="text"  
                                        value={option || ''}  
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}  
                                    />  
                                </div>  
                            ))}  
                            <label>Correct Option:</label>  
                            <select  
                                value={question.answer || ''}  
                                onChange={(e) => handleCorrectOptionChange(qIndex, e.target.value)}  
                            >  
                                {question.options?.map((_, oIndex) => (  
                                    <option key={oIndex} value={(oIndex + 1).toString()}>{oIndex + 1}</option>  
                                ))}  
                            </select>  
                        </div>  
                    ))}  
                    <button onClick={saveQuiz}>Save and Submit Quiz</button>  
                </div>  
            )}  
        </div>  
    );  
}  