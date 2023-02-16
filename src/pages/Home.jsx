import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/home.css";

import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination/Pagination";

const baseUrl = "https://elpre-backend.web.app/api/student";

const Home = ({ isLogged }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setstudentsPerPage] = useState(10);

  const handleDelete = async (id) => {
    setRemove(true);
    const token = localStorage.getItem("Authorization");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    await axios.delete(`${baseUrl}/${id}`, config);
    toast.success(`Estudiante Eliminado`);
    setRemove(false);
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirsStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = students.slice(
    indexOfFirsStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("Authorization");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios.get(baseUrl, config).then((response) => {
      const { data } = response.data;
      setStudents(data);
      setLoading(false);
    });
  }, [remove]);

  return (
    <Container>
      <Row>
        <Col lg="12" className="mt-5 mb-5">
          <div className="d-flex justify-content-end">
            <Link to="/add-student">
              <button className="btn btn-dark mb-3">Agregar Alumno</button>
            </Link>
            <Link to="/add-pay">
              <button className="btn btn-dark mb-3 ms-3">Agregar Pago</button>
            </Link>
           
          </div>

          <div className="search__box my-3">
            <input
              type="text"
              placeholder="Buscar por nombre o DNI..."
              onChange={(e) => setSearch(e.target.value)}
              className="bg-dark text-white"
            />
          </div>

          {loading ? (
            <tbody className="text-center mt-3">
              <tr>
                <td>Cargando...</td>
              </tr>
            </tbody>
          ) : students.length === 0 ? (
            <div className="table-responsive">
              <table className="table table-dark text-center table-hover table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Dni</th>
                    <th>Email</th>
                    <th>Último Pago</th>
                    <th>Detalle</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody className="text-center mt-3">
                  <tr>
                    <td>No hay alumnos registrados...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : search === "" ? (
            <>
              <div className="table-responsive">
                <table className="table table-dark text-center table-hover table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Dni</th>
                      <th>Email</th>
                      <th>Último Pago</th>
                      <th>Detalle</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {currentStudents.map((student) => (
                      <tr key={student._id}>
                        <td>{student.name}</td>
                        <td>{student.dni}</td>
                        <td>{student.email}</td>
                        {student?.pay.length === 0 ? (
                          <td>No hay pagos</td>
                        ) : (
                          <td>
                            {student?.pay[student?.pay.length - 1].day}
                            {"/"}
                            {student?.pay[student?.pay.length - 1].month}
                            {"/"}
                            {student?.pay[student?.pay.length - 1].year}
                          </td>
                        )}

                        <td>
                          <Link to={`/student/${student?._id}`}>
                            Ver Información
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              handleDelete(student._id);
                            }}
                            className="btn btn-danger"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end">
                <Pagination
                  studentsPerPage={studentsPerPage}
                  totalStudents={students.length}
                  paginate={paginate}
                />
              </div>
            </>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark text-center table-hover table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Dni</th>
                    <th>Email</th>
                    <th>Último Pago</th>
                    <th>Detalle</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {students
                    .filter((student) => {
                      return search.toLowerCase() === ""
                        ? student
                        : student.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                            student.dni
                              .toLowerCase()
                              .includes(search.toLowerCase());
                    })
                    .map((student) => (
                      <tr key={student._id}>
                        <td>{student.name}</td>
                        <td>{student.dni}</td>
                        <td>{student.email}</td>
                        {student?.pay.length === 0 ? (
                          <td>No hay pagos</td>
                        ) : (
                          <td>
                            {student?.pay[student?.pay.length - 1].day}
                            {"/"}
                            {student?.pay[student?.pay.length - 1].month}
                            {"/"}
                            {student?.pay[student?.pay.length - 1].year}
                          </td>
                        )}

                        <td>
                          <Link to={`/student/${student?._id}`}>
                            Ver Información
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              handleDelete(student._id);
                            }}
                            className="btn btn-danger"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
