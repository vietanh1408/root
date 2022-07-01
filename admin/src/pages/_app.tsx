import Layout from "@/components/Layout";
import AuthContextProvider, { useAuthContext } from "@/utils/context";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { useIsomorphicLayoutEffect } from "src/hooks/useIsomorphicLayoutEffect";
import { store, wrapper } from "src/redux/store";
import "../styles/globals.css";

export type AppPropsType = AppProps & {
  Component: {
    defaultProps: {
      protected: boolean;
    };
  };
};

function App(props: AppPropsType) {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Layout {...props} />
      </AuthContextProvider>
    </Provider>
  );
}

export default wrapper.withRedux(App);
