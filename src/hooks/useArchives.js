import { useState, useEffect, useCallback } from 'react';
import { 
  getArchives, 
  saveArchives, 
  createArchive,
  validateArchive 
} from '../services/archiveService';

/**
 * アーカイブデータを管理するカスタムフック
 */
export const useArchives = () => {
  const [archives, setArchives] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [loading, setLoading] = useState(true);

  // 初期データの読み込み
  useEffect(() => {
    try {
      const loadedArchives = getArchives();
      setArchives(loadedArchives);
    } catch (error) {
      console.error('Failed to load archives:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // データが変更されたら保存
  useEffect(() => {
    if (!loading && archives.length > 0) {
      saveArchives(archives);
    }
  }, [archives, loading]);

  /**
   * 新しいアーカイブを追加
   */
  const addArchive = useCallback((archiveData) => {
    if (!validateArchive(archiveData)) {
      throw new Error('Invalid archive data');
    }
    
    const newArchive = createArchive(archiveData);
    setArchives(prev => [...prev, newArchive]);
    return newArchive;
  }, []);

  /**
   * アーカイブを更新
   */
  const updateArchive = useCallback((id, updates) => {
    setArchives(prev =>
      prev.map(archive =>
        archive.id === id ? { ...archive, ...updates } : archive
      )
    );
  }, []);

  /**
   * アーカイブを削除
   */
  const deleteArchive = useCallback((id) => {
    setArchives(prev => prev.filter(archive => archive.id !== id));
    if (selectedArchive?.id === id) {
      setSelectedArchive(null);
    }
  }, [selectedArchive]);

  /**
   * アーカイブを選択
   */
  const selectArchive = useCallback((archive) => {
    setSelectedArchive(archive);
  }, []);

  /**
   * 全てのアーカイブをクリア
   */
  const clearArchives = useCallback(() => {
    if (window.confirm('全てのアーカイブを削除しますか？')) {
      setArchives([]);
      setSelectedArchive(null);
      localStorage.removeItem('archives');
    }
  }, []);

  return {
    archives,
    selectedArchive,
    loading,
    addArchive,
    updateArchive,
    deleteArchive,
    selectArchive,
    clearArchives,
    setArchives
  };
};