import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import { fetchPosts, createPost, updatePost, deletePost } from "../api/api";
import { Post } from "../types/blog";
import "bootstrap/dist/css/bootstrap.min.css";

/***************************************************
 * Admin – full CRUD‑vy (skyddad route)
 * 1. Visar tabell med alla inlägg (inkl. miniatyr om bild finns)
 * 2. Skapa, redigera, radera via Modal‑formulär (multipart)
 ***************************************************/
const Admin: React.FC = () => {
  /* ---------- state ---------- */
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [current, setCurrent] = useState<Post | null>(null);

  /* ---------- load list ---------- */
  const loadPosts = () => {
    setLoading(true);
    fetchPosts()
      .then(setPosts)
      .catch(() => setError("Kunde inte hämta inlägg"))
      .finally(() => setLoading(false));
  };

  useEffect(loadPosts, []);

  /* ---------- delete ---------- */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Är du säker på att du vill radera inlägget?")) return;
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  /* ---------- open modal ---------- */
  const openModal = (post?: Post) => {
    setCurrent(post ?? null);
    setShowEdit(true);
  };

  /* ---------- save (create or update) ---------- */
  const handleSave = async (formData: FormData) => {
    if (current) {
      const updated = await updatePost(current._id, formData);
      setPosts((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
    } else {
      const created = await createPost(formData);
      setPosts((prev) => [created, ...prev]);
    }
    setShowEdit(false);
  };

  return (
    <Container className="py-5">
      <h1 className="display-5 mb-4 text-center">Admin – hantera inlägg</h1>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          <div className="d-flex justify-content-end mb-2">
            <Button onClick={() => openModal()} variant="success">
              + Nytt inlägg
            </Button>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="d-none d-sm-table-cell">Bild</th>
                <th>Titel</th>
                <th>Författare</th>
                <th>Skapad</th>
                <th style={{ width: 110 }}>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td className="d-none d-sm-table-cell" style={{ width: 80 }}>
                    {post.image && (
                      <img
                        src={`http://localhost:3018${post.image}`}
                        width={60}
                        className="rounded"
                        alt=""
                      />
                    )}
                  </td>
                  <td className="text-truncate" style={{ maxWidth: 110 }}>
                    {post.title}
                  </td>
                  <td>{post.author?.username ?? "okänd"}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-1 p-1"
                      onClick={() => openModal(post)}
                      aria-label="Redigera"
                    >
                      <i className="bi bi-pencil" />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="p-1"
                      onClick={() => handleDelete(post._id)}
                      aria-label="Radera"
                    >
                      <i className="bi bi-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {/* Modal för nytt / redigera */}
      <EditModal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        onSave={handleSave}
        post={current}
      />
    </Container>
  );
};

/***************************************************
 * EditModal – återanvänds för både skapa & redigera
 ***************************************************/
interface EditModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (formData: FormData) => void;
  post: Post | null;
}

const EditModal: React.FC<EditModalProps> = ({
  show,
  onHide,
  onSave,
  post,
}) => {
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // reset när modalen öppnas för ett nytt post-objekt
  useEffect(() => {
    setTitle(post?.title ?? "");
    setContent(post?.content ?? "");
    setImageFile(null);
  }, [post]);

  const handleSubmit = () => {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("content", content);
    if (imageFile) fd.append("image", imageFile);
    onSave(fd);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{post ? "Redigera inlägg" : "Nytt inlägg"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Titel</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Innehåll</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Bild</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setImageFile(target.files?.[0] || null);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Avbryt
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Spara
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Admin;
