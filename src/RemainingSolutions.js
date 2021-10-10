import React from 'react';
// import './FoundSolutions.css';

function RemainingSolutions({ foundSolutions, allSolutions }) {
  const remainingSolutions = allSolutions.filter(elem => !foundSolutions.includes(elem));
  return (
    <div className="Found-solutions-list">
      <h4>Remaining Solutions: {remainingSolutions.length}</h4>
      <ul>
        {
          remainingSolutions.sort().map((word, idx) => <li key={idx}>{word}</li>)
        }
      </ul>
    </div>
  );
}

export default RemainingSolutions;
