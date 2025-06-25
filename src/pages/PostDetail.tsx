import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const PostDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card style={{ maxWidth: "32rem" }} className="shadow-sm w-100">
        <Card.Body>
          <Card.Title className="h3 mb-3">Inläggsdetaljer</Card.Title>
          <Card.Text className="mb-4">
            Här kommer detaljer för inlägg <strong>{id}</strong> att laddas och
            visas.
          </Card.Text>
          <Button as="a" href="/" variant="primary">
            Till startsidan
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostDetail;
