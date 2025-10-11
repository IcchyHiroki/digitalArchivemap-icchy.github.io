import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * アーカイブリストの個別アイテム
 * @param {Object} archive - アーカイブデータ
 * @param {boolean} isSelected - 選択されているか
 * @param {Function} onSelect - 選択ハンドラ
 * @param {Function} onZoom - ズームハンドラ
 * @param {Function} onDelete - 削除ハンドラ
 */
const ArchiveItem = ({ 
  archive, 
  isSelected, 
  onSelect, 
  onZoom, 
  onDelete 
}) => {
  const { t, i18n } = useTranslation();

  return (
    <li 
      className={`archive-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(archive)}
    >
      <div className="archive-header">
        <span className={`data-type-badge ${archive.dataType.toLowerCase()}`}>
          {archive.dataType}
        </span>
        <strong>
          {i18n.language === 'ja' ? archive.title : archive.titleEn}
        </strong>
      </div>
      
      <p className="archive-description">
        {i18n.language === 'ja' ? archive.description : archive.descriptionEn}
      </p>
      
      <div className="archive-meta">
        <span className="archive-date">📅 {archive.date}</span>
        <span className="archive-coords">
          📍 {archive.position[0].toFixed(4)}, {archive.position[1].toFixed(4)}
        </span>
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
        <button 
          className="btn-small btn-danger"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm(t('confirmDelete'))) {
              onDelete(archive.id);
            }
          }}
          aria-label={t('delete')}
        >
          {t('delete')}
        </button>
      </div>
    </li>
  );
};

export default ArchiveItem;