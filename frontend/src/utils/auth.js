export const getCurrentUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedUser = localStorage.getItem("visioncareCurrentUser") || sessionStorage.getItem("visioncareCurrentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getCurrentUser());
