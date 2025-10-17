import { useState, useEffect, useCallback } from 'react';
import { 
  fetchAllArchives, 
  transformArchivesForMap 
} from '../services/archiveLoader';

/**
 * JSONファイルからアーカイブデータを読み込むカスタムフック
 */
export const useJsonArchives = () => {
  const [archives, setArchives] = useState([]);
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * アーカイブデータを読み込む
   */
  const loadArchives = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchAllArchives();
      const transformedData = transformArchivesForMap(data);
      setArchives(transformedData);
    } catch (err) {
      console.error('Failed to load archives:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 初回読み込み
   */
  useEffect(() => {
    loadArchives();
  }, [loadArchives]);

  /**
   * アーカイブを選択
   */
  const selectArchive = useCallback((archive) => {
    setSelectedArchive(archive);
  }, []);

  /**
   * データを再読み込み
   */
  const reloadArchives = useCallback(() => {
    loadArchives();
  }, [loadArchives]);

  return {
    archives,
    selectedArchive,
    loading,
    error,
    selectArchive,
    reloadArchives
  };
};