const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al cargar los posts");
  return await res.json();
};

export const createPost = async (post) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Error al crear el post");
  return await res.json();
};

export const updatePost = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar el post");
  return await res.json();
};

export const deletePost = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar el post");
  return true;
};
