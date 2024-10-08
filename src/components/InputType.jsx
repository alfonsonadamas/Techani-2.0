import React from 'react'

export default function InputType({input, options, question, name, handleChange, emergent}) {
    return (
    <div className="" style={{maxWidth: "400px"}}>
      <h2 className="font-bold mt-0 ">{question}</h2> 
      { input === "select" ?(
        <select 
          id={name}
          name={name}
          defaultValue="disabled"          
          className={
            emergent === "si" ?
            "bg-gray-500 border border-black text-gray-900 border-radius text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700 shadow-md"
              : 
            "bg-white border border-black text-gray-900 border-radius text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md"
            }
          style={{maxWidth:"400px"}}
          onChange={handleChange}
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
        id={name}
        name={name}
        type={input} 
        className={
          emergent ?
          "bg-white border border-black text-gray-900 border-radius text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700 shadow-md"
            : 
          "bg-white border border-black text-gray-900 border-radius text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md"
        }
        style={{maxWidth:"400px"}}
        onChange={handleChange}
      />
      )}
        
    </div>
  )
}
