import React from 'react';
import Card from '../../components/card';
import './gistsGrid.scss';

const GistsGrid = () => {
  const numCards = 8;

  return (
    <div className="grid">
      {Array.from({ length: numCards }).map((_, index) => (
        <Card key={index} />
      ))}
    </div>
  );
};

export default GistsGrid;
