/**
 * JSONファイルからアーカイブデータを読み込むサービス
 */

// 読み込むアーカイブファイルのリスト（ここに追加するだけ！）
const ARCHIVE_FILES = [
  'tokyo_tower.json',
  'osaka_castle.json'
]

const ARCHIVES_DATA_PATH = `${process.env.PUBLIC_URL || ''}/data/archives/`;

/**
 * 個別のアーカイブデータを取得
 * @param {string} filename - アーカイブファイル名
 * @returns {Promise<Object>} アーカイブデータ
 */
export const fetchArchiveData = async (filename) => {
  try {
    const url = `${ARCHIVES_DATA_PATH}${filename}`;
    console.log('📥 Fetching archive from:', url);
    
    const response = await fetch(url);
    console.log(`📊 Response status for ${filename}:`, response.status);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch archive: ${filename} (${response.status})`);
    }
    
    const data = await response.json();
    console.log('✅ Archive loaded:', filename, data);
    return data;
  } catch (error) {
    console.error(`❌ Error loading archive ${filename}:`, error);
    throw error;
  }
};

/**
 * 全てのアーカイブデータを取得
 * @returns {Promise<Array>} 全アーカイブデータの配列
 */
export const fetchAllArchives = async () => {
  try {
    console.log('🔄 Loading archives from files:', ARCHIVE_FILES);
    
    const archivePromises = ARCHIVE_FILES.map(filename => 
      fetchArchiveData(filename).catch(err => {
        console.warn(`⚠️ Skipping ${filename}:`, err.message);
        return null; // エラーの場合はnullを返す
      })
    );
    
    const archives = await Promise.all(archivePromises);
    
    // nullを除外（読み込めなかったファイルをスキップ）
    const validArchives = archives.filter(archive => archive !== null);
    
    console.log(`✅ Successfully loaded ${validArchives.length}/${ARCHIVE_FILES.length} archives`);
    return validArchives;
  } catch (error) {
    console.error('❌ Error loading all archives:', error);
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

/**
 * 新しいアーカイブファイルを追加する方法：
 * 
 * 1. public/data/archives/ に新しいJSONファイルを配置
 * 2. 上記のARCHIVE_FILES配列にファイル名を追加
 * 3. サーバーを再起動
 * 
 * 例：
 * const ARCHIVE_FILES = [
 *   'tokyo_tower.json',
 *   'osaka_castle.json',
 *   'your_new_file.json'  // ← ここに追加
 * ];
 */

/**
 * データリンクの種類を判定
 * @param {string} url - URL
 * @returns {string} リンクタイプ
 */
export const detectLinkType = (url) => {
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('sketchfab.com') || urlLower.includes('.glb') || urlLower.includes('.gltf')) {
    return '3D Model';
  }
  if (urlLower.includes('youtube.com') || urlLower.includes('vimeo.com') || urlLower.includes('.mp4')) {
    return 'Video';
  }
  if (urlLower.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return 'Image';
  }
  if (urlLower.match(/\.(pdf|doc|docx)$/)) {
    return 'Document';
  }
  if (urlLower.match(/\.(mp3|wav|ogg)$/)) {
    return 'Audio';
  }
  
  return 'Link';
};

/**
 * アーカイブデータのバリデーション
 * @param {Object} archiveData - バリデーション対象のデータ
 * @returns {boolean} 有効かどうか
 */
export const validateArchiveData = (archiveData) => {
  const required = [
    'id',
    'name',
    'description',
    'address',
    'coordinates',
    'dataType',
    'lastUpdated'
  ];

  for (const field of required) {
    if (!archiveData[field]) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }

  if (!archiveData.coordinates.latitude || !archiveData.coordinates.longitude) {
    console.error('Invalid coordinates');
    return false;
  }

  return true;
};