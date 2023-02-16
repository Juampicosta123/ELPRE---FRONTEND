import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import "../styles/add-student.css";
import axios from "axios";


const baseUrl = "https://elpre-backend.onrender.com/api/pay";
const getUrl = "https://elpre-backend.onrender.com/api/getpay";

const EditStudent = (payid) => {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [original, setOriginal] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("Authorization");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${getUrl}/${id}?payid=${location.state.payid}`, config)
      .then((response) => {
        const { data } = response;
        setOriginal(data?.pay[0]);
        setLoading(false);
      });
  }, []);

  const editPay = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const token = localStorage.getItem("Authorization");
      const pay = {
        year: year !== "" ? year : original.year,
        month: month !== "" ? month : original.month,
        day: day !== "" ? day : original.day,
        payid: location.state.payid,
      };
      const config = {
        headers: {
          Authorization: token,
        },
      };

      await axios.put(`${baseUrl}/${id}`, pay, config).then((response) => {
        const { data } = response.data;
        setOriginal(data);
        navigate(`/student/${id}`);
        setLoading(false);
      });
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
                <h4 className="mb-5 fw-bold">Editar Pago</h4>
                <Form onSubmit={editPay}>
                  <FormGroup className="form__group">
                    <div className="group">
                      <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
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
                        className="input"
                      />
                      <span className="highlight"></span>
                      <span className="bar"></span>
                      <label>Día</label>
                    </div>
                  </FormGroup>

                  <button className="btn btn-primary" type="submit">
                    Editar Pago
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
