import axios from "../api/axios";

const getMeUser = async () => {
  try {
    const res = await axios.get(`/api/users/me`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

const login = async (email, password) => {
  try {
    const res = await axios.post(
      "/api/users/login",
      JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

const refreshToken = async () => {};

const logout = async () => {
  try {
    const res = await axios.post(
      "/api/users/logout?allSessions=true",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

const auth = {
  getMeUser,
  login,
  logout,
};

export default auth;
