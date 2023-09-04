import styles from "./ServerError.module.css";
const ServerError = () => {
  return (
    <div className={styles.errorContainer}>
      <h2>Something went wrong from the server side!</h2>
      <p>We will fix it soon, please refresh and try it again later!</p>
    </div>
  );
};
export default ServerError;
