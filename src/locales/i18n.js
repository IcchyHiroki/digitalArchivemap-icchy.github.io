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
      coordinates: '座標',
      dataType: 'データタイプ',
      date: '日付',
      save: '保存',
      cancel: 'キャンセル',
      zoomTo: '表示',
      delete: '削除',
      confirmDelete: 'このアーカイブを削除しますか？',
      totalArchives: '総アーカイブ数',
      noArchives: 'アーカイブがありません。地図をクリックして追加してください。',
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
      coordinates: 'Coordinates',
      dataType: 'Data Type',
      date: 'Date',
      save: 'Save',
      cancel: 'Cancel',
      zoomTo: 'Zoom',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete this archive?',
      totalArchives: 'Total Archives',
      noArchives: 'No archives yet. Click on the map to add one.',
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