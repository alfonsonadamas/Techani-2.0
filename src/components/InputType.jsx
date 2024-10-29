import React, { useEffect, useState } from "react";

export default function InputType({
  input,
  options,
  question,
  name,
  handleChange,
  disabled,
  placeholder,
  value,
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [init, setInit] = useState(null)
  
  const verifyIsDisabled = () => {
    if (disabled === undefined || disabled === "si") {
      setIsDisabled(false);
    } else setIsDisabled(true);
  };

  useEffect(() => {
    verifyIsDisabled();
    setInit(value)
  }, [disabled]);

  return (
    <div className="w-11/12">
      <h2 className="font-semibold mt-0">{question}</h2>
      <div>
        {input === "select" ? (
          <select
            id={name}
            name={name}
            value={init !== undefined ? value : "disabled" }
            className={
              "bg-white border border-black text-gray-900 border-radius text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md"
            }
            onChange={handleChange}
          >
            <option value="disabled" disabled>
              Selecciona una opción
            </option>
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
            placeholder={placeholder}
            disabled={isDisabled}
            className={`${
              isDisabled === false
                ? "bg-white border border-black text-gray-900" // Clases si no está deshabilitado.
                : "bg-gray-200 border border-gray-400 text-gray-500"
            } 
          border-radius text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md`}
            onChange={handleChange}
            value={value}
          />
        )}
      </div>
    </div>
  );
}
