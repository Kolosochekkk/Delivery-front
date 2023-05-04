import React from "react";
import { Link } from "react-router-dom";
import "../styles/Menu.css";

export default function AdminMenu() {
  return (
    <header className="menu">
      <nav>
        <ul>
          <li>
            <Link to="/restaurants">Рестораны</Link>
          </li>
          <li>
            <Link to="/dishes">Блюда</Link>
          </li>
          <li>
            <Link to="/promocode">Промокоды</Link>
          </li>
          <li>
            <Link to="/orders">Заказы</Link>
          </li>
          <li>
            <Link to="/diagrams">Диаграммы</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
