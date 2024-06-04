import React, { useState } from "react";
import axios from "axios";

function ChatComponent() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiKey = "sk-proj-sq27ZguF8cP9WxDQdLi6T3BlbkFJCWBrT5mVxDQaEF1AW55m";
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003", // Puedes cambiar el modelo según tus necesidades
          prompt: input,
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setResponse(response.data.choices[0].text.trim());
    } catch (error) {
      console.error("Error al solicitar respuesta:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleChange} />
        <button type="submit">Enviar</button>
      </form>
      {response && <div>{response}</div>}
    </div>
  );
}

export default ChatComponent;
