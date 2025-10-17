# デジタルアーカイブマップ - セットアップガイド

## 📁 完全なディレクトリ構成

```
digital-archive-map/
├── public/
│   ├── data/
│   │   ├── archives_index.json          # ★ 必須：アーカイブインデックス
│   │   └── archives/                    # ★ 必須：個別アーカイブフォルダ
│   │       ├── tokyo_tower.json
│   │       ├── osaka_castle.json
│   │       └── kyoto_temple.json
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── Map/
│   │   │   ├── MapView.jsx
│   │   │   ├── MapClickHandler.jsx
│   │   │   ├── CustomMarker.jsx
│   │   │   └── Map.css
│   │   └── Sidebar/
│   │       ├── Sidebar.jsx
│   │       ├── ArchiveList.jsx
│   │       ├── ArchiveItem.jsx
│   │       ├── ArchiveForm.jsx          # (将来の手動追加用)
│   │       ├── Sidebar.css
│   │       └── ArchiveForm.css
│   ├── hooks/
│   │   ├── useArchives.js               # (将来の手動追加用)
│   │   └── useJsonArchives.js           # ★ 現在使用中
│   ├── services/
│   │   ├── archiveService.js
│   │   └── archiveLoader.js             # ★ JSON読み込み
│   ├── utils/
│   │   └── mapIcons.js
│   ├── locales/
│   │   └── i18n.js
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
├── README.md
└── SETUP_GUIDE.md                       # このファイル
```

## 🚀 クイックスタート

### 1. プロジェクトのクローン/作成

```bash
# 新規作成の場合
npx create-react-app digital-archive-map
cd digital-archive-map

# または既存リポジトリをクローン
git clone https://github.com/yourusername/digital-archive-map.git
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

### 4. アーカイブデータの作成

#### Step 4-1: インデックスファイルを作成

`public/data/archives_index.json`:

```json
{
  "version": "1.0.0",
  "lastUpdated": "2024-03-15",
  "archives": []
}
```

#### Step 4-2: 個別アーカイブファイルを作成

`public/data/archives/your_first_archive.json`:

```json
{
  "id": "your-archive-001",
  "name": {
    "ja": "サンプルアーカイブ",
    "en": "Sample Archive"
  },
  "description": {
    "ja": "これはサンプルのアーカイブです",
    "en": "This is a sample archive"
  },
  "address": {
    "ja": "東京都",
    "en": "Tokyo, Japan"
  },
  "coordinates": {
    "latitude": 35.6762,
    "longitude": 139.6503
  },
  "dataType": "Photo",
  "dataLinks": [
    {
      "type": "Photo",
      "url": "https://example.com/photos",
      "description": {
        "ja": "写真ギャラリー",
        "en": "Photo Gallery"
      }
    }
  ],
  "lastUpdated": "2024-03-15"
}
```

#### Step 4-3: インデックスに登録

`public/data/archives_index.json`を更新:

```json
{
  "version": "1.0.0",
  "lastUpdated": "2024-03-15",
  "archives": [
    {
      "id": "your-archive-001",
      "file": "your_first_archive.json",
      "preview": {
        "name": {
          "ja": "サンプルアーカイブ",
          "en": "Sample Archive"
        },
        "dataType": "Photo",
        "coordinates": {
          "latitude": 35.6762,
          "longitude": 139.6503
        }
      }
    }
  ]
}
```

### 5. 開発サーバーの起動

```bash
npm start
```

ブラウザで `http://localhost:3000` を開きます。

### 6. GitHub Pagesへのデプロイ設定

#### package.jsonの編集

```json
{
  "name": "digital-archive-map",
  "version": "1.0.0",
  "homepage": "https://yourusername.github.io/digital-archive-map",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

#### デプロイコマンド

```bash
# 初回デプロイ
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/digital-archive-map.git
git push -u origin main

# GitHub Pagesへデプロイ
npm run deploy
```

## 📝 データ追加の詳細手順

### テンプレート：アーカイブJSONファイル

```json
{
  "id": "unique-identifier",
  "name": {
    "ja": "日本語名",
    "en": "English Name"
  },
  "description": {
    "ja": "日本語の説明文",
    "en": "English description"
  },
  "address": {
    "ja": "日本語住所",
    "en": "English Address"
  },
  "coordinates": {
    "latitude": 35.000000,
    "longitude": 139.000000
  },
  "dataType": "3D|Photo|Video|Document|Audio",
  "dataLinks": [
    {
      "type": "3D Model|Photo|Video|Document|Audio",
      "url": "https://example.com/link",
      "description": {
        "ja": "リンク説明",
        "en": "Link Description"
      }
    }
  ],
  "lastUpdated": "2024-03-15"
}
```

### フィールドの詳細

#### 必須フィールド

| フィールド | 型 | 説明 | 例 |
|-----------|-----|------|-----|
| `id` | string | 一意の識別子（英数字とハイフン） | `"tokyo-tower-001"` |
| `name.ja` | string | 日本語名 | `"東京タワー"` |
| `name.en` | string | 英語名 | `"Tokyo Tower"` |
| `description.ja` | string | 日本語説明 | `"東京のランドマーク..."` |
| `description.en` | string | 英語説明 | `"A landmark of Tokyo..."` |
| `address.ja` | string | 日本語住所 | `"東京都港区..."` |
| `address.en` | string | 英語住所 | `"Minato-ku, Tokyo"` |
| `coordinates.latitude` | number | 緯度（-90 ～ 90） | `35.6585805` |
| `coordinates.longitude` | number | 経度（-180 ～ 180） | `139.7454329` |
| `dataType` | string | データタイプ | `"3D"`, `"Photo"`, `"Video"`, `"Document"`, `"Audio"` |
| `lastUpdated` | string | 更新日（YYYY-MM-DD） | `"2024-03-15"` |

#### オプションフィールド

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `dataLinks` | array | データリンクの配列（0個以上） |
| `dataLinks[].type` | string | リンクタイプ |
| `dataLinks[].url` | string | リンクURL |
| `dataLinks[].description.ja` | string | 日本語リンク説明 |
| `dataLinks[].description.en` | string | 英語リンク説明 |

### 座標の取得方法

#### 方法1: Google Mapsから

1. Google Mapsで場所を検索
2. 場所を右クリック
3. 座標をクリックしてコピー
4. 形式: `35.6585805, 139.7454329`

#### 方法2: OpenStreetMapから

1. https://www.openstreetmap.org/ にアクセス
2. 場所を検索
3. 「共有」→「座標を表示」

#### 方法3: 地理院地図から

1. https://maps.gsi.go.jp/ にアクセス
2. 場所をクリック
3. 座標情報を確認

## 🔗 データリンクの設定例

### 3Dモデル（Sketchfab）

```json
{
  "type": "3D Model",
  "url": "https://sketchfab.com/3d-models/your-model-id",
  "description": {
    "ja": "3Dモデルを見る",
    "en": "View 3D Model"
  }
}
```

### 写真（Googleフォト、Flickr等）

```json
{
  "type": "Photo",
  "url": "https://photos.google.com/share/your-album",
  "description": {
    "ja": "写真アルバム",
    "en": "Photo Album"
  }
}
```

### 動画（YouTube）

```json
{
  "type": "Video",
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "description": {
    "ja": "紹介動画",
    "en": "Introduction Video"
  }
}
```

### PDF文書

```json
{
  "type": "Document",
  "url": "https://example.com/document.pdf",
  "description": {
    "ja": "技術資料（PDF）",
    "en": "Technical Document (PDF)"
  }
}
```

## 🛠️ トラブルシューティング

### データが表示されない

1. **JSONの構文エラー**
   - https://jsonlint.com/ で検証
   - カンマ、括弧の確認

2. **ファイルパスの確認**
   - `public/data/archives/` に配置
   - ファイル名が `archives_index.json` と一致

3. **ブラウザコンソールの確認**
   - F12キーでデベロッパーツールを開く
   - Console タブでエラーを確認

### 座標が正しく表示されない

- 緯度・経度が逆になっていないか確認
- 数値型（文字列ではない）か確認

```json
// ✅ 正しい
"coordinates": {
  "latitude": 35.6585805,
  "longitude": 139.7454329
}

// ❌ 間違い
"coordinates": {
  "latitude": "35.6585805",
  "longitude": "139.7454329"
}
```

### GitHub Pagesで動作しない

1. **リポジトリ設定の確認**
   - Settings → Pages
   - Source: `gh-pages` ブランチ

2. **homepage設定の確認**
   - `package.json` の `homepage` が正しいか

3. **デプロイの再実行**
   ```bash
   npm run deploy
   ```

## 📊 データ管理のベストプラクティス

### 1. ファイル命名規則

```
archives/
├── tokyo_tower.json          # 小文字、アンダースコア
├── osaka_castle.json
└── kyoto_kinkakuji.json
```

### 2. IDの命名規則

```json
{
  "id": "location-name-number"
}
```

例:
- `"tokyo-tower-001"`
- `"osaka-castle-001"`
- `"kyoto-kinkakuji-001"`

### 3. バージョン管理

アーカイブを更新したら:

1. `lastUpdated` フィールドを更新
2. `archives_index.json` の `lastUpdated` も更新

### 4. バックアップ

```bash
# データフォルダのバックアップ
cp -r public/data public/data_backup_20240315
```

## 🎨 カスタマイズ

### データタイプの追加

1. **utils/mapIcons.js** を編集

```javascript
export const iconTypes = {
  '3D': createCustomIcon('blue'),
  'Photo': createCustomIcon('green'),
  'Video': createCustomIcon('red'),
  'Document': createCustomIcon('orange'),
  'Audio': createCustomIcon('violet'),
  'NewType': createCustomIcon('yellow')  // 追加
};
```

2. **components/Sidebar/Sidebar.css** を編集

```css
.data-type-badge.newtype {
  background-color: #fff9c4;
  color: #f57f17;
}
```

### 問い合わせ先の変更

**components/Footer/Footer.jsx** を編集:

```javascript
<a href="mailto:your-email@example.com">
  your-email@example.com
</a>
```

## 📚 参考資料

- [React公式ドキュメント](https://react.dev/)
- [React Leaflet](https://react-leaflet.js.org/)
- [i18next](https://www.i18next.com/)
- [GeoJSON仕様](https://geojson.org/)
- [JSON記法](https://www.json.org/json-ja.html)

## 💡 ヒント

- 大量のデータがある場合は、地域やカテゴリごとにフォルダを分けることを検討
- 画像は外部サービス（Cloudinary、imgix等）を利用して最適化
- データ更新は定期的に、バージョン管理システム（Git）で管理

## ✅ チェックリスト

デプロイ前の確認項目:

- [ ] 全JSONファイルの構文が正しい
- [ ] archives_index.jsonに全アーカイブが登録されている
- [ ] 座標が正確
- [ ] 全リンクが有効
- [ ] 日本語・英語の両方が入力されている
- [ ] ローカル環境で正常に動作する
- [ ] package.jsonのhomepageが設定されている

## 🆘 サポート

問題が解決しない場合:

- GitHub Issues: https://github.com/yourusername/digital-archive-map/issues
- Email: contact@archivemap.example.com