export function Form({ profile, gfdsgfdsgdfs }) {
  const handleNameChange = (e) => {
    console.log("handleNameChange", e);
    gfdsgfdsgdfs({ ...profile, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    gfdsgfdsgdfs({ ...profile, email: e.target.value });
  };

  return (
    <div>
      <h2>Form</h2>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={profile.name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleEmailChange}
          />
        </div>
      </form>
    </div>
  );
}
