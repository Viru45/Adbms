import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryNav.module.css';
import { 
  FiSmartphone, FiMonitor, FiHardDrive, FiHeadphones, FiWatch, FiTablet, FiSpeaker 
} from 'react-icons/fi';

const categories = [
  { name: 'Mobiles', icon: <FiSmartphone />, path: '/category/mobiles' },
  { name: 'Televisions', icon: <FiMonitor />, path: '/category/televisions' },
  { name: 'Laptops', icon: <FiHardDrive />, path: '/category/laptops' },
  { name: 'Audio', icon: <FiHeadphones />, path: '/category/audio' },
  { name: 'Smart Watches', icon: <FiWatch />, path: '/category/watches' },
  { name: 'Tablets', icon: <FiTablet />, path: '/category/tablets' },
  { name: 'Small Appliances', icon: <FiSpeaker />, path: '/category/appliances' },
];

const CategoryNav = () => {
  return (
    <nav className={styles.categoryNav}>
      {categories.map((category) => (
        <Link to={category.path} key={category.name} className={styles.categoryItem}>
          {category.icon}
          <span>{category.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default CategoryNav;