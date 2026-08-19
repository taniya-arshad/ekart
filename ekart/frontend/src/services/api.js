const BASE_URL = "http://localhost:8081/api";

export const loginUser = async (email, password) => {

  const response = await fetch(
    `${BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  );

  if (!response.ok) {

    const text = await response.text();

    throw new Error(
      text || "Login failed"
    );
  }

  return await response.json();
};

export const registerUser = async (userData) => {

  const response = await fetch(
    `${BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }
  );

  if (!response.ok) {

    const errorText =
      await response.text();

    throw new Error(errorText);
  }

  return await response.text();
};

export const getToken = () => {

  return localStorage.getItem(
    "token"
  );
};

export const authFetch = async (
  url,
  options = {}
) => {

  const token =
    localStorage.getItem("token");

  return fetch(url, {
    ...options,

    headers: {
      "Content-Type":
        "application/json",

      Authorization:
        `Bearer ${token}`,

      ...options.headers
    }
  });

};
export const getOrderDetailsByUserId = async (userId) => {

  const response = await authFetch(
    `${BASE_URL}/orders/details/user/${userId}`
  );

  if (!response.ok) {

    const text = await response.text();

    throw new Error(
      text || "Failed to fetch orders"
    );
  }

  return await response.json();
};
export default BASE_URL;