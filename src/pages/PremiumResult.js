import React, { useContext, useEffect, useState } from 'react';  
import ResultContext from '../context/ResultContext';  
import Answer from '../components/Answer';  
import { Link } from 'react-router-dom';  
import '../styles/Result.css';  
import Spinner from '../components/Spinner';  
import Categories from '../components/Categories';  
import Navbar from '../components/Navbar';  
import InfeedAd from '../components/InfeedAd';  
import html2pdf from 'html2pdf.js';  

export default function PremiumResult() {  
    const formatDate = (timestamp) => {  
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];  
        const date = new Date(timestamp);  
        const day = date.getDate();  
        const month = months[date.getMonth()];  
        const year = date.getFullYear();  
        return `${day} ${month} ${year}`;  
    };  

    const compareDates = (a, b) => {  
        return new Date(b.date) - new Date(a.date);  
    };  

    const HOST = process.env.REACT_APP_HOST_NAME;  
    const [quizes, setQuizes] = useState(null);  

    const fetchData = async () => {  
        try {  
            const response = await fetch(HOST + 'api/getallquizes', {  
                method: "GET",  
                headers: {  
                    "Content-Type": "application/json"  
                }  
            });  
            if (!response.ok) {  
                throw new Error('Failed to fetch quizzes');  
            }  
            const data = await response.json();  
            // Sort the quizzes based on date in descending order  
            const sortedQuizzes = data.sort(compareDates);  
            setQuizes(sortedQuizzes);  
        } catch (error) {  
            console.error('Error fetching quizzes:', error);  
        }  
    };  

    const { quizData, score, responses } = useContext(ResultContext);  
    useEffect(() => {  
        fetchData();  
        if (quizes && quizData) {  
            setQuizes(quizes.filter(quiz => quiz._id !== quizData._id));  
        }  
    }, []);  

    // Function to download the current webpage as a PDF  
    const downloadPdf = () => {  
        const element = document.getElementById('result-container');  
        html2pdf().from(element).save('quiz-result.pdf');  
    };  

    // Render a message if quizData is not yet loaded or responses are empty  
    if (!quizData || responses.length === 0) {  
        return <div className="center-container">Start a Quiz First!!</div>;  
    }  


    return (  
        <>  
            <Navbar />  
            <div className="result-container" id="result-container">  
                <h1 className="result-heading">Quiz Result</h1>  
                <div className="score-container">  
                    <h2 className="score-text">Your Score: {score*2}/{quizData.questions.length*2}</h2>  
                    <button onClick={downloadPdf} className="btn btn-primary">Download as PDF</button>  
                </div>  
                <div className="quiz-container">  
                    {quizData.questions.map((question, id) => (  
                        <React.Fragment key={id}>  
                            <div className="question-container">  
                                <Answer  
                                    question={question}  
                                    id={id}  
                                    selected={responses[id]}  
                                    answer={quizData.questions[id].answer}  
                                />  
                            </div>  
                        </React.Fragment>  
                    ))}  
                </div>  
                {/* <h1 className="text-center">See More Tests</h1>  
                {!quizes ? <Spinner /> :  
                    <ul className="list-group">  
                        {quizes.slice(0, 7).map(quiz => (  
                            <Link to={`/start/${quiz._id}`} key={quiz._id} className="text-decoration-none">  
                                <li className="list-group-item d-flex justify-content-between align-items-center my-2 p-3">  
                                    <div className="d-flex align-items-center">  
                                        <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720805005/test_series_y3kecu.jpg" alt="" height="65px" width="100px" className="me-3" />  
                                        <div>  
                                            <strong>{quiz.subject}</strong><br />  
                                            <strong>{formatDate(quiz.date)}</strong>  
                                        </div>  
                                    </div>  
                                </li>  
                            </Link>  
                        ))}  
                    </ul>  
                }   */}
                {/* <Categories />   */}
                {/* <p>{quizData}</p> */}
            </div>  
        </>  
    );  
}  

// import React, { useContext, useEffect, useState } from 'react';  
// import ResultContext from '../context/ResultContext';  
// import Answer from '../components/Answer';  
// import '../styles/Result.css';  
// import Spinner from '../components/Spinner';  
// import Navbar from '../components/Navbar';  
// import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';  
// import { saveAs } from 'file-saver';  
  
// export default function PremiumResult() {  
//     const formatDate = (timestamp) => {  
//         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];  
//         const date = new Date(timestamp);  
//         const day = date.getDate();  
//         const month = months[date.getMonth()];  
//         const year = date.getFullYear();  
//         return `${day} ${month} ${year}`;  
//     };  
  
//     const compareDates = (a, b) => {  
//         return new Date(b.date) - new Date(a.date);  
//     };  
  
//     const HOST = process.env.REACT_APP_HOST_NAME;  
//     const [quizes, setQuizes] = useState(null);  
  
//     const fetchData = async () => {  
//         try {  
//             const response = await fetch(HOST + 'api/getallquizes', {  
//                 method: "GET",  
//                 headers: {  
//                     "Content-Type": "application/json"  
//                 }  
//             });  
//             if (!response.ok) {  
//                 throw new Error('Failed to fetch quizzes');  
//             }  
//             const data = await response.json();  
//             const sortedQuizzes = data.sort(compareDates);  
//             setQuizes(sortedQuizzes);  
//         } catch (error) {  
//             console.error('Error fetching quizzes:', error);  
//         }  
//     };  
  
//     const { quizData, score, responses } = useContext(ResultContext);  
//     console.log("Score", score);  
//     console.log("Responses", responses);  
  
//     useEffect(() => {  
//         fetchData();  
//         if (quizes && quizData) {  
//             setQuizes(quizes.filter(quiz => quiz._id !== quizData._id));  
//         }  
//     }, []);  
  
//     const downloadPdf = async () => {  
//         const { date, subject, questions } = quizData;  
//         const websiteName = "spardhaweb.com";  
  
//         const pdfDoc = await PDFDocument.create();  
//         const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);  
//         const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);  
  
//         let page = pdfDoc.addPage();  
//         let yPosition = page.getHeight() - 50;  
//         const fontSize = 12;  
//         const headerFontSize = 16;  
//         const lineHeight = 20;  
//         const margin = 50;  
  
//         const drawWatermark = (page) => {  
//             const pageWidth = page.getWidth();  
//             const pageHeight = page.getHeight();  
//             const text = websiteName;  
//             const textSize = 70;  
//             const textWidth = timesRomanFont.widthOfTextAtSize(text, textSize);  
//             const textHeight = timesRomanFont.heightAtSize(textSize);  
  
//             const textX = (pageWidth - textWidth) / 2;  
//             const textY = (pageHeight - textHeight) / 2;  
  
//             page.drawText(text, {  
//                 x: textX + 10,  
//                 y: textY + 100,  
//                 size: textSize,  
//                 font: timesRomanFont,  
//                 color: rgb(0.9, 0.9, 0.9),  
//                 opacity: 0.7,  
//                 rotate: degrees(-45),  
//             });  
//         };  
  
//         const drawHeader = (page) => {  
//             drawWatermark(page);  
//             yPosition = page.getHeight() - margin;  
//             const pageWidth = page.getWidth();  
//             const headerText = `${subject}\n${formatDate(date)}\n${websiteName}`;  
//             const headerLines = headerText.split('\n');  
//             headerLines.forEach((line, index) => {  
//                 const textWidth = timesBoldFont.widthOfTextAtSize(line, headerFontSize);  
//                 const textX = (pageWidth - textWidth) / 2;  
//                 page.drawText(line, {  
//                     x: textX,  
//                     y: yPosition - (index * lineHeight),  
//                     size: headerFontSize,  
//                     font: timesBoldFont,  
//                     color: rgb(0, 0, 0),  
//                 });  
//             });  
//             yPosition -= lineHeight * (headerLines.length + 1);  
//         };  
  
//         drawHeader(page);  
  
//         questions.forEach((q, index) => {  
//             if (yPosition < margin) {  
//                 page = pdfDoc.addPage();  
//                 drawHeader(page);  
//             }  
  
//             const questionBoxHeight = lineHeight * (q.options.length + 3);  
//             page.drawRectangle({  
//                 x: margin - 10,  
//                 y: yPosition - questionBoxHeight + 20,  
//                 width: page.getWidth() - margin * 2 + 20,  
//                 height: questionBoxHeight,  
//                 borderColor: rgb(0, 0, 0),  
//                 borderWidth: 1,  
//             });  
  
//             const questionText = `${index + 1}. ${q.question}`;  
//             page.drawText(questionText, {  
//                 x: margin,  
//                 y: yPosition,  
//                 size: fontSize,  
//                 font: timesBoldFont,  
//                 color: rgb(0, 0, 0),  
//             });  
  
//             yPosition -= lineHeight;  
//             q.options.forEach((option, optIndex) => {  
//                 if (yPosition < margin) {  
//                     page = pdfDoc.addPage();  
//                     drawHeader(page);  
//                 }  
  
//                 const optionText = `${optIndex + 1}. ${option}`;  
//                 page.drawText(optionText, {  
//                     x: margin + 20,  
//                     y: yPosition,  
//                     size: fontSize,  
//                     font: timesRomanFont,  
//                     color: rgb(0, 0, 0),  
//                 });  
//                 yPosition -= lineHeight;  
//             });  
  
//             if (yPosition < margin) {  
//                 page = pdfDoc.addPage();  
//                 drawHeader(page);  
//             }  
  
//             const answerText = `Answer: ${q.answer}`;  
//             page.drawText(answerText, {  
//                 x: margin,  
//                 y: yPosition,  
//                 size: fontSize,  
//                 font: timesRomanFont,  
//                 color: rgb(0, 0, 0),  
//             });  
//             yPosition -= lineHeight * 2;  
//         });  
  
//         const pdfBytes = await pdfDoc.save();  
//         const blob = new Blob([pdfBytes], { type: 'application/pdf' });  
//         saveAs(blob, 'quiz-result.pdf');  
//     };  
  
//     const downloadResponseSheet = async (score, responses) => {  
//         const { date, subject, questions } = quizData;  
//         const websiteName = "spardhaweb.com";  
  
//         const pdfDoc = await PDFDocument.create();  
//         const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);  
//         const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);  
  
//         let page = pdfDoc.addPage();  
//         let yPosition = page.getHeight() - 50;  
//         const fontSize = 12;  
//         const headerFontSize = 16;  
//         const lineHeight = 20;  
//         const margin = 50;  
  
//         const drawWatermark = (page) => {  
//             const pageWidth = page.getWidth();  
//             const pageHeight = page.getHeight();  
//             const text = websiteName;  
//             const textSize = 70;  
//             const textWidth = timesRomanFont.widthOfTextAtSize(text, textSize);  
//             const textHeight = timesRomanFont.heightAtSize(textSize);  
  
//             const textX = (pageWidth - textWidth) / 2;  
//             const textY = (pageHeight - textHeight) / 2;  
  
//             page.drawText(text, {  
//                 x: textX + 10,  
//                 y: textY + 120,  
//                 size: textSize,  
//                 font: timesRomanFont,  
//                 color: rgb(0.9, 0.9, 0.9),  
//                 opacity: 0.7,  
//                 rotate: degrees(-45),  
//             });  
//         };  
  
//         const drawHeader = (page) => {  
//             drawWatermark(page);  
//             yPosition = page.getHeight() - margin;  
//             const pageWidth = page.getWidth();  
//             const headerText = `${subject}\n${formatDate(date)}\n${websiteName}\nTotal Score: ${2 * questions.length}\nObtained Score: ${score*2}`;  
//             const headerLines = headerText.split('\n');  
//             headerLines.forEach((line, index) => {  
//                 const textWidth = timesBoldFont.widthOfTextAtSize(line, headerFontSize);  
//                 const textX = (pageWidth - textWidth) / 2;  
//                 page.drawText(line, {  
//                     x: textX,  
//                     y: yPosition - (index * lineHeight),  
//                     size: headerFontSize,  
//                     font: timesBoldFont,  
//                     color: rgb(0, 0, 0),  
//                 });  
//             });  
//             yPosition -= lineHeight * (headerLines.length + 1);  
//         };  
  
//         drawHeader(page);  
  
//         questions.forEach((q, index) => {  
//             if (yPosition < margin) {  
//                 page = pdfDoc.addPage();  
//                 drawHeader(page);  
//             }  
  
//             const questionBoxHeight = lineHeight * (q.options.length + 4);  
//             page.drawRectangle({  
//                 x: margin - 10,  
//                 y: yPosition - questionBoxHeight + 20,  
//                 width: page.getWidth() - margin * 2 + 20,  
//                 height: questionBoxHeight,  
//                 borderColor: rgb(0, 0, 0),  
//                 borderWidth: 1,  
//             });  
  
//             const questionText = `${index + 1}. ${q.question}`;  
//             page.drawText(questionText, {  
//                 x: margin,  
//                 y: yPosition,  
//                 size: fontSize,  
//                 font: timesBoldFont,  
//                 color: rgb(0, 0, 0),  
//             });  
  
//             yPosition -= lineHeight;  
//             q.options.forEach((option, optIndex) => {  
//                 if (yPosition < margin) {  
//                     page = pdfDoc.addPage();  
//                     drawHeader(page);  
//                 }  
  
//                 const optionText = `${optIndex + 1}. ${option}`;  
//                 let optionColor = rgb(0, 0, 0);  
  
//                 if (responses[index] === option) {  
//                     if (option === q.answer) {  
//                         optionColor = rgb(0, 1, 0);  
//                     } else {  
//                         optionColor = rgb(1, 0, 0);  
//                     }  
//                     page.drawRectangle({  
//                         x: margin + 10,  
//                         y: yPosition - lineHeight / 2,  
//                         width: page.getWidth() - margin * 2 - 20,  
//                         height: lineHeight,  
//                         color: optionColor,  
//                         opacity: 0.3,  
//                     });  
//                 }  
  
//                 page.drawText(optionText, {  
//                     x: margin + 20,  
//                     y: yPosition,  
//                     size: fontSize,  
//                     font: timesRomanFont,  
//                     color: rgb(0, 0, 0),  
//                 });  
//                 yPosition -= lineHeight;  
//             });  
  
//             if (yPosition < margin) {  
//                 page = pdfDoc.addPage();  
//                 drawHeader(page);  
//             }  
  
//             const answerText = `Selected Answer: ${responses[index]}\nCorrect Answer: ${q.answer}`;  
//             const answerLines = answerText.split('\n');  
//             answerLines.forEach((line, i) => {  
//                 page.drawText(line, {  
//                     x: margin,  
//                     y: yPosition - (i * lineHeight),  
//                     size: fontSize,  
//                     font: timesRomanFont,  
//                     color: rgb(0, 0, 0),  
//                 });  
//             });  
//             yPosition -= lineHeight * (answerLines.length + 1);  
//         });  
  
//         const pdfBytes = await pdfDoc.save();  
//         const blob = new Blob([pdfBytes], { type: 'application/pdf' });  
//         saveAs(blob, 'response-sheet.pdf');  
//     };  
  
//     if (!quizData || responses.length === 0) {  
//         return <div className="center-container">Start a Quiz First!!</div>;  
//     }  
  
//     return (  
//         <>  
//             <Navbar />  
//             <div className="result-container" id="result-container">  
//                 <h1 className="result-heading">Quiz Result</h1>  
//                 <div className="score-container">  
//                     <h2 className="score-text">Your Score: {score * 2}/{quizData.questions.length * 2}</h2>  
//                     <button onClick={downloadPdf} className="btn btn-primary m-2">Download as PDF</button>  
//                     <button onClick={() => { downloadResponseSheet(score, responses) }} className="btn btn-primary">Download Response sheet</button>  
//                 </div>  
//                 <div className="quiz-container">  
//                     {quizData.questions.map((question, id) => (  
//                         <React.Fragment key={id}>  
//                             <div className="question-container">  
//                                 <Answer  
//                                     question={question}  
//                                     id={id}  
//                                     selected={responses[id]}  
//                                     answer={quizData.questions[id].answer}  
//                                 />  
//                             </div>  
//                         </React.Fragment>  
//                     ))}  
//                 </div>  
//             </div>  
//         </>  
//     );  
// }  