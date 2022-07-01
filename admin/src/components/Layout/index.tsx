import { useAuthContext } from "@/utils/context";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import Login from "src/pages/login";
import { AppPropsType } from "src/pages/_app";
import { fetchRefreshToken } from "src/redux/actions/auth";
import { wrapper } from "src/redux/store";

const Layout: React.FC<AppPropsType> = ({
  Component,
  pageProps,
}: AppPropsType) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { checkAuth, isAuthenticated } = useAuthContext();

  const router = useRouter();

  const authenticate = async () => {
    await checkAuth();
    setLoading(false);
  };

  useLayoutEffect(() => {
    console.log("useLayoutEffect isAuthenticated: ", isAuthenticated);

    authenticate();
  }, [isAuthenticated, router, Component.defaultProps]);

  useEffect(() => {
    console.log("useEffect isAuthenticated: ", isAuthenticated);
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <React.Fragment>
      {isAuthenticated && <div>Header</div>}
      {!(Component.defaultProps?.protected && !isAuthenticated) && (
        <Component {...pageProps} />
      )}
    </React.Fragment>
  );
};

// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     await store.dispatch(
//       await fetchRefreshToken()
//     )
//   }
// )

export default Layout;
