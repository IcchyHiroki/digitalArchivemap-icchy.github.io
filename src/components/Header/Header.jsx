import React from 'react';
import { useTranslation } from 'react-i18next';
import './Header.css';

/**
 * ヘッダーコンポーネント
 * アプリケーションのタイトルと言語切り替えを表示
 */
const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header">
      <h1>{t('title')}</h1>
      <div className="header-controls">
        <div className="language-switcher">
          <button 
            onClick={() => changeLanguage('ja')}
            className={i18n.language === 'ja' ? 'active' : ''}
            aria-label="日本語に切り替え"
          >
            日本語
          </button>
          <button 
            onClick={() => changeLanguage('en')}
            className={i18n.language === 'en' ? 'active' : ''}
            aria-label="Switch to English"
          >
            English
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;