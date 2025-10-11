import React from 'react';
import { useTranslation } from 'react-i18next';
import ArchiveItem from './ArchiveItem';

/**
 * アーカイブリストコンポーネント
 * @param {Array} archives - アーカイブデータ配列
 * @param {Object} selectedArchive - 選択されたアーカイブ
 * @param {Function} onSelect - 選択ハンドラ
 * @param {Function} onZoom - ズームハンドラ
 * @param {Function} onDelete - 削除ハンドラ
 */
const ArchiveList = ({ 
  archives, 
  selectedArchive, 
  onSelect, 
  onZoom, 
  onDelete 
}) => {
  const { t } = useTranslation();

  if (archives.length === 0) {
    return (
      <div className="archive-list-container">
        <h3>{t('archiveList')}</h3>
        <p className="empty-message">{t('noArchives')}</p>
      </div>
    );
  }

  return (
    <div className="archive-list-container">
      <h3>{t('archiveList')}</h3>
      <ul className="archive-list">
        {archives.map((archive) => (
          <ArchiveItem
            key={archive.id}
            archive={archive}
            isSelected={selectedArchive?.id === archive.id}
            onSelect={onSelect}
            onZoom={onZoom}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default ArchiveList;