import React from 'react';
import styles from "./../styles/components/sidebar.module.scss";

export default function sideBar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </aside>
  );
}