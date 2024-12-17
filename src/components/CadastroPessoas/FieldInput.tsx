import React
 from "react";
interface FieldInputProps {
    label: string;
    id: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
  }
  
  const FieldInput: React.FC<FieldInputProps> = ({ label, id, value, onChange, type = "text" }) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-1 text-gray-700">{label}</label>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    );
  };
  
  export default FieldInput;
  