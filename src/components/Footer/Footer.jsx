import React from "react";
import "./footer.css";

import { Container, Row, Col} from "reactstrap";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="12">
            <p className="footer__copyright">
              Copyright {year} developed by Juan Pablo Costa. All rights
              reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
