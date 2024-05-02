// Card.js

import React from 'react';
import './card.scss';
import CardPic from '../../assets/cardpic1.jpg';

const Card = () => {
  return (
    <div className="card">
      <div className="first-element">
        adssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
      </div>
      <div className="second-element">
        <div className="nested-container">
          <div className="image-container">
            <img src={CardPic} alt="Your Image" />
          </div>
          <div className="text-container">
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
            <p>Paragraph 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
