import React from 'react';

const JSComponent = ({ setJsCode }) => {
  return (
    <div>
      <label>Javascript</label>
      <textarea name='javascript' onChange={(e) => setJsCode(e.target.value)}></textarea>
    </div>
  );
};

export default JSComponent;
