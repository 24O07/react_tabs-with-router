import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { HomePage } from './components/HomePage.tsx';
import { TabsPage } from './components/TabsPage.tsx';
import { NotFoundPage } from './components/NotFoundPage.tsx';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

export const App: React.FC = () => {
  const location = useLocation();

  const isHomeActive = location.pathname === '/';
  const isTabsActive = location.pathname.startsWith('/tabs');

  return (
    <>
      {/* Навігація сайту */}
      <nav
        className="navbar is-light is-fixed-top is-mobile has-shadow"
        data-cy="Nav"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link
              to="/"
              className={`navbar-item ${isHomeActive ? 'is-active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/tabs"
              className={`navbar-item ${isTabsActive ? 'is-active' : ''}`}
            >
              Tabs
            </Link>
          </div>
        </div>
      </nav>

      {/* Головний контейнер для сторінок */}
      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            {/* Вкладені маршрути для сторінки вкладок */}
            <Route path="tabs">
              <Route index element={<TabsPage />} />
              <Route path=":tabId" element={<TabsPage />} />
            </Route>

            {/* Сторінка не знайдена */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
