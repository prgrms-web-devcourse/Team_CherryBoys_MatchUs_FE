import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';

interface UseFormArgs<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate: (values: T) => T;
}

const useForm = <T>({ initialValues, onSubmit, validate }: UseFormArgs<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<T>(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const newError = validate(values);
    setErrors(newError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const newErrors = validate ? validate(values) : initialValues;
    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values);
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    setValues,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
