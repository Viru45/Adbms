import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Pagination.module.css';

const Pagination = ({ pages, page, isAdmin = false, keyword = '', category = '' }) => {
  let baseUrl = '';

  if (isAdmin) {
    baseUrl = '/admin/products';
  } else if (keyword) {
    baseUrl = `/search/${keyword}`;
  } else if (category) {
    baseUrl = `/category/${category}`;
  }

  return (
    pages > 1 && (
      <nav>
        <ul className={styles.pagination}>
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1} className={`${styles.pageItem} ${x + 1 === page ? styles.active : ''}`}>
              <Link to={baseUrl ? `${baseUrl}/page/${x + 1}` : `/page/${x + 1}`} className={styles.pageLink}>
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