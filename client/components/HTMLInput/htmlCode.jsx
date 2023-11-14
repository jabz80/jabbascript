import React from 'react';

const HTMLComponent = ({ setHtmlCode }) => {
  return (
    <div>
      <label>HTML</label>
      <textarea name='html' onChange={(e) => setHtmlCode(e.target.value)}></textarea>
    </div>
  );
};

export default HTMLComponent;
