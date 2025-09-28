import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const postsPorPagina = 10;
  const navigate = useNavigate();

  // Diccionario de traducciones
  const traducciones = {
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit":
      "hacer frente a la providencia excepto opción de responsabilidad",
    "qui est esse": "¿quién es este?",
    "ea molestias quis exercitationem repellat qui ipsa sit aut":
      "ella molesta a quien repele el ejercicio",
    "eum et est occaecati": "él y es dañino",
    "nesciunt quas odio": "desconocen qué odian",
    "dolorem eum magni eos aperiam quia": "dolor grande revelado por él",
    "magnam facilis autem": "gran facilidad sin embargo",
    "dolorem dolore est ipsam": "el dolor es propio",
    "nesciunt iure omnis dolorem tempora et accusantium":
      "desconocen el derecho, todo dolor temporal y acusación",
    "optio molestias est ut sit": "la opción es que haya molestias",
  };

  const traducirTitulo = (titulo) => {
    return traducciones[titulo] || titulo;
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError("Error al cargar los posts.");
      } finally {
        setLoading(false);
      }
    };
    obtenerDatos();
  }, []);

  const postsFiltrados = posts.filter(post =>
    traducirTitulo(post.title).toLowerCase().includes(busqueda.toLowerCase())
  );

  const indiceUltimo = paginaActual * postsPorPagina;
  const postsActuales = postsFiltrados.slice(indiceUltimo - postsPorPagina, indiceUltimo);
  const totalPaginas = Math.ceil(postsFiltrados.length / postsPorPagina);

  if (loading) return <p className="p-4">Cargando publicaciones...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="border px-2 py-1 rounded w-1/2"
          placeholder="Buscar por título"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button
          onClick={() => navigate("/nuevo")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Añadir publicación
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Lista de Publicaciones</h1>

      <table className="w-full table-auto border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border border-gray-300">Identificación</th>
            <th className="text-left px-4 py-2 border border-gray-300">Título</th>
          </tr>
        </thead>
        <tbody>
          {postsActuales.map((post) => (
            <tr
              key={post.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-2 border border-gray-300">{post.id}</td>
              <td className="px-4 py-2 border border-gray-300">{traducirTitulo(post.title)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPaginas }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              paginaActual === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setPaginaActual(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
