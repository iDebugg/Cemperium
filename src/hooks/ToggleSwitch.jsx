import React, { useState } from 'react';


const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="toggle-switch"> 
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
