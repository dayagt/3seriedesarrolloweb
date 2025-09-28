import { useState } from "react";
import { createPost } from "../api/posts";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    try {
      setLoading(true);
      await createPost({ title, body, userId: 1 });
      navigate("/");
    } catch (err) {
      setError("Error al crear post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Nuevo Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Contenido"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Guardando..." : "Crear Post"}
        </button>
      </form>
    </div>
  );
}

export default NewPostPage;