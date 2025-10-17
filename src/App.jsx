import React, { useState, useRef } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MapView from './components/Map/MapView';
import Footer from './components/Footer/Footer';
import AddArchiveModal from './components/AddArchive/AddArchiveModal';
import { useJsonArchives } from './hooks/useJsonArchives';
import { useTranslation } from 'react-i18next';
import './App.css';

/**
 * メインアプリケーションコンポーネント
 * JSONファイルからアーカイブデータを読み込み + Web UIから追加
 */
function App() {
  const { t } = useTranslation();
  const mapRef = useRef(null);
  
  // JSONからアーカイブデータを読み込み
  const {
    archives,
    selectedArchive,
    loading,
    error,
    selectArchive
  } = useJsonArchives();

  // Web追加機能の状態管理
  const [isAddMode, setIsAddMode] = useState(false);
  const [tempMarker, setTempMarker] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [webArchives, setWebArchives] = useState([]);

  /**
   * 地図クリックハンドラ
   */
  const handleMapClick = (latlng) => {
    if (isAddMode) {
      setTempMarker(latlng);
      setShowModal(true);
      setIsAddMode(false);
    }
  };

  /**
   * マーカークリックハンドラ（地図からサイドバーへ）
   */
  const handleMarkerClick = (archive) => {
    selectArchive(archive);
  };

  /**
   * モーダルからアーカイブを追加
   */
  const handleAddArchive = (archive) => {
    // Web追加のアーカイブをローカルステートに保存
    setWebArchives(prev => [...prev, archive]);
    setShowModal(false);
    setTempMarker(null);
    
    // JSONファイルとしてダウンロード
    downloadArchiveAsJson(archive);
  };

  /**
   * JSONファイルとしてダウンロード
   */
  const downloadArchiveAsJson = (archive) => {
    const jsonStr = JSON.stringify(archive, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${archive.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // ユーザーに通知
    alert(
      '✅ アーカイブをJSONファイルとしてダウンロードしました！\n\n' +
      '📋 次のステップ:\n' +
      '1. ダウンロードしたファイルを public/data/archives/ に配置\n' +
      '2. public/data/archives_index.json に登録\n' +
      '3. ページをリロード'
    );
  };

  /**
   * モーダルを閉じる
   */
  const handleCloseModal = () => {
    setShowModal(false);
    setTempMarker(null);
  };

  /**
   * 追加モードの切り替え
   */
  const toggleAddMode = () => {
    setIsAddMode(!isAddMode);
    if (showModal) {
      setShowModal(false);
      setTempMarker(null);
    }
  };

  /**
   * 指定座標にズーム
   */
  const handleZoomToArchive = (position) => {
    if (mapRef.current) {
      mapRef.current.setView(position, 15);
    }
  };

  // JSONアーカイブとWeb追加アーカイブを統合
  const allArchives = [...archives, ...webArchives];

  // ローディング表示
  if (loading) {
    return (
      <div className="App">
        <Header />
        <div className="content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>{t('loading')}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // エラー表示
  if (error) {
    return (
      <div className="App">
        <Header />
        <div className="content">
          <div className="error-container">
            <p className="error-message">⚠️ {t('loadError')}</p>
            <p className="error-detail">{error}</p>
            <p className="error-hint">
              JSONファイルが見つかりません。<br/>
              public/data/archives_index.json を確認してください。
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      
      <div className="content">
        <Sidebar
          archives={allArchives}
          selectedArchive={selectedArchive}
          isAddMode={isAddMode}
          showForm={false}
          formData={null}
          tempMarker={tempMarker}
          onToggleAddMode={toggleAddMode}
          onFormChange={() => {}}
          onFormSubmit={() => {}}
          onFormCancel={() => {}}
          onSelectArchive={selectArchive}
          onZoomToArchive={handleZoomToArchive}
          onDeleteArchive={() => {}}
        />

        <MapView
          archives={allArchives}
          tempMarker={tempMarker}
          isAddMode={isAddMode}
          selectedArchive={selectedArchive}
          onMapClick={handleMapClick}
          onMarkerClick={handleMarkerClick}
          mapRef={mapRef}
        />
      </div>

      <AddArchiveModal
        isOpen={showModal}
        position={tempMarker}
        onClose={handleCloseModal}
        onSubmit={handleAddArchive}
      />

      <Footer />
    </div>
  );
}

export default App;