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
    console.log(data.token)
  }

  return data;
};
// export const fecthPost = (post)=> {
//   fetch( BASE_URL, {
//     method: "POST",
//     
//     body: JSON.stringify({
//      post
//     })
//   });
// }

export const fecthPost = async (post) => {
  const token = getToken
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE0OGYyZTU2OTU2ODAwMTc4M2VmN2QiLCJ1c2VybmFtZSI6InF1ZW50aW4iLCJpYXQiOjE2MDQ3MjAxNjh9.gaLxI7aJzbISGcLcF1YPVaLu-2JgqL7t9CB-bvO3RTo',
          },
    body: JSON.stringify({
      post
    }),
  });

  const { error, data } = await response.json();

  return data;
};


//Create Fetch method GET

export const getPost = async () => {
  const token = getToken
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "GET",
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE0OGYyZTU2OTU2ODAwMTc4M2VmN2QiLCJ1c2VybmFtZSI6InF1ZW50aW4iLCJpYXQiOjE2MDQ3MjAxNjh9.gaLxI7aJzbISGcLcF1YPVaLu-2JgqL7t9CB-bvO3RTo',
          },
  });

  const { error, data } = await response.json();

console.log(data.posts)
  return data;
};