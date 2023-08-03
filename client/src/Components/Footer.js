import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  //Footer theo yêu cầu đề bài gồm 3 cột với các thông tin đã cho Link của các mục này là #
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footer}>
        <div className={styles.titleList}>
          CUSTOMER SERVICES
          <ul>
            <li>
              <Link to="#">Help & Contact Us</Link>
            </li>
            <li>
              <Link to="#">Returns & Refunds</Link>
            </li>
            <li>
              <Link to="#">Online Stores</Link>
            </li>
            <li>
              <Link to="#">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
        <div className={styles.titleList}>
          COMPANY
          <ul>
            <li>
              <Link to="#">What We Do</Link>
            </li>
            <li>
              <Link to="#">Available Services</Link>
            </li>
            <li>
              <Link to="#">Latest Posts</Link>
            </li>
            <li>
              <Link to="#">FAQs</Link>
            </li>
          </ul>
        </div>
        <div className={styles.titleList}>
          SOCIAL MEDIA
          <ul>
            <li>
              <Link to="#">Twitter</Link>
            </li>
            <li>
              <Link to="#">Instagram</Link>
            </li>
            <li>
              <Link to="#">Facebook</Link>
            </li>
            <li>
              <Link to="#">Pinterest</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
