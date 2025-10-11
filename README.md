# デジタルアーカイブマップ

QGISスタイルのインターフェースを持つ、デジタルアーカイブ管理Webアプリケーション

## 🏗️ プロジェクト構造

```
src/
├── components/              # UIコンポーネント
│   ├── Header/             # ヘッダー関連
│   │   ├── Header.jsx      # ヘッダーコンポーネント
│   │   └── Header.css      # ヘッダースタイル
│   ├── Footer/             # フッター関連
│   │   ├── Footer.jsx      # フッターコンポーネント
│   │   └── Footer.css      # フッタースタイル
│   ├── Map/                # 地図関連
│   │   ├── MapView.jsx     # 地図表示コンポーネント
│   │   ├── MapClickHandler.jsx  # 地図クリックハンドラ
│   │   ├── CustomMarker.jsx     # カスタムマーカー
│   │   └── Map.css         # 地図スタイル
│   └── Sidebar/            # サイドバー関連
│       ├── Sidebar.jsx     # サイドバー統合コンポーネント
│       ├── ArchiveList.jsx # アーカイブリスト
│       ├── ArchiveItem.jsx # アーカイブリストアイテム
│       ├── ArchiveForm.jsx # アーカイブフォーム
│       ├── Sidebar.css     # サイドバースタイル
│       └── ArchiveForm.css # フォームスタイル
├── hooks/                  # カスタムフック
│   └── useArchives.js     # アーカイブ管理フック
├── services/              # ビジネスロジック
│   └── archiveService.js  # データ管理サービス
├── utils/                 # ユーティリティ
│   └── mapIcons.js       # マーカーアイコン定義
├── locales/              # 多言語対応
│   └── i18n.js          # 翻訳設定
├── App.jsx              # メインアプリケーション
├── App.css              # メインスタイル
└── index.js             # エントリーポイント
```

## 📦 各ファイルの役割

### Components（コンポーネント層）

#### Header/
- **Header.jsx**: アプリケーションのヘッダー、言語切り替えボタンを含む
- **Header.css**: ヘッダーのスタイル定義

#### Footer/
- **Footer.jsx**: フッター、問い合わせ先と著作権情報を表示
- **Footer.css**: フッターのスタイル定義

#### Map/
- **MapView.jsx**: 地図の表示と統合管理
- **MapClickHandler.jsx**: 地図クリックイベントのハンドリング
- **CustomMarker.jsx**: アーカイブポイントを表示するマーカー
- **Map.css**: 地図関連のスタイル定義

#### Sidebar/
- **Sidebar.jsx**: サイドバーの統合コンポーネント
- **ArchiveList.jsx**: アーカイブのリスト表示
- **ArchiveItem.jsx**: 個別のアーカイブアイテム
- **ArchiveForm.jsx**: アーカイブ追加フォーム
- **Sidebar.css**: サイドバーのスタイル
- **ArchiveForm.css**: フォームのスタイル

### Hooks（カスタムフック層）

- **useArchives.js**: アーカイブデータの状態管理と操作を提供するカスタムフック
  - データの取得、追加、更新、削除
  - LocalStorageとの自動同期

### Services（サービス層）

- **archiveService.js**: データ管理のビジネスロジック
  - データの永続化（LocalStorage）
  - データの検証
  - インポート/エクスポート機能

### Utils（ユーティリティ層）

- **mapIcons.js**: Leafletマーカーアイコンの定義
  - データタイプごとのカラーアイコン
  - アイコン取得関数

### Locales（多言語化層）

- **i18n.js**: i18next設定、日本語・英語の翻訳リソース

## 🚀 セットアップ

```bash
# プロジェクト作成
npx create-react-app digital-archive-map
cd digital-archive-map

# 依存パッケージのインストール
npm install react-leaflet leaflet i18next react-i18next --legacy-peer-deps
npm install --save-dev gh-pages --legacy-peer-deps
```

## 📝 package.json設定

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

### 1. 地図インタラクション
- OpenStreetMapベースの地図表示
- 地図クリックでポイント追加
- マーカークリックで詳細表示

### 2. データ管理
- アーカイブの追加、削除
- LocalStorageへの自動保存
- データのバリデーション

### 3. 多言語対応
- 日本語・英語の切り替え
- i18nextによる翻訳管理

### 4. データタイプ
- 3D Scan（青）
- Photo（緑）
- Video（赤）
- Document（オレンジ）
- Audio（紫）

### 5. フッター
- プロジェクト情報
- 問い合わせ先（メール、GitHub、ドキュメント）
- リソースリンク（ユーザーガイド、FAQ、プライバシーポリシー、利用規約）
- 著作権情報とバージョン表示

## 🛠️ 開発

```bash
# 開発サーバー起動
npm start

# ビルド
npm run build

# GitHub Pagesへデプロイ
npm run deploy
```

## 🔧 拡張可能性

### 容易に追加できる機能

1. **バックエンド連携**
   - `archiveService.js`を修正してAPI呼び出しに変更

2. **データフィルタリング**
   - `filterArchivesByType`関数を活用

3. **エクスポート/インポート**
   - `exportArchives`、`importArchives`関数を使用

4. **3Dビューアー統合**
   - 新しいコンポーネントを追加

5. **画像アップロード**
   - `ArchiveForm.jsx`にファイル入力を追加

## 📱 レスポンシブ対応

- デスクトップ: サイドバー + 地図の横並び
- モバイル: サイドバーと地図の縦並び
- タブレット: 自動調整

## 🎨 デザインシステム

### カラーパレット
- Primary: #3498db（青）
- Success: #27ae60（緑）
- Danger: #e74c3c（赤）
- Dark: #2c3e50
- Light: #f5f6fa

### タイポグラフィ
- システムフォントスタック
- モノスペースフォント（座標表示用）

## 🔐 データの永続化

現在はLocalStorageを使用。将来的には：
- IndexedDB（大容量データ）
- REST API（バックエンド連携）
- Firebase（リアルタイム同期）

## 📧 問い合わせ

- Email: contact@archivemap.example.com
- GitHub: https://github.com/yourusername/digital-archive-map
- Documentation: https://docs.archivemap.example.com

## 📄 ライセンス

MIT License