import L from 'leaflet';

// Leafletのデフォルトアイコンの修正
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/**
 * カスタムマーカーアイコンを作成
 * @param {string} color - マーカーの色
 * @returns {L.Icon} Leafletアイコンオブジェクト
 */
const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

/**
 * データタイプごとのアイコンマッピング
 */
export const iconTypes = {
  '3D': createCustomIcon('blue'),
  'Photo': createCustomIcon('green'),
  'Video': createCustomIcon('red'),
  'Document': createCustomIcon('orange'),
  'Audio': createCustomIcon('violet')
};

/**
 * データタイプの配列
 */
export const dataTypes = ['3D', 'Photo', 'Video', 'Document', 'Audio'];

/**
 * データタイプに対応するアイコンを取得
 * @param {string} type - データタイプ
 * @returns {L.Icon} アイコンオブジェクト
 */
export const getIconByType = (type) => {
  return iconTypes[type] || iconTypes['3D'];
};