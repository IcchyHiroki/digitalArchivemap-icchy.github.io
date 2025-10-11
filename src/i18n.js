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
      totalArchives: '総アーカイブ数'
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
      totalArchives: 'Total Archives'
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