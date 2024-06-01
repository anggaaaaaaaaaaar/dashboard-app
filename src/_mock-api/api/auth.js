import API, { mock } from "../api";

mock.onPost("/auth/login").reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});

const login = async (payload) => {
  return API.post("/auth/login", payload);
};

export default { login };
