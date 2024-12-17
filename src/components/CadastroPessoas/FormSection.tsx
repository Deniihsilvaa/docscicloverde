// src/components/CadastroPessoas/FormSection.tsx
import React, { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="pb-4 my-6 border-b">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">{children}</div>
    </div>
  );
};

export default FormSection;
