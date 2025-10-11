import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import MapClickHandler from './MapClickHandler';
import CustomMarker from './CustomMarker';
import 'leaflet/dist/leaflet.css';
import './Map.css';

/**
 * 地図表示コンポーネント
 * @param {Array} archives - アーカイブデータ配列
 * @param {Object} tempMarker - 一時的なマーカー位置
 * @param {boolean} isAddMode - 追加モードかどうか
 * @param {Function} onMapClick - 地図クリック時のハンドラ
 * @param {Object} mapRef - 地図への参照
 */
const MapView = ({ 
  archives, 
  tempMarker, 
  isAddMode, 
  onMapClick, 
  mapRef 
}) => {
  const { t } = useTranslation();

  return (
    <div className="map-container">
      {isAddMode && (
        <div className="map-hint">
          🖱️ {t('clickMapToAdd')}
        </div>
      )}
      
      <MapContainer 
        center={[36.2048, 138.2529]} 
        zoom={6} 
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapClickHandler 
          isAddMode={isAddMode} 
          onMapClick={onMapClick} 
        />
        
        {tempMarker && (
          <Marker position={[tempMarker.lat, tempMarker.lng]}>
            <Popup>{t('newPoint')}</Popup>
          </Marker>
        )}

        {archives.map((archive) => (
          <CustomMarker 
            key={archive.id} 
            archive={archive}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;