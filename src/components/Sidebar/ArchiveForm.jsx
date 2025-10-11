import React from 'react';
import { useTranslation } from 'react-i18next';
import { dataTypes } from '../../utils/mapIcons';
import './ArchiveForm.css';

/**
 * アーカイブ作成・編集フォーム
 * @param {Object} formData - フォームデータ
 * @param {Object} tempMarker - 一時マーカーの座標
 * @param {Function} onChange - フォーム変更ハンドラ
 * @param {Function} onSubmit - フォーム送信ハンドラ
 * @param {Function} onCancel - キャンセルハンドラ
 */
const ArchiveForm = ({ 
  formData, 
  tempMarker, 
  onChange, 
  onSubmit, 
  onCancel 
}) => {
  const { t } = useTranslation();

  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h3>{t('newArchive')}</h3>
      <form onSubmit={handleSubmit}>
        {tempMarker && (
          <div className="form-group">
            <label>{t('coordinates')}</label>
            <div className="coordinates">
              <span>Lat: {tempMarker.lat.toFixed(6)}</span>
              <span>Lng: {tempMarker.lng.toFixed(6)}</span>
            </div>
          </div>
        )}

        <div className="form-group">
          <label>{t('titleJa')} *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
            placeholder="例：東京タワー"
          />
        </div>

        <div className="form-group">
          <label>{t('titleEn')} *</label>
          <input
            type="text"
            value={formData.titleEn}
            onChange={(e) => handleChange('titleEn', e.target.value)}
            required
            placeholder="e.g. Tokyo Tower"
          />
        </div>

        <div className="form-group">
          <label>{t('descriptionJa')} *</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            required
            placeholder="説明を入力してください"
          />
        </div>

        <div className="form-group">
          <label>{t('descriptionEn')} *</label>
          <textarea
            value={formData.descriptionEn}
            onChange={(e) => handleChange('descriptionEn', e.target.value)}
            required
            placeholder="Enter description"
          />
        </div>

        <div className="form-group">
          <label>{t('dataType')} *</label>
          <select
            value={formData.dataType}
            onChange={(e) => handleChange('dataType', e.target.value)}
          >
            {dataTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t('date')}</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {t('save')}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            {t('cancel')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArchiveForm;