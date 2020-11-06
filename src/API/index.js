const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2007-LSU-RM-WEB-PT";

export const getToken = () => {
  return localStorage.getItem("auth-token");
};

export const clearToken = () => {
  localStorage.removeItem("auth-token");
};

const setToken = (token) => {
  localStorage.setItem("auth-token", token);
};

export async function getPosts(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export const fetchPosts = getPosts(`${BASE_URL}/posts`);

console.log(fetchPosts);

{
  /*export const makeUserPosts = async (postData) => {
  const response = await fetch(`${BASE_URL}/post`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  });
};*/
}

export const registerUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  });

  const { error, data } = await response.json();

  if (error) {
    throw Error(error.message);
  }

  if (data && data.token) {
    setToken(data.token);
  }

  return data;
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  });

  const { error, data } = await response.json();

  if (error) {
    throw Error(error.message);
  }

  if (data && data.token) {
    setToken(data.token);
  }

  return data;
};
