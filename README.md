# デジタルアーカイブマップ

QGISスタイルのインターフェースを持つ、デジタルアーカイブ管理Webアプリケーション

## 🏗️ プロジェクト構造

```
digital-archive-map/
├── public/
│   ├── data/
│   │   ├── archives_index.json      # アーカイブインデックスファイル
│   │   └── archives/                # 個別アーカイブJSONファイル
│   │       ├── tokyo_tower.json
│   │       ├── osaka_castle.json
│   │       └── kyoto_temple.json
│   └── index.html
├── src/
│   ├── components/                  # UIコンポーネント
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── Map/
│   │   │   ├── MapView.jsx
│   │   │   ├── MapClickHandler.jsx
│   │   │   ├── CustomMarker.jsx     # リンク対応マーカー
│   │   │   └── Map.css
│   │   └── Sidebar/
│   │       ├── Sidebar.jsx
│   │       ├── ArchiveList.jsx
│   │       ├── ArchiveItem.jsx
│   │       ├── ArchiveForm.jsx
│   │       ├── Sidebar.css
│   │       └── ArchiveForm.css
│   ├── hooks/
│   │   ├── useArchives.js           # 手動追加用フック
│   │   └── useJsonArchives.js       # JSON読み込み用フック
│   ├── services/
│   │   ├── archiveService.js        # データ管理サービス
│   │   └── archiveLoader.js         # JSON読み込みサービス
│   ├── utils/
│   │   └── mapIcons.js
│   ├── locales/
│   │   └── i18n.js
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 📦 データ構造

### アーカイブインデックス（archives_index.json）

全アーカイブの一覧を管理するインデックスファイル：

```json
{
  "version": "1.0.0",
  "lastUpdated": "2024-03-15",
  "archives": [
    {
      "id": "tokyo-tower-001",
      "file": "tokyo_tower.json",
      "preview": {
        "name": { "ja": "東京タワー", "en": "Tokyo Tower" },
        "dataType": "3D",
        "coordinates": { "latitude": 35.6585805, "longitude": 139.7454329 }
      }
    }
  ]
}
```

### 個別アーカイブファイル（例: tokyo_tower.json）

各アーカイブの詳細情報：

```json
{
  "id": "tokyo-tower-001",
  "name": {
    "ja": "東京タワー",
    "en": "Tokyo Tower"
  },
  "description": {
    "ja": "東京のランドマークとして知られる333メートルの電波塔...",
    "en": "A 333-meter communications tower..."
  },
  "address": {
    "ja": "東京都港区芝公園4-2-8",
    "en": "4-2-8 Shibakoen, Minato-ku, Tokyo"
  },
  "coordinates": {
    "latitude": 35.6585805,
    "longitude": 139.7454329
  },
  "dataType": "3D",
  "dataLinks": [
    {
      "type": "3D Model",
      "url": "https://sketchfab.com/3d-models/tokyo-tower-example",
      "description": {
        "ja": "3Dスキャンモデル",
        "en": "3D Scan Model"
      }
    },
    {
      "type": "Photo",
      "url": "https://example.com/photos/tokyo-tower",
      "description": {
        "ja": "写真ギャラリー",
        "en": "Photo Gallery"
      }
    }
  ],
  "lastUpdated": "2024-03-15"
}
```

## 📋 データフィールド説明

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `id` | string | ✅ | 一意の識別子 |
| `name` | object | ✅ | 名前（日本語・英語） |
| `description` | object | ✅ | 説明（日本語・英語） |
| `address` | object | ✅ | 住所（日本語・英語） |
| `coordinates` | object | ✅ | 座標（latitude, longitude） |
| `dataType` | string | ✅ | データタイプ（3D/Photo/Video/Document/Audio） |
| `dataLinks` | array | ❌ | データリンクの配列 |
| `lastUpdated` | string | ✅ | 更新日（YYYY-MM-DD形式） |

### dataLinks配列の構造

```json
{
  "type": "3D Model",
  "url": "https://example.com/model",
  "description": {
    "ja": "説明（日本語）",
    "en": "Description (English)"
  }
}
```

**対応リンクタイプ:**
- `3D Model` - 3Dモデル（Sketchfab等）
- `Photo` - 写真・画像
- `Video` - 動画（YouTube等）
- `Document` - PDF・ドキュメント
- `Audio` - 音声ファイル

## 🚀 セットアップ

### 1. プロジェクト作成

```bash
npx create-react-app digital-archive-map
cd digital-archive-map
```

### 2. 依存パッケージのインストール

```bash
npm install react-leaflet leaflet i18next react-i18next --legacy-peer-deps
npm install --save-dev gh-pages --legacy-peer-deps
```

### 3. データディレクトリの作成

```bash
mkdir -p public/data/archives
```

### 4. アーカイブデータの配置

1. `public/data/archives_index.json` を作成
2. `public/data/archives/` に個別のJSONファイルを配置

### 5. package.json設定

```json
{
  "homepage": "https://yourusername.github.io/digital-archive-map",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

## 🎯 主な機能

### 1. JSON駆動のデータ管理
- 静的JSONファイルからアーカイブを読み込み
- 個別ファイルで管理することで拡張性を確保
- バージョン管理が容易

### 2. 外部リンク対応
- 3Dモデル（Sketchfab等）へのリンク
- 写真ギャラリーへのリンク
- 動画（YouTube等）へのリンク
- PDFドキュメントへのリンク
- 音声ファイルへのリンク

### 3. 多言語対応
- 日本語・英語の完全対応
- 全フィールドで多言語データをサポート

### 4. インタラクティブな地図
- OpenStreetMapベースの表示
- カラーコードされたマーカー
- リッチなポップアップ表示

### 5. レスポンシブデザイン
- デスクトップ・タブレット・モバイル対応

## 📝 新しいアーカイブの追加方法

### Step 1: JSONファイルを作成

`public/data/archives/your_archive.json`:

```json
{
  "id": "unique-id-001",
  "name": {
    "ja": "アーカイブ名",
    "en": "Archive Name"
  },
  "description": {
    "ja": "説明",
    "en": "Description"
  },
  "address": {
    "ja": "住所",
    "en": "Address"
  },
  "coordinates": {
    "latitude": 35.000000,
    "longitude": 139.000000
  },
  "dataType": "3D",
  "dataLinks": [
    {
      "type": "3D Model",
      "url": "https://your-link.com",
      "description": {
        "ja": "リンク説明",
        "en": "Link Description"
      }
    }
  ],
  "lastUpdated": "2024-03-15"
}
```

### Step 2: インデックスに追加

`public/data/archives_index.json`に追加:

```json
{
  "id": "unique-id-001",
  "file": "your_archive.json",
  "preview": {
    "name": { "ja": "アーカイブ名", "en": "Archive Name" },
    "dataType": "3D",
    "coordinates": { "latitude": 35.000000, "longitude": 139.000000 }
  }
}
```

### Step 3: 再ビルド・デプロイ

```bash
npm run build
npm run deploy
```

## 🛠️ 開発

```bash
# 開発サーバー起動
npm start

# ビルド
npm run build

# GitHub Pagesへデプロイ
npm run deploy
```

## 🔧 カスタマイズ

### データタイプの追加

1. `utils/mapIcons.js`に新しいアイコンを追加
2. `dataTypes`配列に追加
3. CSSでバッジスタイルを追加

### リンクタイプの追加

1. `services/archiveLoader.js`の`detectLinkType`関数を更新
2. `CustomMarker.jsx`にアイコンを追加

## 📧 問い合わせ

- Email: contact@archivemap.example.com
- GitHub: https://github.com/yourusername/digital-archive-map
- Documentation: https://docs.archivemap.example.com

## 🎨 データタイプとカラーコード

| データタイプ | マーカー色 | 用途 |
|------------|-----------|------|
| 3D | 青 (Blue) | 3Dスキャンモデル |
| Photo | 緑 (Green) | 写真・画像 |
| Video | 赤 (Red) | 動画 |
| Document | オレンジ (Orange) | 文書・PDF |
| Audio | 紫 (Violet) | 音声 |

## 📄 ライセンス

MIT License

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいアーカイブJSONファイルを作成
3. プルリクエストを送信

## 📚 参考リンク

- [React Leaflet Documentation](https://react-leaflet.js.org/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [i18next Documentation](https://www.i18next.com/)
- [Sketchfab](https://sketchfab.com/) - 3Dモデルホスティング