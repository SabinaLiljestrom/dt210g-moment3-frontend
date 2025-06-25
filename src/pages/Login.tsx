import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <Container
      fluid
      className="py-5 bg-light min-vh-100 d-flex align-items-center"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body className="text-center p-4">
              <Card.Title className="h3 mb-3">Logga in</Card.Title>
              <Card.Text className="text-muted mb-4">
                Här kommer inloggningsformuläret att visas.
              </Card.Text>
              <Button variant="primary" as="a" href="/">
                Till startsidan
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
