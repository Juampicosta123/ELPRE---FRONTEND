import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "https://elpre-backend.onrender.com/api/notpay";

const NotificationPay = ({ isLogged }) => {
  const [students, setStudents] = useState([]);
  let day = new Date().getDate();

  useEffect(() => {
    if (day >= 15) {
      if (isLogged === "1") {
        const token = localStorage.getItem("Authorization");
        const config = {
          headers: {
            Authorization: token,
          },
        };
        axios.get(baseUrl, config).then((response) => {
          const { data } = response;
          setStudents(data);
        });
      }
    }
  });

  return <></>;
};

export default NotificationPay;
