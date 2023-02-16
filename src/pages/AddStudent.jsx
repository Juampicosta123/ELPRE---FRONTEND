import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import "../styles/add-student.css";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = "https://elpre-backend.onrender.com/api/student";

const AddStudent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [secondarymobile, setSecondarymobile] = useState("");
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);

  const addStudent = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const token = localStorage.getItem("Authorization");
      const student = {
        name,
        email,
        address,
        mobile,
        secondary_mobile: secondarymobile,
        dni,
      };
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await axios.post(baseUrl, student, config);
      navigate("/home");
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5">Loading...</h4>
            ) : (
              <>
                <h4 className="mb-5 fw-bold">Agregar Alumno</h4>
                <Form onSubmit={addStudent}>
                  <FormGroup className="form__group">
                    <div className="group">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input"
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Nombre y Apellido</label>
                    </div>
                  </FormGroup>
                  <FormGroup className="form__group">
                    <div className="group">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Email</label>
                    </div>
                  </FormGroup>
                  <FormGroup className="form__group">
                    <div className="group">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="input"
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Dirección</label>
                    </div>
                  </FormGroup>
                  <FormGroup className="form__group">
                    <div className="group">
                      <input
                        type="text"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        required
                        className="input"
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>DNI</label>
                    </div>
                  </FormGroup>
                  <FormGroup className="form__group">
                    <div className="group">
                      <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        className="input"
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Teléfono del Alumno</label>
                    </div>
                  </FormGroup>
                  <FormGroup className="form__group">
                    <div className="group">
                      <input
                        type="text"
                        value={secondarymobile}
                        onChange={(e) => setSecondarymobile(e.target.value)}
                        required
                        className="input"
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Teléfono Responsable</label>
                    </div>
                  </FormGroup>
                  <button className="btn btn-primary" type="submit">
                    Agregar Alumno
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddStudent;
