import BASE_URL from "./config";

export const getAddressesByUserId = async (userId) => {

  const token = localStorage.getItem("token");

  return fetch(
    `${BASE_URL}/addresses/user/${userId}`,
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );
};