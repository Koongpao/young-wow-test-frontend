export function decodeToken(token: string) {
  try {
    const tokenParts = token.split(".");

    if (tokenParts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const decodedPayload = atob(tokenParts[1]);

    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

export function getUserIdFromToken(token: string) {
  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken && decodedToken.user_id) {
      return decodedToken.user_id;
    }
  }

  return null;
}

export function getUserNameFromToken(token: string) {
  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken && decodedToken.username) {
      return decodedToken.username;
    }
  }

  return null;
}
