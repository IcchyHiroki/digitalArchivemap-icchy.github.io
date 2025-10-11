import React from 'react';
import { useTranslation } from 'react-i18next';
import ArchiveForm from './ArchiveForm';
import ArchiveList from './ArchiveList';
import './Sidebar.css';

/**
 * サイドバーコンポーネント
 * ツールバー、フォーム、アーカイブリストを統合
 */
const Sidebar = ({
  archives,
  selectedArchive,
  isAddMode,
  showForm,
  formData,
  tempMarker,
  onToggleAddMode,
  onFormChange,
  onFormSubmit,
  onFormCancel,
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

      {showForm && tempMarker && (
        <ArchiveForm
          formData={formData}
          tempMarker={tempMarker}
          onChange={onFormChange}
          onSubmit={onFormSubmit}
          onCancel={onFormCancel}
        />
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