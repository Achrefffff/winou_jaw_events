import api from "../api";
export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData); // POST /api/users
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUser = async (id, updates) => {
  try {
    const response = await api.put(`/users/${id}`, updates); // PUT /api/users/:id
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`); // DELETE /api/users/:id
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
