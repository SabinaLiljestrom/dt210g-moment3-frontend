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
      <Row
        xs={1}
        md={2}
        lg={3} // 1 kort på mobil, 2 på md, 3 på lg
        className="g-4 justify-content-center"
      >
        {posts.slice(0, 3).map((post) => (
          <Col key={post._id} className="d-flex">
            {" "}
            {/* flex gör kortet lika högt */}
            <Card className="shadow-sm w-100">
              {/* Bildwrapper med fast proportion */}
              <div className="ratio ratio-16x9">
                <img
                  src={`http://localhost:3018${post.image}`}
                  className="img-fluid object-fit-cover rounded-top"
                  alt={post.title}
                />
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title className="flex-grow-0">
                  <Link
                    to={`/posts/${post._id}`}
                    className="text-decoration-none"
                  >
                    {post.title}
                  </Link>
                </Card.Title>

                <Card.Subtitle className="mb-2 text-muted flex-grow-0">
                  Av {post.author?.username ?? "okänd"} –{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </Card.Subtitle>

                <Card.Text
                  className="text-truncate flex-grow-1"
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
