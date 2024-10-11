import React from 'react';
import '../styles/articleComp.css'; // Import your CSS file for styling
import InarticleAd from './InarticleAd';

const ArticleComp = ({ subheading, text }) => {
  const lines = text.split(/<br\s*\/?>/i);  
  return (
    <div className="container-article">
      <div className="subheading">{subheading}</div>
      <div className="text">
        {lines.map((line, index) => (
          // Render each line with a <br> tag
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ArticleComp;
