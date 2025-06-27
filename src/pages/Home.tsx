import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api/api";
import { Post } from "../types/blog";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch {
        setError("Kunde inte hämta inlägg. Försök igen senare.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Container className="py-5">
      {/* Hero */}
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="display-4 fw-bold">Välkommen till Eskils Blogg</h1>
          <p className="lead text-muted">
            Tankar om livet i allmänhet som hund.
          </p>
        </Col>
      </Row>

      {/* State‑handling */}
      {loading && (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" />
        </div>
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      {!loading && !error && posts.length === 0 && (
        <p className="text-center text-muted">Inga inlägg ännu.</p>
      )}

      {/* Lista med inlägg */}
      <Row className="g-4" xs={1} md={1}>
        {posts.map((post) => (
          <Col key={post._id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>
                  <Link
                    to={`/posts/${post._id}`}
                    className="text-decoration-none"
                  >
                    {post.title}
                  </Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Av {post.author?.username ?? "okänd"} –{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text
                  className="text-truncate"
                  style={{ maxHeight: "4.5rem" }}
                >
                  {post.content}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
