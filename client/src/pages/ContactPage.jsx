import React from 'react';
import styles from './ContactPage.module.css';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const ContactPage = () => {
  return (
    <div className={styles.contactContainer}>
      <h1>Contact Us</h1>
      <p>Have questions about our products, an order, or anything else? We're here to help!</p>
      <div className={styles.contactDetails}>
        <div className={styles.detailItem}>
          <FiMail />
          <span>test1@example.com</span>
        </div>
        <div className={styles.detailItem}>
          <FiPhone />
          <span>+91 1234 5678 90</span>
        </div>
        <div className={styles.detailItem}>
          <FiMapPin />
          <span>123 Tech Lane, Pune, India</span>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;