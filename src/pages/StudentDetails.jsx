import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/student-details.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Previous from "../components/Previous/Previous";

const baseUrl = "https://elpre-backend.onrender.com/api/student";

const StudentDetails = () => {
  const [student, setStudent] = useState([]);
  const [pay, setPay] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const token = localStorage.getItem("Authorization");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    await axios.delete(`${baseUrl}/${id}`, config);
    navigate("/home");
  };

  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
  };

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
      setStudent(data);
      setLoading(false);
      setPay(data?.pay);
    });
  }, []);

  return (
    <>
      <Previous navigate="/home"></Previous>
      <Container className="mt-5 text-center">
        <Row>
          {loading ? (
            <h5>Cargando...</h5>
          ) : (
            <>
              <Col lg="8" md="8" sm="12" className="information">
                <h4 className="mb-5 fw-bold">Informacion del alumno</h4>

                <div className="column__wrapper">
                  <div className="singleinfo">
                    <h5>Nombre y Apellido:</h5>
                    <p>{student.name}</p>
                  </div>
                  <div className="singleinfo">
                    <h5>DNI:</h5>
                    <p>{student.dni}</p>
                  </div>
                  <div className="singleinfo">
                    <h5>Email:</h5>
                    <p>{student.email}</p>
                  </div>
                  <div className="singleinfo">
                    <h5>Dirección:</h5>
                    <p>{student.address}</p>
                  </div>
                  <div className="singleinfo">
                    <h5>Teléfono del Alumno:</h5>
                    <p>{student.mobile}</p>
                  </div>
                  <div className="singleinfo">
                    <h5>Teléfono Responsable:</h5>
                    <p>{student.secondary_mobile}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 my-3 mx-5">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleEdit(student._id);
                    }}
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleDelete(student._id);
                    }}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </Col>
              <Col lg="4" md="4" sm="12" className="pays">
                <h4 className="mb-3 fw-bold">Último Pago</h4>
                {pay?.length === 0 ? (
                  <p className="mt-3">No hay pagos</p>
                ) : (
                  <div className="pay__info">
                    <div className="singlepay">
                      <h5>Año: </h5> <p>{pay[pay?.length - 1]?.year}</p>
                    </div>
                    <div className="singlepay">
                      <h5>Mes:</h5> <p>{pay[pay?.length - 1]?.month}</p>
                    </div>
                    <div className="singlepay">
                      <h5>Día:</h5> <p>{pay[pay?.length - 1]?.day}</p>
                    </div>
                  </div>
                )}

                <div className="d-flex align-items-center justify-content-center gap-3 my-3">
                  <Link to={`/pays/${student._id}`}>
                    <button className="btn btn-dark">Lista de Pagos</button>
                  </Link>
                </div>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default StudentDetails;
