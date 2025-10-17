import React from 'react';
import { useTranslation } from 'react-i18next';
import ArchiveList from './ArchiveList';
import './Sidebar.css';

/**
 * サイドバーコンポーネント（Web追加機能対応版）
 * ツールバー、アーカイブリストを統合
 */
const Sidebar = ({
  archives,
  selectedArchive,
  isAddMode,
  onToggleAddMode,
  onSelectArchive,
  onZoomToArchive,
  onDeleteArchive
}) => {
  const { t } = useTranslation();

  return (
    <div className="sidebar">
      <div className="toolbar">
        <button 
          className={`tool-button ${isAddMode ? 'active' : ''}`}
          onClick={onToggleAddMode}
          title={t('addPointMode')}
        >
          📍 {t('addPoint')}
        </button>
        <div className="archive-count">
          {t('totalArchives')}: {archives.length}
        </div>
      </div>

      {isAddMode && (
        <div className="add-mode-hint">
          🖱️ {t('clickMapToAdd')}
        </div>
      )}

      <ArchiveList
        archives={archives}
        selectedArchive={selectedArchive}
        onSelect={onSelectArchive}
        onZoom={onZoomToArchive}
        onDelete={onDeleteArchive}
      />
    </div>
  );
};

export default Sidebar;