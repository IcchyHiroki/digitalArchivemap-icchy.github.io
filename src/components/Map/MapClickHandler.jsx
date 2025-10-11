import { useMapEvents } from 'react-leaflet';

/**
 * 地図クリックイベントをハンドリングするコンポーネント
 * @param {boolean} isAddMode - 追加モードかどうか
 * @param {Function} onMapClick - クリック時のコールバック
 */
const MapClickHandler = ({ isAddMode, onMapClick }) => {
  useMapEvents({
    click: (e) => {
      if (isAddMode) {
        onMapClick(e.latlng);
      }
    },
  });
  
  return null;
};

export default MapClickHandler;