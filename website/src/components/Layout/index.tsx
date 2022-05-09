import { useAuthContext } from "@/utils/context";
import { AppProps } from "next/app";
import React, { useEffect, useState } from "react";

const Layout: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { checkAuth, isAuthenticated } = useAuthContext();

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
      setLoading(false);
    };

    authenticate();
  }, [checkAuth]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <React.Fragment>
      {isAuthenticated && <div>Header</div>}
      <Component {...pageProps} />
    </React.Fragment>
  );
};

export default Layout;
