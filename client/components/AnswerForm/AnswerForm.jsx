import React from 'react';

const AnswerForm = ({ setHtmlCode, setCssCode, setJsCode, handleOutput }) => {
  return (
  <div className="row">
    <div className="col">
      <div className="IDE">
        <div className="Code">
          <div className="form-group row">
          <div className="mb-3 col">
            <label htmlFor="html" className="form-label">HTML</label>
            <textarea className="form-control" id="html" name="html" onChange={(e) => setHtmlCode(e.target.value)}></textarea>
          </div>
          <div className="mb-3 col">
            <label htmlFor="css" className="form-label">CSS</label>
            <textarea className="form-control" id="css" name="css" onChange={(e) => setCssCode(e.target.value)}></textarea>
          </div>
          </div>
          <div className="mb-3">
            <label htmlFor="javascript" className="form-label">JavaScript</label>
            <textarea className="form-control" id="javascript" name="javascript" onChange={(e) => setJsCode(e.target.value)}></textarea>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleOutput}>Run Code</button>
      </div>
    </div>
  </div>
  );
};

export default AnswerForm;
