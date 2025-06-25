import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import api from "../api/api";
import { Post } from "../types/blog";

/**
 * PostDetail – hämtar ett specifikt inlägg via GET /posts/:id.
 */
const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await api.get<Post>(`/posts/${id}`);
        setPost(res.data);
      } catch {
        setError("Kunde inte hämta inlägget.");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadPost();
  }, [id]);

  return (
    <Container className="py-5 d-flex flex-column align-items-center">
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && post && (
        <Card style={{ maxWidth: "40rem" }} className="shadow-sm w-100 mb-4">
          <Card.Body>
            <Card.Title className="h3 mb-3">{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Av {post.author?.username ?? "okänd"} –{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </Card.Subtitle>
            <Card.Text className="mb-4" style={{ whiteSpace: "pre-line" }}>
              {post.content}
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {/* Länk tillbaka till startsidan */}
      <div className="text-center mt-3">
        <Link to="/">Till startsidan</Link>
      </div>
    </Container>
  );
};

export default PostDetail;
