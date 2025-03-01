// import React, { useContext, useEffect, useState } from 'react';
// import '../styles/createquiz.css';
// import Alert from '../components/Alert';
// import { useNavigate } from "react-router-dom";
// import style from '../styles/quizesPage.css'
// import ResultContext from '../context/ResultContext';


// export default function CreateQuiz() {
//     const HOST = process.env.REACT_APP_HOST_NAME;
//     const navigate = useNavigate();
//     const [quiz_text, setquiz_text] = useState("")
//     const [quizJson, setquizJson] = useState(null)
//     // const [subject, setSubject] = useState("");
//     // const [quizData, setQuizData] = useState([]);
//     // const [mainImg, setMainImg] = useState(null);

//     // const [formData, setFormData] = useState({
//     //     question: '',
//     //     options: ['', '', '', ''],
//     //     answer: '1',
//     //     description: ''
//     // });

//     const { setAlertContext } = useContext(ResultContext);
//     const showAlert = (message, status) => {
//         setAlertContext({
//             isActive: true,
//             message: message,
//             status: status
//         })
//         setTimeout(() => {
//             setAlertContext(prevState => ({ ...prevState, isActive: false }));
//         }, 2000);
//     }
//     // const [selectedQuestion, setSelectedQuestion] = useState(null);

//     // const handleChange = (e, index) => {
//     //     const { name, value } = e.target;
//     //     if (name === 'options') {
//     //         const updatedOptions = [...formData.options];
//     //         updatedOptions[index] = value;
//     //         setFormData({ ...formData, options: updatedOptions });
//     //     } else {
//     //         setFormData({ ...formData, [name]: value });
//     //     }
//     // };

//     function parseQuestions(input) {
//         // Split the input by line breaks to handle each line separately
//         const lines = input.split('\n').filter(line => line.trim() !== '');
        
//         // Extract subject name
//         const subject = lines.shift().trim();
        
//         const questions = [];
//         let currentQuestion = null;
//         let questionText = '';
    
//         lines.forEach(line => {
//             // Match a question line
//             const questionMatch = line.match(/^\(\d+\) (.*)/);
//             if (questionMatch) {
//                 if (currentQuestion) {
//                     currentQuestion.question = questionText.trim();
//                     questions.push(currentQuestion);
//                 }
//                 currentQuestion = { question: "", options: [], answer: "", description:""};
//                 questionText = questionMatch[1];
//             } else if (currentQuestion) {
//                 // Match an option line
//                 const optionMatch = line.match(/^([A-D])\. (.*)/);
//                 if (optionMatch) {
//                     let optionText = optionMatch[2].replace(' √', '').replace('√√', '').trim();
//                     currentQuestion.options.push(optionText);
//                     // Check if this option is the correct one
//                     if (line.includes('√')) {
//                         currentQuestion.answer = (optionMatch[1].charCodeAt(0) - 'A'.charCodeAt(0) + 1).toString();
//                     }
//                 } else {
//                     // Append to question text if it's not an option
//                     questionText += ' ' + line.trim();
//                 }
//             }
//         });
    
//         // Push the last question
//         if (currentQuestion) {
//             currentQuestion.question = questionText.trim();
//             questions.push(currentQuestion);
//         }
    
//         return JSON.stringify({
//             subject: subject,
//             questions: questions
//         }, null, 4);
//     }
    
//     // const handleAddQuestion = () => {
//     //     setQuizData(prevQuizData => [...prevQuizData, formData]);
//     //     setFormData({
//     //         question: '',
//     //         options: ['', '', '', ''],
//     //         answer: '1',
//     //         description: ''
//     //     });
//     // };

//     // const handleQuestionClick = (index) => {
//     //     setSelectedQuestion(quizData[index]);
//     // };

//     // const renderQuestionList = () => {
//     //     return quizData.map((data, index) => (
//     //         <li key={index} className="list-group-item" onClick={() => handleQuestionClick(index)}>
//     //             Question {index + 1}
//     //         </li>
//     //     ));
//     // };

//     // const uploadImage = () => {
//     //     return new Promise((resolve, reject) => {
//     //         const data = new FormData();
//     //         data.append("file", mainImg);
//     //         data.append("upload_preset", "vmyf3te9");
//     //         data.append("cloud_name", "dpktfyhbi");

//     //         fetch("https://api.cloudinary.com/v1_1/dpktfyhbi/image/upload", {
//     //             method: "post",
//     //             body: data
//     //         })
//     //             .then(res => res.json())
//     //             .then(data => {
//     //                 showAlert('Image Uploaded SUccessfully', 'success');
//     //                 resolve(data.url); // Resolve with the image URL
//     //             })
//     //             .catch(error => {
//     //                 showAlert('Error in uploading image!', 'danger');
//     //                 reject(error); // Reject with the error if upload fails
//     //             });
//     //     });
//     // };

//     // const CreateQuiz = async () => {
//     //     const imageUrl = await uploadImage();
//     //     const quizObj = {
//     //         subject: subject,
//     //         questions: quizData,
//     //         imageUrl: imageUrl
//     //     };
//     //     const url = HOST + 'api/createquiz'
//     //     // const url = 'http://localhost:8000/api/createquiz'
//     //     fetch(url, {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //             'admin-token': localStorage.getItem('admin-token')
//     //         },
//     //         body: JSON.stringify(quizObj),
//     //     })
//     //         .then(async response => {
//     //             if (!response.ok) {
//     //                 throw new Error('Network response was not ok');
//     //             }
//     //             return await response.json();
//     //         })
//     //         .then(data => {
//     //             showAlert('Quiz Created Successfully!', 'success');
//     //             // setAlertStatus({message:data.message, status:data.status});
//     //             // console.log('Quiz created successfully:', data.message);
//     //         })
//     //         .catch(error => {
//     //             // setAlertStatus({message:error.message, status:"error"});
//     //             showAlert('There was a problem creating the quiz', 'danger');
//     //             console.error('There was a problem creating the quiz:', error.message);
//     //         });

//     //     navigate("/allquizes");
//     // };


//     const create_quiz = ()=>{
//         let quizObj = parseQuestions(quiz_text);
//         const url = HOST + 'api/createquiz'
//         console.log(quizObj)
//         // const url = 'http://localhost:8000/api/createquiz'
//         // fetch(url, {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //         'admin-token': localStorage.getItem('admin-token')
//         //     },
//         //     body: JSON.stringify(quizObj),
//         // })
//         //     .then(async response => {
//         //         if (!response.ok) {
//         //             throw new Error('Network response was not ok');
//         //         }
//         //         return await response.json();
//         //     })
//         //     .then(data => {
//         //         showAlert('Quiz Created Successfully!', 'success');
//         //         // setAlertStatus({message:data.message, status:data.status});
//         //         // console.log('Quiz created successfully:', data.message);
//         //     })
//         //     .catch(error => {
//         //         // setAlertStatus({message:error.message, status:"error"});
//         //         showAlert('There was a problem creating the quiz', 'danger');
//         //         console.error('There was a problem creating the quiz:', error.message);
//         //     });

//         // navigate("/allquizes");
//     }

//     const handle_text_change = (event)=>{
//         setquiz_text(event.target.value);
//         console.log(quiz_text)
//     }


//     // const renderQuestionCard = () => {
//     //     if (!selectedQuestion) return null;

//     //     return (
//     //         <div className="card mt-4">
//     //             <div className="card-header">
//     //                 Question {quizData.indexOf(selectedQuestion) + 1}
//     //             </div>
//     //             <div className="card-body">
//     //                 <p>{selectedQuestion.question}</p>
//     //                 <ol>
//     //                     {selectedQuestion.options.map((option, index) => (
//     //                         <li key={index}>{option}</li>
//     //                     ))}
//     //                 </ol>
//     //                 <p><strong>Answer:</strong> {selectedQuestion.answer}</p>
//     //                 <p><strong>Description:</strong> {selectedQuestion.description}</p>
//     //             </div>
//     //         </div>
//     //     );
//     // };

//     return (
//         <div className="container">
//             <div className="header">
//                 <h1>Welcome Admin! Create Today's Quiz.</h1>
//             </div>
//             {/* <div className="row">
//                 <div className="col-md-6">
//                     <form className="centered-form">
//                         <div className="form-floating mt-1">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="question"
//                                 name="question"
//                                 placeholder="Question"
//                                 value={formData.question}
//                                 onChange={handleChange}
//                             />
//                             <label htmlFor="question">Question: *</label>
//                         </div>
//                         {[1, 2, 3, 4].map((index) => (
//                             <div key={index} className="form-floating mt-1">
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id={`option${index}`}
//                                     name="options"
//                                     placeholder={`Option ${index}`}
//                                     value={formData.options[index - 1]}
//                                     onChange={(e) => handleChange(e, index - 1)}
//                                 />
//                                 <label htmlFor={`option${index}`}>{`Option ${index}: `}</label>
//                             </div>
//                         ))}
//                         <div className="form-group mt-3">
//                             <label htmlFor="exampleFormControlSelect1">Select Correct Option*</label>
//                             <select
//                                 className="form-control"
//                                 id="exampleFormControlSelect1"
//                                 name="answer"
//                                 value={formData.answer}
//                                 onChange={handleChange}
//                             >
//                                 {[1, 2, 3, 4].map((option) => (
//                                     <option key={option} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="form-group mt-3">
//                             <label htmlFor="description">Answer Description: </label>
//                             <textarea
//                                 className="form-control"
//                                 id="description"
//                                 name="description"
//                                 rows="3"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                             ></textarea>
//                         </div>
//                         <div className="form-group mt-2 d-flex justify-content-center">
//                             <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>Add Question</button>
//                         </div>
//                     </form>
//                 </div>
//                 <div className="col-md-6">
//                     <div className="form-floating mt-1">
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="subject"
//                             name="subject"
//                             placeholder="Subject"
//                             value={subject}
//                             onChange={(e) => {
//                                 setSubject(e.target.value);
//                             }}
//                         />
//                         <label htmlFor="subject">Subject</label>
//                     </div>
//                     <label htmlFor="" style={{ marginBottom: "10px" }}>Select Image</label>
//                     <br />
//                     <input type="file" onChange={(e) => { setMainImg(e.target.files[0]) }} accept="image/*" />
//                     <div className="card mt-4">
//                         <div className="card-header">
//                             <b>All Questions</b>
//                         </div>
//                         <ul className="list-group list-group-flush">
//                             {renderQuestionList()}
//                         </ul>
//                     </div>
//                     {renderQuestionCard()}

//                     <div className="d-flex justify-content-center mt-3">
//                         <button type="button" className="btn btn-primary" onClick={CreateQuiz}>Create Quiz</button>
//                     </div>
//                 </div>
//             </div> */}
//                 <h1>Enter Test Text</h1>
//                 <textarea className='container'
//                     rows="20"
//                     cols="100"
//                     value={quiz_text}
//                     onChange={handle_text_change}
//                     placeholder="Enter your test text here"
//                 />
//                 <br />
//                 <button onClick={create_quiz}>Submit</button>
//         </div>
//     );
// }



import React, { useContext, useState } from 'react';
import '../styles/createquiz.css';
import Alert from '../components/Alert';
import { useNavigate } from "react-router-dom";
import style from '../styles/quizesPage.css'
import ResultContext from '../context/ResultContext';

export default function CreateQuiz() {
    const HOST = process.env.REACT_APP_HOST_NAME;
    const navigate = useNavigate();
    const [quizText, setQuizText] = useState("");
    const [quizJson, setQuizJson] = useState(null);
    const { setAlertContext } = useContext(ResultContext);

    const showAlert = (message, status) => {
        setAlertContext({
            isActive: true,
            message: message,
            status: status
        })
        setTimeout(() => {
            setAlertContext(prevState => ({ ...prevState, isActive: false }));
        }, 2000);
    }

    function parseQuestions(input) {
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
    }

    const handleTextChange = (event) => {
        setQuizText(event.target.value);
    }

    const createQuiz = () => {
        try {
            const parsedQuiz = parseQuestions(quizText);
            setQuizJson(parsedQuiz);
            showAlert('Quiz parsed successfully. You can now review and edit the questions.', 'success');
        } catch (error) {
            showAlert('There was a problem parsing the quiz text. Please check the format and try again.', 'danger');
        }
    }

    const handleQuestionChange = (index, key, value) => {
        const updatedQuiz = { ...quizJson };
        updatedQuiz.questions[index][key] = value;
        setQuizJson(updatedQuiz);
    }

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuiz = { ...quizJson };
        updatedQuiz.questions[questionIndex].options[optionIndex] = value;
        setQuizJson(updatedQuiz);
    }

    const handleCorrectOptionChange = (questionIndex, value) => {
        const updatedQuiz = { ...quizJson };
        updatedQuiz.questions[questionIndex].answer = value;
        setQuizJson(updatedQuiz);
    }
    
    const [isPremium, setIsPremium] = useState(false);  
  
    const handleCheckboxChange = (event) => {  
      setIsPremium(event.target.checked);  
    };  

    const saveQuiz = () => {
        let url = HOST + 'api/createquiz';
        if (isPremium){
            url = HOST + 'api/create-premium-quiz';
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'admin-token': localStorage.getItem('admin-token')
            },
            body: JSON.stringify(quizJson),
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
        navigate("/allquizes");
    }


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
                            value={quizJson.subject}
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

                    {quizJson.questions.map((question, qIndex) => (
                        <div key={qIndex} className="question-container">
                            <textarea
                                rows="3"
                                cols="100"
                                value={question.question}
                                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                            />
                            {question.options.map((option, oIndex) => (
                                <div key={oIndex} className="option-container">
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    />
                                </div>
                            ))}
                            <label>Correct Option:</label>
                            <select
                                value={question.answer}
                                onChange={(e) => handleCorrectOptionChange(qIndex, e.target.value)}
                            >
                                {question.options.map((_, oIndex) => (
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
