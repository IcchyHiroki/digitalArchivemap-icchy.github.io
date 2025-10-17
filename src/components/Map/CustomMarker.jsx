import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import { getIconByType } from '../../utils/mapIcons';

/**
 * アーカイブデータを表示するカスタムマーカー（リンク対応）
 * @param {Object} archive - アーカイブデータ
 * @param {Function} onMarkerClick - マーカークリック時のハンドラ
 */
const CustomMarker = ({ archive, onMarkerClick }) => {
  const { t, i18n } = useTranslation();
  const icon = getIconByType(archive.dataType);
  const currentLang = i18n.language;

  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // マーカークリック時にサイドバーのアイテムを選択
  const handleMarkerClick = () => {
    if (onMarkerClick) {
      onMarkerClick(archive);
    }
  };

  return (
    <Marker 
      position={archive.position}
      icon={icon}
      eventHandlers={{
        click: handleMarkerClick
      }}
    >
      <Popup maxWidth={350} minWidth={250}>
        <div className="popup-content">
          <h3>
            {archive.name[currentLang] || archive.name.ja}
          </h3>
          
          <div className="popup-section">
            <p className="popup-description">
              {archive.description[currentLang] || archive.description.ja}
            </p>
          </div>

          <div className="popup-meta">
            <div className="meta-item">
              <strong>📍 {t('address')}:</strong>
              <p>{archive.address[currentLang] || archive.address.ja}</p>
            </div>

            <div className="meta-item">
              <strong>{t('dataType')}:</strong>
              <span className={`data-type-badge ${archive.dataType.toLowerCase()}`}>
                {archive.dataType}
              </span>
            </div>

            <div className="meta-item">
              <strong>{t('coordinates')}:</strong>
              <p className="coords">
                Lat: {archive.position[0].toFixed(6)}<br/>
                Lng: {archive.position[1].toFixed(6)}
              </p>
            </div>

            <div className="meta-item">
              <strong>{t('lastUpdated')}:</strong>
              <p>{archive.lastUpdated}</p>
            </div>
          </div>

          {archive.dataLinks && archive.dataLinks.length > 0 && (
            <div className="popup-links">
              <strong>{t('dataLinks')}:</strong>
              <div className="links-container">
                {archive.dataLinks.map((link, index) => (
                  <button
                    key={index}
                    className="link-button"
                    onClick={() => handleLinkClick(link.url)}
                    title={link.description[currentLang] || link.description.ja}
                  >
                    <span className="link-icon">
                      {link.type === '3D Model' && '🎨'}
                      {link.type === 'Photo' && '📷'}
                      {link.type === 'Video' && '🎬'}
                      {link.type === 'Document' && '📄'}
                      {link.type === 'Audio' && '🎵'}
                    </span>
                    <span className="link-text">
                      {link.description[currentLang] || link.description.ja}
                    </span>
                    <span className="external-icon">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;