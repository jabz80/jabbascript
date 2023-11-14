import React from 'react';

const CSSComponent = ({ setCssCode }) => {
  return (
    <div>
      <label>CSS</label>
      <textarea name='css' onChange={(e) => setCssCode(e.target.value)}></textarea>
    </div>
  );
};

export default CSSComponent;
