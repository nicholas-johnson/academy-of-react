import "./App.css";
import Form from "./Form";
import { Header } from "./Header";
import { useState } from "react";
import Toogle from "./Toogle";

function App() {
  const [name, setName] = useState("Nicholas");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with name: ", name);
  };

  return (
    <div>
      <Header name={name} />
      <Form
        name={name}
        onNameChange={handleNameChange}
        onSubmit={handleSubmit}
      />
      <Toogle />
    </div>
  );
}

export default App;
