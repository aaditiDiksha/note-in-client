import React, { useState } from "react";
import "./Content.css";

export default function Content({
  currentPage,
  onSave,
  save,
}) {

  //---- STATE----
  const [content, setContent] = useState("");
  
  //---- FUNCTION ----
  const loadContent = (event) => {
    setContent(event.target.value);
  };


//---------------------------- RETURN --------------------
  if (currentPage)
    return (
      <div className="notebooks">
        <div key={currentPage.title}>
          <h3 className="page-title">{currentPage.title} </h3>
          <div className="save">
            <button onClick={() => {onSave(content)}} className="button">
              SAVE NOTE
            </button>
            <h4 className={save ? "saved" : "not-saved"}>Saved Successfully</h4>
          </div>
        </div>
        <div key={currentPage.content}>
          <label htmlFor="notes" />
          <textarea
            className="note"
            name="note"
            id="note"
            rows="28"
            placeholder="Enter your notes here"
            onChange={loadContent}
            defaultValue={currentPage.content === null ? '' : currentPage.content}
          ></textarea>
        </div>
      </div>
    );
  else {
    return <h2 className="message">Open your notes, or create one</h2>;
  }
}

//its replacing the old content with new, even the one which is not changed
