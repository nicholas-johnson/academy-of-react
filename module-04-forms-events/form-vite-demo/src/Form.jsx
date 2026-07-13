const Form = ({ name, onNameChange, onSubmit }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>Form Vite Demo</h1>
        <input type="text" value={name} onChange={onNameChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
