import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * アーカイブリストの個別アイテム（JSON形式対応）
 * @param {Object} archive - アーカイブデータ
 * @param {boolean} isSelected - 選択されているか
 * @param {Function} onSelect - 選択ハンドラ
 * @param {Function} onZoom - ズームハンドラ
 * @param {Function} onDelete - 削除ハンドラ（将来の機能用）
 */
const ArchiveItem = ({ 
  archive, 
  isSelected, 
  onSelect, 
  onZoom, 
  onDelete 
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // JSON形式のデータから名前と説明を取得
  const name = archive.name?.[currentLang] || archive.name?.ja || '';
  const description = archive.description?.[currentLang] || archive.description?.ja || '';
  const address = archive.address?.[currentLang] || archive.address?.ja || '';

  return (
    <li 
      className={`archive-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(archive)}
    >
      <div className="archive-header">
        <span className={`data-type-badge ${archive.dataType.toLowerCase()}`}>
          {archive.dataType}
        </span>
        <strong>{name}</strong>
      </div>
      
      <p className="archive-description">{description}</p>
      
      {address && (
        <p className="archive-address">
          <span className="icon">📍</span>
          {address}
        </p>
      )}
      
      <div className="archive-meta">
        {archive.lastUpdated && (
          <span className="archive-date">📅 {archive.lastUpdated}</span>
        )}
        <span className="archive-coords">
          🗺️ {archive.position[0].toFixed(4)}, {archive.position[1].toFixed(4)}
        </span>
        {archive.dataLinks && archive.dataLinks.length > 0 && (
          <span className="archive-links">
            🔗 {archive.dataLinks.length} {t('dataLinks')}
          </span>
        )}
      </div>
      
      <div className="archive-actions">
        <button 
          className="btn-small"
          onClick={(e) => {
            e.stopPropagation();
            onZoom(archive.position);
          }}
          aria-label={t('zoomTo')}
        >
          {t('zoomTo')}
        </button>
      </div>
    </li>
  );
};

export default ArchiveItem;