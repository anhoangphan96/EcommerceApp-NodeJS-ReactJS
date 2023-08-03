import styles from "./SubscribeForm.module.css";
const SubscribeFrom = () => {
  //JSX xây dựng các thông tin nổi bật và 1 input để kêu gọi người dùng subscribe
  return (
    <div className={styles.container}>
      <div className={styles.offers}>
        <div className={styles.offer}>
          <h2>FREE SHIPPING</h2>
          <h3>Free shipping worldwide</h3>
        </div>
        <div className={styles.offer}>
          <h2>24 X 7 SERVICE</h2>
          <h3>Free shipping worldwide</h3>
        </div>
        <div className={styles.offer}>
          <h2>FESTIVAL OFFER</h2>
          <h3>Free shipping worldwide</h3>
        </div>
      </div>
      <div className={styles.formsection}>
        <div className={styles.quote}>
          <h2>LET'S BE FRIENDS!</h2>
          <h3>Nisi nisi tempor consequat laboris nisi</h3>
        </div>
        <form>
          <input placeholder="Enter your email address"></input>
          <button>Subscribe</button>
        </form>
      </div>
    </div>
  );
};
export default SubscribeFrom;
