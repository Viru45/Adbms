import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Pagination.module.css';

const Pagination = ({ pages, page, isAdmin = false, keyword = '', category = '' }) => {
  let base_url = '';
  if (!isAdmin) {
    if (keyword) {
      base_url = `/search/${keyword}`;
    } else if (category) {
      base_url = `/category/${category}`;
    } else {
      base_url = '';
    }
  }

  return (
    pages > 1 && (
      <nav>
        <ul className={styles.pagination}>
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1} className={`${styles.pageItem} ${x + 1 === page ? styles.active : ''}`}>
              <Link to={`${base_url}/page/${x + 1}`} className={styles.pageLink}>
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;