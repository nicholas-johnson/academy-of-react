import { useUser } from "./UserContext";

export const UserForm = () => {
  const { user, setUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: e.target.name.value, age: e.target.age.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age"
        value={user.age}
        onChange={(e) => setUser({ ...user, age: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
