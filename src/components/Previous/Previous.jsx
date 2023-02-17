import React from "react";
import { Link } from "react-router-dom";
const Previous = ({navigate}) => {
  return (
    <Link to={navigate}>
     <button className="btn btn-secondary my-3 ms-5 d-flex ">
      Volver<i className="ri-arrow-left-line ms-1"></i>
    </button>
    </Link>
   
  );
};

export default Previous;
