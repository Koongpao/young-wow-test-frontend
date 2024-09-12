const baseURL = "http://localhost:3001";

export async function getAllPosts() {
  try {
    const response = await fetch(`${baseURL}/posts`, { method: "GET", cache: "no-cache" });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

export async function getPostById(postId: string) {
  try {
    const response = await fetch(`${baseURL}/posts/${postId}`, { method: "GET", cache: "no-cache" });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser(username: string, email: string, password: string) {
  try {
    const response = await fetch(`${baseURL}/users`, {
      method: "POST",
      body: JSON.stringify({ username: username, email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function createPost(title: string, content: string) {
  const token = await localStorage.getItem("token");
  try {
    const response = await fetch(`${baseURL}/posts`, {
      method: "POST",
      body: JSON.stringify({ title: title, content: content }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(postId: string) {
  const token = await localStorage.getItem("token");
  try {
    const response = await fetch(`${baseURL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePost(title: string, content: string, postId: string) {
  const token = await localStorage.getItem("token");
  try {
    const response = await fetch(`${baseURL}/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title: title, content: content }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

