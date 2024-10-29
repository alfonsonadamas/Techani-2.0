import React from "react";

export default function Question({ type, question, options }) {
  return (
    <div>
      <h1>Question</h1>
      {type === "text" ? (
        <div>
          <label>{question}</label>
          <input type="text" />
        </div>
      ) : (
        <div>
          <label>{question}</label>
          <select name="" id="">
            {options.map((option) => (
              <div>
                <option value="">{option}</option>
              </div>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
