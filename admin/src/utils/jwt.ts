import jwtDecode, { JwtPayload } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "src/constants/local-storage";

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
            refreshToken: localStorage.getItem(REFRESH_TOKEN),
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        }
      );

      const data = (await response.json()) as {
        success: boolean;
        accessToken: string;
      };

      console.log("accessToken: ", data.accessToken);

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
