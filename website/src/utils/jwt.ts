import jwtDecode, { JwtPayload } from "jwt-decode";

const JWTManager = () => {
  const LOGOUT_EVENT_NAME = "jwt-logout";

  let inMemoryToken: string | null = null;

  let refreshTokenTimeoutId: number | null = null;

  let userId: string | null = null;

  const getToken = () => inMemoryToken;

  const getUserId = () => userId;

  const abortRefreshToken = () => {
    if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId);
  };

  const deleteToken = () => {
    inMemoryToken = null;
    abortRefreshToken();
    window &&
      window.localStorage.setItem(LOGOUT_EVENT_NAME, Date.now().toString());
    return true;
  };

  const getRefreshToken = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh_token`,
        {
          method: "POST",
          body: JSON.stringify({
            refreshToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MDkwYjFkNy02MGE5LTRhMDUtYWVjMi1jNzgwODhmOWVlZWMiLCJyb2xlIjowLCJpYXQiOjE2NTA3Nzg4NDksImV4cCI6MTY1MzM3MDg0OX0.a9hat1bY5enUkh-CzbaK4Brl3X9EaRWP91m_LU-NATo",
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4MDkwYjFkNy02MGE5LTRhMDUtYWVjMi1jNzgwODhmOWVlZWMiLCJyb2xlIjowLCJpYXQiOjE2NTA3Nzg4NDksImV4cCI6MTY1MDc3OTE0OX0.TgLmq7u6xIrDlJOUVbli3gc7OF9mSZy05J0i5PMeepQ`,
          },
        }
      );
      const data = (await response.json()) as {
        success: boolean;
        accessToken: string;
      };

      setToken(data.accessToken);
      return true;
    } catch (error) {
      console.log("UNAUTHENTICATED", error);
      deleteToken();
      return false;
    }
  };

  const setRefreshTokenTimeout = (delay: number) => {
    // 5s before token expires
    refreshTokenTimeoutId = window.setTimeout(
      getRefreshToken,
      delay * 1000 - 5000
    );
  };

  const setToken = (accessToken: string) => {
    inMemoryToken = accessToken;

    const decoded = jwtDecode<JwtPayload & { userId: string }>(accessToken);

    userId = decoded.userId;

    setRefreshTokenTimeout((decoded.exp as number) - (decoded.iat as number));
    return true;
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
      if (event.key === LOGOUT_EVENT_NAME) inMemoryToken = null;
    });
  }

  return { getToken, setToken, getRefreshToken, deleteToken, getUserId };
};

export default JWTManager();
