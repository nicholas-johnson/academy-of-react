import { useUser } from "./UserContext";

export const Profile = () => {
  const { user } = useUser();
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
};
