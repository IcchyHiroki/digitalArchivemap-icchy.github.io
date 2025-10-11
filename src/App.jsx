import React, { useState, useRef } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MapView from './components/Map/MapView';
import Footer from './components/Footer/Footer';
import { useArchives } from './hooks/useArchives';
import './App.css';

/**
 * メインアプリケーションコンポーネント
 */
function App() {
  const mapRef = useRef(null);
  
  // アーカイブ管理
  const {
    archives,
    selectedArchive,
    addArchive,
    deleteArchive,
    selectArchive
  } = useArchives();

  // UI状態管理
  const [isAddMode, setIsAddMode] = useState(false);
  const [tempMarker, setTempMarker] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    description: '',
    descriptionEn: '',
    dataType: '3D',
    date: new Date().toISOString().split('T')[0]
  });

  /**
   * 地図クリックハンドラ
   */
  const handleMapClick = (latlng) => {
    setTempMarker(latlng);
    setShowForm(true);
    setIsAddMode(false);
  };

  /**
   * フォーム送信ハンドラ
   */
  const handleFormSubmit = (data) => {
    if (!tempMarker) return;

    try {
      addArchive({
        ...data,
        position: [tempMarker.lat, tempMarker.lng]
      });
      resetForm();
    } catch (error) {
      console.error('Failed to add archive:', error);
      alert('アーカイブの追加に失敗しました');
    }
  };

  /**
   * フォームをリセット
   */
  const resetForm = () => {
    setTempMarker(null);
    setShowForm(false);
    setFormData({
      title: '',
      titleEn: '',
      description: '',
      descriptionEn: '',
      dataType: '3D',
      date: new Date().toISOString().split('T')[0]
    });
  };

  /**
   * 追加モードの切り替え
   */
  const toggleAddMode = () => {
    setIsAddMode(!isAddMode);
    if (!isAddMode) {
      setShowForm(false);
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

  return (
    <div className="App">
      <Header />
      
      <div className="content">
        <Sidebar
          archives={archives}
          selectedArchive={selectedArchive}
          isAddMode={isAddMode}
          showForm={showForm}
          formData={formData}
          tempMarker={tempMarker}
          onToggleAddMode={toggleAddMode}
          onFormChange={setFormData}
          onFormSubmit={handleFormSubmit}
          onFormCancel={resetForm}
          onSelectArchive={selectArchive}
          onZoomToArchive={handleZoomToArchive}
          onDeleteArchive={deleteArchive}
        />

        <MapView
          archives={archives}
          tempMarker={tempMarker}
          isAddMode={isAddMode}
          onMapClick={handleMapClick}
          mapRef={mapRef}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;