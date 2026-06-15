import Counter from "./Counter/Counter";
import { Form } from "./Form/Form";
import { Profile } from "./Profile/Profile";

import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  // const [name, setName] = useState("Dave");
  // const [email, setEmail] = useState("dave@example.com");

  const initialProfile = {
    name: "Dave",
    email: "dave@example.com",
  };

  const [profile, setProfile] = useState(initialProfile);

  return (
    <div>
      <h1>State Demo</h1>
      <Form profile={profile} gfdsgfdsgdfs={setProfile} />
      <Profile profile={profile} />
      <Counter count={count} setCount={setCount} />
    </div>
  );
}

export default App;
