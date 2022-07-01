import { Provider } from "react-redux";
import { store } from "src/redux/store";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <Provider store={store}>
      <div className={styles.container}>HOME</div>
    </Provider>
  );
};

Home.defaultProps = {
  protected: false,
};

export default Home;
