import React, {useEffect, useState} from 'react'

export default function InputType(props) {
    const { input : inputProp, options: optionsProp, question: questionProp} = props;
    const [input,setInput] = useState(null);
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([{}]);
  
    useEffect(() =>{
      console.log(props)
      if(inputProp === "select"){
        setInput("select");
      } else setInput(inputProp);
    
      if(optionsProp){
        setOptions(optionsProp);
      }
      setQuestion(questionProp)
    })
      
    return (
    <div>
      <h2 className="font-bold pt-6">{question}</h2> 
      { input === "select" ?(
        <select 
        
          defaultValue="disabled"
          onChange={(event) => event.target.value}
          className="bg-white border mt-2 border-black text-gray-900 border-radius text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md"
          style={{maxWidth:"400px"}}
        >
          <option value="disabled" disabled>-- Selecciona una opción --</option>
          {options.map((item) => (
            <option key={item.option} value={item.option}>
              {item.value}
            </option>
          ))}
        
        </select>
      ) : (
        <input 
        type={input} 
        className='bg-white border mt-2 border-black text-gray-900 border-radius text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md'
        style={{maxWidth:"400px"}}
      />
      )}
        
    </div>
  )
}
