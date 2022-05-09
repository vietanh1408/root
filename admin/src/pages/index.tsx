import AuthContextProvider from "src/utils/context";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <AuthContextProvider>
      <div className={styles.container}>HOME</div>
    </AuthContextProvider>
  );
};

Home.auth = true;

export default Home;
