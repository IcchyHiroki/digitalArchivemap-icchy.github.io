import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import { getIconByType } from '../../utils/mapIcons';

/**
 * アーカイブデータを表示するカスタムマーカー
 * @param {Object} archive - アーカイブデータ
 */
const CustomMarker = ({ archive }) => {
  const { t, i18n } = useTranslation();
  const icon = getIconByType(archive.dataType);

  return (
    <Marker 
      position={archive.position}
      icon={icon}
    >
      <Popup>
        <div className="popup-content">
          <h3>
            {i18n.language === 'ja' ? archive.title : archive.titleEn}
          </h3>
          <p>
            {i18n.language === 'ja' ? archive.description : archive.descriptionEn}
          </p>
          <div className="popup-meta">
            <p><strong>{t('dataType')}:</strong> {archive.dataType}</p>
            <p><strong>{t('date')}:</strong> {archive.date}</p>
            <p><strong>{t('coordinates')}:</strong></p>
            <p className="coords">
              Lat: {archive.position[0].toFixed(6)}<br/>
              Lng: {archive.position[1].toFixed(6)}
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;