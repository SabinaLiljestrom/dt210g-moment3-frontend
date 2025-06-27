// src/pages/PostsPage.tsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api/api";
import { Post } from "../types/blog";

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(() => setError("Kunde inte hämta inlägg."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="py-5">
      <h1 className="display-5 mb-4 text-center">Alla inlägg</h1>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger">{error}</Alert>}

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

export default PostsPage;
