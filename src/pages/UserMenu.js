import React from "react";
import { Link } from "react-router-dom";
import "../styles/Menu.css";

export default function UserMenu() {
  return (
    <header className="menu">
      <nav>
        <ul>
          <li>
            <Link to="/userHome">Рестораны</Link>
          </li>
          <li>
            <Link to="/cart">Корзина</Link>
          </li>
          <li>
            <Link to="/cabinet">Личный кабинет</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
