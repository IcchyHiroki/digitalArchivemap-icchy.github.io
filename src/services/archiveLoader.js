/**
 * JSONファイルからアーカイブデータを読み込むサービス
 */

const ARCHIVES_INDEX_PATH = `${process.env.PUBLIC_URL}/data/archives/archives_index.json`;
const ARCHIVES_DATA_PATH = `${process.env.PUBLIC_URL}/data/archives/`;

/**
 * アーカイブインデックスを取得
 * @returns {Promise<Object>} アーカイブインデックス
 */
export const fetchArchivesIndex = async () => {
  try {
    const response = await fetch(ARCHIVES_INDEX_PATH);
    if (!response.ok) {
      throw new Error('Failed to fetch archives index');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading archives index:', error);
    throw error;
  }
};

/**
 * 個別のアーカイブデータを取得
 * @param {string} filename - アーカイブファイル名
 * @returns {Promise<Object>} アーカイブデータ
 */
export const fetchArchiveData = async (filename) => {
  try {
    const response = await fetch(`${ARCHIVES_DATA_PATH}${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch archive: ${filename}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading archive ${filename}:`, error);
    throw error;
  }
};

/**
 * 全てのアーカイブデータを取得
 * @returns {Promise<Array>} 全アーカイブデータの配列
 */
export const fetchAllArchives = async () => {
  try {
    const index = await fetchArchivesIndex();
    const archivePromises = index.archives.map(item => 
      fetchArchiveData(item.file)
    );
    return await Promise.all(archivePromises);
  } catch (error) {
    console.error('Error loading all archives:', error);
    return [];
  }
};

/**
 * アーカイブデータをマップ表示用に変換
 * @param {Object} archiveData - JSONアーカイブデータ
 * @returns {Object} マップ表示用データ
 */
export const transformArchiveForMap = (archiveData) => {
  return {
    id: archiveData.id,
    position: [
      archiveData.coordinates.latitude,
      archiveData.coordinates.longitude
    ],
    name: archiveData.name,
    description: archiveData.description,
    address: archiveData.address,
    dataType: archiveData.dataType,
    dataLinks: archiveData.dataLinks || [],
    lastUpdated: archiveData.lastUpdated
  };
};

/**
 * 複数のアーカイブデータを変換
 * @param {Array} archives - アーカイブデータ配列
 * @returns {Array} 変換されたデータ配列
 */
export const transformArchivesForMap = (archives) => {
  return archives.map(transformArchiveForMap);
};