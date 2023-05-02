import React from 'react';
import AdminMenu from './AdminMenu';
import "../styles/Back.css";

export default function Home() {
  return (
    <div>
      <AdminMenu />
      <div className="my-background"></div>
    </div>
  );
}