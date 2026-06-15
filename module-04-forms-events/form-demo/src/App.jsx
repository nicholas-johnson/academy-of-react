import { useState } from "react";
import "./App.css";

import Form from "./Form";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  return (
    <div>
      <Form
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        errors={errors}
      />
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </div>
  );
}

export default App;
