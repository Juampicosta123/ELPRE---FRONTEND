import React, { useState } from "react";

import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import loginService from "../services/login";
import { toast } from "react-toastify";

import "../styles/login.css";



const Login = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await loginService.login({
        email,
        password,
      });

      loginService.setToken(user.data.token);
      const token = localStorage.getItem("Authorization");
      const config = {
        headers: {
          Authorization: token,
        },
      };
      setLoading(false);
      toast.success("Succesfully logged in");
      setEmail("");
      setPassword("");
      setLogin();

      navigate("/home");
    } catch (error) {
      setLoading(false);
      toast.error(e.message);
      // toast.error("Email o contraseña invalidos. Vuelve a intentarlo");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          {loading ? (
            <Col lg="12" className="text-center">
              <h5 className="fw-bold">Loading...</h5>
            </Col>
          ) : (
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Login</h3>

              <Form className="auth__form" onSubmit={(e) => handleLogin(e)}>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Ingresar email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth__input"
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Ingresar contraseña..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <button type="submit" className="buy__btn">
                  Login
                </button>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Login;
