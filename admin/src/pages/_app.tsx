import Layout from "@/components/Layout";
import AuthContextProvider, { useAuthContext } from "@/utils/context";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useIsomorphicLayoutEffect } from "src/hooks/useIsomorphicLayoutEffect";
import "../styles/globals.css";

type AppPropsType = AppProps & {
  Component: {
    defaultProps: {
      protected: boolean;
    };
  };
};

function App(props: AppPropsType) {
  const { Component } = props;

  const { isAuthenticated } = useAuthContext();

  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    if (Component.defaultProps?.protected && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router, Component.defaultProps]);

  return (
    <AuthContextProvider>
      <Layout {...props} />
    </AuthContextProvider>
  );
}

export default App;
