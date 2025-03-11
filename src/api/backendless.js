const APP_ID = "78C4C319-125F-4394-8C37-49107C7D8A98";
const API_KEY = "FAABB6D8-F052-4B82-B98E-15253B1DDBB3";
const BASE_URL = `https://api.backendless.com/${APP_ID}/${API_KEY}/data/Products`;

export const getAllProducts = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const addProduct = async (productData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  return response.json();
};

export const updateProduct = async (productId, updatedData) => {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

export const getProductById = async (productId) => {
  const response = await fetch(`${BASE_URL}/${productId}`);
  return response.json();
};
