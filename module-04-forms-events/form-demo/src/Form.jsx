const Form = ({ formData, setFormData, onSubmit, errors }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
        {errors.message && <p className="error">{errors.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
