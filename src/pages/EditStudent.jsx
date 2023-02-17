import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import "../styles/add-student.css";
import axios from "axios";
import Previous from "../components/Previous/Previous";

const baseUrl = "https://elpre-backend.onrender.com/api/student";

const EditStudent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [secondarymobile, setSecondarymobile] = useState("");
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [original, setOriginal] = useState([]);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("Authorization");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios.get(`${baseUrl}/${id}`, config).then((response) => {
      const { data } = response.data;
      setOriginal(data);
      setLoading(false);
    });
  }, [id]);

  const editStudent = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const token = localStorage.getItem("Authorization");
      const student = {
        name: name !== "" ? name : original.name,
        email: email !== "" ? email : original.email,
        address: address !== "" ? address : original.address,
        mobile: mobile !== "" ? mobile : original.mobile,
        secondary_mobile:
          secondarymobile !== "" ? secondarymobile : original.secondary_mobile,
        dni: dni !== "" ? dni : original.dni,
      };
      const config = {
        headers: {
          Authorization: token,
        },
      };

      await axios.put(`${baseUrl}/${id}`, student, config).then((response) => {
        const { data } = response.data;
        setOriginal(data);
        navigate(`/student/${id}`);
        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      toast.error("Debes enviar un email válido");
    }
  };

  return (
    <section>
      <Previous navigate={`/student/${id}`}></Previous>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5">Loading...</h4>
            ) : (
              <>
                <h4 className="mb-5 fw-bold">Editar Alumno</h4>
                <Form onSubmit={editStudent}>
                  <FormGroup className="form__group">
                    <div className="group">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        className="input"
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Teléfono Responsable</label>
                    </div>
                  </FormGroup>
                  <button className="btn btn-primary" type="submit">
                    Editar Alumno
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

export default EditStudent;
