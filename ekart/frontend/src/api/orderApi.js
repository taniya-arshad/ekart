import BASE_URL from "./config";

export const placeOrder = async (orderData) => {
  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
};