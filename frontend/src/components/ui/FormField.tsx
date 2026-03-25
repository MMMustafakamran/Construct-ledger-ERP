import React from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, children, required }) => {
  const id = React.useMemo(() => `field-${Math.random().toString(36).substr(2, 9)}`, []);
  
  return (
    <div className={`form-field ${error ? "has-error" : ""}`}>
      <label className="form-label" htmlFor={id}>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="form-control-wrapper">
        {React.isValidElement(children) 
          ? React.cloneElement(children as React.ReactElement, { id }) 
          : children}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormField;
