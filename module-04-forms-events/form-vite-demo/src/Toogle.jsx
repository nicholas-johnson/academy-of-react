import { useState } from "react";

const Toogle = () => {
  const [isOn, setIsOn] = useState(false);
  console.log("isOn", isOn);

  const handleToogle = () => {
    setIsOn(!isOn);
  };

  return <button onClick={handleToogle}>{isOn ? "On" : "Off"}</button>;
};

export default Toogle;
