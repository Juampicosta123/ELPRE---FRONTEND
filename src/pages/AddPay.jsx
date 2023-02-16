import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import "../styles/add-student.css";
import axios from "axios";

const baseUrl = "https://elpre-backend.onrender.com/api/pay";
const getUrl = "https://elpre-backend.onrender.com/api/pay";

const AddPay = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  

  const addPay = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const token = localStorage.getItem("Authorization");
      const pay = {
        year,
        month,
        day,
        dni,
      };
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await axios.put(baseUrl, pay, config);
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
                <h4 className="mb-5 fw-bold">Agregar Pago</h4>
                <Form
                  onSubmit={(e) => {
                    addPay(e);
                  }}
                >
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
                      <label>DNI del Alumno</label>
                    </div>
                  </FormGroup>
                  <FormGroup className="form__group">
                    <div className="group">
                      <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                        className="input"
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Año</label>
                    </div>
                  </FormGroup>
                  <FormGroup className="form__group">
                    <div className="group">
                      <input
                        type="text"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required
                        className="input"
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Mes</label>
                    </div>
                  </FormGroup>
                  <FormGroup className="form__group">
                    <div className="group">
                      <input
                        type="text"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        required
                        className="input"
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Día</label>
                    </div>
                  </FormGroup>

                  <button className="btn btn-primary" type="submit">
                    Agregar Pago
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

export default AddPay;
