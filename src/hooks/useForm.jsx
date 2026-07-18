import { useState } from 'react';

export function useForm(initialValues = {}, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    
    // Validate individual fields on blur if a validation function exists
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  };

  const handleSubmit = (onSubmitCallback) => (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      // Only execute the submit callback if there are no validation error keys
      if (Object.keys(validationErrors).length === 0) {
        onSubmitCallback(values);
      }
    } else {
      onSubmitCallback(values);
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setErrors,
    setTouched
  };
}