import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = await login(username, password); // API-login
      authLogin(token); // Uppdatera context
    } catch {
      setError("Fel användarnamn eller lösenord.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="py-5 bg-light min-vh-100 d-flex align-items-center"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h3 className="mb-3 text-center">Logga in</h3>

              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Användarnamn</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Logga in"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <div className="text-center mt-3">
          <Link to="/">Till startsidan</Link>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
