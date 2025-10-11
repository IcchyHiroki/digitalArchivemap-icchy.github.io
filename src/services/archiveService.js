/**
 * アーカイブデータ管理サービス
 * 将来的にバックエンドAPIやLocalStorageとの連携が可能
 */

/**
 * 初期サンプルデータ
 */
const initialArchives = [
  {
    id: 1,
    position: [35.6762, 139.6503],
    title: '東京タワー',
    titleEn: 'Tokyo Tower',
    description: '3Dスキャンデータ',
    descriptionEn: '3D Scan Data',
    dataType: '3D',
    date: '2024-01-15'
  },
  {
    id: 2,
    position: [34.6937, 135.5023],
    title: '大阪城',
    titleEn: 'Osaka Castle',
    description: '写真アーカイブ',
    descriptionEn: 'Photo Archive',
    dataType: 'Photo',
    date: '2024-02-20'
  }
];

/**
 * アーカイブデータを取得
 * @returns {Array} アーカイブデータの配列
 */
export const getArchives = () => {
  try {
    const stored = localStorage.getItem('archives');
    return stored ? JSON.parse(stored) : initialArchives;
  } catch (error) {
    console.error('Failed to load archives:', error);
    return initialArchives;
  }
};

/**
 * アーカイブデータを保存
 * @param {Array} archives - 保存するアーカイブデータ
 */
export const saveArchives = (archives) => {
  try {
    localStorage.setItem('archives', JSON.stringify(archives));
  } catch (error) {
    console.error('Failed to save archives:', error);
  }
};

/**
 * 新しいアーカイブを作成
 * @param {Object} archiveData - アーカイブデータ
 * @returns {Object} 作成されたアーカイブ
 */
export const createArchive = (archiveData) => {
  return {
    id: Date.now(),
    position: archiveData.position,
    title: archiveData.title,
    titleEn: archiveData.titleEn,
    description: archiveData.description,
    descriptionEn: archiveData.descriptionEn,
    dataType: archiveData.dataType,
    date: archiveData.date
  };
};

/**
 * アーカイブデータを検証
 * @param {Object} data - 検証するデータ
 * @returns {boolean} 有効かどうか
 */
export const validateArchive = (data) => {
  return (
    data.title &&
    data.titleEn &&
    data.description &&
    data.descriptionEn &&
    data.position &&
    data.position.length === 2 &&
    data.dataType &&
    data.date
  );
};

/**
 * アーカイブをフィルタリング
 * @param {Array} archives - アーカイブ配列
 * @param {string} dataType - データタイプ
 * @returns {Array} フィルタリングされたアーカイブ
 */
export const filterArchivesByType = (archives, dataType) => {
  if (!dataType) return archives;
  return archives.filter(archive => archive.dataType === dataType);
};

/**
 * アーカイブをエクスポート（JSON形式）
 * @param {Array} archives - エクスポートするアーカイブ
 */
export const exportArchives = (archives) => {
  const dataStr = JSON.stringify(archives, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `archives-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * アーカイブをインポート
 * @param {File} file - インポートするJSONファイル
 * @returns {Promise<Array>} インポートされたアーカイブ
 */
export const importArchives = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const archives = JSON.parse(e.target.result);
        if (Array.isArray(archives)) {
          resolve(archives);
        } else {
          reject(new Error('Invalid file format'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};