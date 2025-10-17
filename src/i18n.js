import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ja: {
    translation: {
      title: 'デジタルアーカイブマップ',
      archiveList: 'アーカイブ一覧',
      addPoint: 'ポイント追加',
      addPointMode: 'ポイント追加モード',
      clickMapToAdd: '地図をクリックしてポイントを追加',
      newArchive: '新しいアーカイブ',
      newPoint: '新しいポイント',
      titleJa: 'タイトル（日本語）',
      titleEn: 'タイトル（英語）',
      descriptionJa: '説明（日本語）',
      descriptionEn: '説明（英語）',
      address: '住所',
      coordinates: '座標',
      dataType: 'データタイプ',
      dataLinks: 'データリンク',
      date: '日付',
      lastUpdated: '更新日',
      save: '保存',
      cancel: 'キャンセル',
      zoomTo: '表示',
      delete: '削除',
      confirmDelete: 'このアーカイブを削除しますか？',
      totalArchives: '総アーカイブ数',
      noArchives: 'アーカイブがありません',
      loading: '読み込み中...',
      loadError: 'データの読み込みに失敗しました',
      addNewArchive: '新しいアーカイブを追加',
      location: '位置情報',
      basicInfo: '基本情報',
      nameJa: '名前（日本語）',
      nameEn: '名前（英語）',
      addressJa: '住所（日本語）',
      addressEn: '住所（英語）',
      addLink: 'リンクを追加',
      linkType: 'リンクタイプ',
      url: 'URL',
      linkDescriptionJa: 'リンク説明（日本語）',
      linkDescriptionEn: 'リンク説明（英語）',
      downloadJson: 'JSONをダウンロード',
      footer: {
        about: 'について',
        description: 'デジタルアーカイブマップは、3Dスキャンや写真などのデータを地図上で管理・共有するためのプラットフォームです。',
        contact: 'お問い合わせ',
        documentation: 'ドキュメント',
        resources: 'リソース',
        userGuide: 'ユーザーガイド',
        faq: 'よくある質問',
        privacy: 'プライバシーポリシー',
        terms: '利用規約',
        copyright: 'Digital Archive Map. All rights reserved.'
      }
    }
  },
  en: {
    translation: {
      title: 'Digital Archive Map',
      archiveList: 'Archive List',
      addPoint: 'Add Point',
      addPointMode: 'Add Point Mode',
      clickMapToAdd: 'Click on the map to add a point',
      newArchive: 'New Archive',
      newPoint: 'New Point',
      titleJa: 'Title (Japanese)',
      titleEn: 'Title (English)',
      descriptionJa: 'Description (Japanese)',
      descriptionEn: 'Description (English)',
      address: 'Address',
      coordinates: 'Coordinates',
      dataType: 'Data Type',
      dataLinks: 'Data Links',
      date: 'Date',
      lastUpdated: 'Last Updated',
      save: 'Save',
      cancel: 'Cancel',
      zoomTo: 'Zoom',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete this archive?',
      totalArchives: 'Total Archives',
      noArchives: 'No archives',
      loading: 'Loading...',
      loadError: 'Failed to load data',
      addNewArchive: 'Add New Archive',
      location: 'Location',
      basicInfo: 'Basic Information',
      nameJa: 'Name (Japanese)',
      nameEn: 'Name (English)',
      addressJa: 'Address (Japanese)',
      addressEn: 'Address (English)',
      addLink: 'Add Link',
      linkType: 'Link Type',
      url: 'URL',
      linkDescriptionJa: 'Link Description (Japanese)',
      linkDescriptionEn: 'Link Description (English)',
      downloadJson: 'Download JSON',
      footer: {
        about: 'About',
        description: 'Digital Archive Map is a platform for managing and sharing digital archives such as 3D scans and photos on an interactive map.',
        contact: 'Contact',
        documentation: 'Documentation',
        resources: 'Resources',
        userGuide: 'User Guide',
        faq: 'FAQ',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        copyright: 'Digital Archive Map. All rights reserved.'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja',
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;