import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: React.FC = () => {
  // Placeholder‑data tills API‑koppling byggs
  const demoPosts = [
    {
      _id: "1",
      title: "Första inlägget",
      excerpt: "Detta är en kort sammanfattning av mitt allra första inlägg…",
    },
    {
      _id: "2",
      title: "Äventyr i fjällen",
      excerpt:
        "I helgen var jag på topptur – här är några lärdomar och bilder…",
    },
  ];

  return (
    <Container className="py-5">
      {/* Hero‑sektion */}
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="display-4 fw-bold">Välkommen till Eskils Blogg</h1>
          <p className="lead text-muted">
            Tankar om livet i allmänhet som hund.
          </p>
        </Col>
      </Row>

      {/* Lista med inlägg */}
      <Row className="g-4" xs={1} md={1}>
        {demoPosts.map((post) => (
          <Col key={post._id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.excerpt}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
