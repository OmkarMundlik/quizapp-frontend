import React from 'react';
import '../styles/articleComp.css'; // Import your CSS file for styling

const ArticleComp = ({ subheading, text }) => {
  return (
    <div className="container-article">
      <div className="subheading">{subheading}</div>
      <div className="text">{text}</div>
    </div>
  );
}

export default ArticleComp;
