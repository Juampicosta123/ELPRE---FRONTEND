import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/student-details.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";


const baseUrl = "https://elpre-backend.web.app/api/pay";

const PayDetails = () => {
  const [pay, setPay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paysPerPage, setPaysPerPage] = useState(12);

  const { id } = useParams();

  const navigate = useNavigate();

  const indexOfLastPay = currentPage * paysPerPage;
  const indexOfFirstPay = indexOfLastPay - paysPerPage;

  const currentPays = pay?.slice(indexOfFirstPay, indexOfLastPay);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (payid) => {
    navigate(`/edit-pay/${id}`, { state: { payid } });
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
      const { data } = response;
      setLoading(false);
      setPay(data?.pay);
    });
  }, []);

  return (
    <>
      <Container className="mt-5 text-center">
        <Row>
          {loading ? (
            <h5>Cargando...</h5>
          ) : (
            <>
              <Col lg="12" className="pay">
                <h4 className="fw-bold mb-3">Pagos</h4>
                <div className="search__box mb-3">
                  <input
                    type="text"
                    placeholder="Buscar por año, mes o día..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-dark"
                  />
                </div>

                {pay?.length === 0 ? (
                  <p className="mt-3">No hay pagos</p>
                ) : search === "" ? (
                  <>
                    <table className="table table-dark bordered table-striped">
                      <thead>
                        <tr>
                          <th>Año</th>
                          <th>Mes</th>
                          <th>Día</th>
                          <th>Editar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPays?.map((pay) => (
                          <tr key={pay._id}>
                            <td>{pay.year}</td>
                            <td>{pay.month}</td>
                            <td>{pay.day}</td>
                            <td>
                              <button
                                onClick={() => {
                                  handleEdit(pay._id);
                                }}
                                className="btn btn-primary"
                              >
                                <i className="ri-edit-line"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-end">
                      <Pagination
                        studentsPerPage={paysPerPage}
                        totalStudents={pay?.length}
                        paginate={paginate}
                      />
                    </div>
                  </>
                ) : (
                  <table className="table table-dark bordered table-striped">
                    <thead>
                      <tr>
                        <th>Año</th>
                        <th>Mes</th>
                        <th>Día</th>
                        <th>Editar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pay
                        ?.filter((pay) => {
                          return search.toLowerCase() === ""
                            ? pay
                            : pay.year
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                                pay.month
                                  .toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                pay.day
                                  .toLowerCase()
                                  .includes(search.toLowerCase());
                        })
                        .map((pay) => (
                          <tr key={pay._id}>
                            <td>{pay.year}</td>
                            <td>{pay.month}</td>
                            <td>{pay.day}</td>
                            <td>
                              <button
                                onClick={() => {
                                  handleEdit(pay._id);
                                }}
                                className="btn btn-primary"
                              >
                                <i className="ri-edit-line"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default PayDetails;
