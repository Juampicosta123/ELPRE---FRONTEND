import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import Notificationpay from "../NotificationPay/NotificationPay";

const Layout = () => {
  const [isLogged, setIsLogged] = React.useState("0");

  function setLogin() {
    setIsLogged("1");
  }
  return (
    <>
      {/* <Notificationpay isLogged={isLogged} /> */}
      <Header isLogged={isLogged} />
      <Routers isLogged={isLogged} setLogin={setLogin} />
      <Footer />
    </>
  );
};

export default Layout;
