import React from "react";
import "./layout.scss";

const Header = () => {
  return (
    <div className="text-center my-5" id="header">
      <img src={process.env.PUBLIC_URL + "/images/Santander_Logotipo.svg"} />
    </div>
  );
};

export default Header;
