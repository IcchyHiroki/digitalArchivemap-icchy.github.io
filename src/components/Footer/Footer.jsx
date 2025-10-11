import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

/**
 * フッターコンポーネント
 * 著作権情報と問い合わせ先を表示
 */
const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>{t('footer.about')}</h4>
          <p>{t('footer.description')}</p>
        </div>

        <div className="footer-section">
          <h4>{t('contact')}</h4>
          <ul className="contact-list">
            <li>
              <span className="icon">📧</span>
              <a href="mailto:icchyWorks@gmail.com">
                icchyWorks@gmail.com
              </a>
            </li>
            <li>
              <span className="icon">🌐</span>
              <a href="https://github.com/IcchyHiroki" target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
            </li>
            <li>
              <span className="icon">📝</span>
              <a href="icchyWorks@gmail.com" target="_blank" rel="noopener noreferrer">
                {t('documentation')}
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t('footer.resources')}</h4>
          <ul className="resource-list">
            <li>
              <a href="#user-guide">{t('footer.userGuide')}</a>
            </li>
            <li>
              <a href="#faq">{t('footer.faq')}</a>
            </li>
            <li>
              <a href="#privacy">{t('footer.privacy')}</a>
            </li>
            <li>
              <a href="#terms">{t('footer.terms')}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} {t('いっちー / icchy')}</p>
        <p className="version">v1.0.0</p>
      </div>
    </footer>
  );
};

export default Footer;