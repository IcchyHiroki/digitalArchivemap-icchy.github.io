import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AddArchiveModal.css';

/**
 * Web UIからアーカイブを追加するモーダル
 */
const AddArchiveModal = ({ isOpen, position, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nameJa: '',
    nameEn: '',
    descriptionJa: '',
    descriptionEn: '',
    addressJa: '',
    addressEn: '',
    dataType: '3D',
    dataLinks: [{ type: '3D Model', url: '', descriptionJa: '', descriptionEn: '' }]
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...formData.dataLinks];
    newLinks[index][field] = value;
    setFormData(prev => ({ ...prev, dataLinks: newLinks }));
  };

  const addLink = () => {
    setFormData(prev => ({
      ...prev,
      dataLinks: [...prev.dataLinks, { type: 'Photo', url: '', descriptionJa: '', descriptionEn: '' }]
    }));
  };

  const removeLink = (index) => {
    setFormData(prev => ({
      ...prev,
      dataLinks: prev.dataLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const archive = {
      id: `archive-${Date.now()}`,
      name: {
        ja: formData.nameJa,
        en: formData.nameEn
      },
      description: {
        ja: formData.descriptionJa,
        en: formData.descriptionEn
      },
      address: {
        ja: formData.addressJa,
        en: formData.addressEn
      },
      coordinates: {
        latitude: position.lat,
        longitude: position.lng
      },
      dataType: formData.dataType,
      dataLinks: formData.dataLinks
        .filter(link => link.url)
        .map(link => ({
          type: link.type,
          url: link.url,
          description: {
            ja: link.descriptionJa,
            en: link.descriptionEn
          }
        })),
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    onSubmit(archive);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t('addNewArchive')}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="archive-form">
          <div className="form-section">
            <h3>{t('location')}</h3>
            <div className="coordinates-display">
              <span>📍 Lat: {position?.lat.toFixed(6)}</span>
              <span>Lng: {position?.lng.toFixed(6)}</span>
            </div>
          </div>

          <div className="form-section">
            <h3>{t('basicInfo')}</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>{t('nameJa')} *</label>
                <input
                  type="text"
                  value={formData.nameJa}
                  onChange={(e) => handleChange('nameJa', e.target.value)}
                  placeholder="例: 東京タワー"
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('nameEn')} *</label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => handleChange('nameEn', e.target.value)}
                  placeholder="e.g. Tokyo Tower"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('descriptionJa')} *</label>
                <textarea
                  value={formData.descriptionJa}
                  onChange={(e) => handleChange('descriptionJa', e.target.value)}
                  placeholder="説明を入力..."
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('descriptionEn')} *</label>
                <textarea
                  value={formData.descriptionEn}
                  onChange={(e) => handleChange('descriptionEn', e.target.value)}
                  placeholder="Enter description..."
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{t('addressJa')} *</label>
                <input
                  type="text"
                  value={formData.addressJa}
                  onChange={(e) => handleChange('addressJa', e.target.value)}
                  placeholder="例: 東京都港区..."
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('addressEn')} *</label>
                <input
                  type="text"
                  value={formData.addressEn}
                  onChange={(e) => handleChange('addressEn', e.target.value)}
                  placeholder="e.g. Minato-ku, Tokyo"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>{t('dataType')} *</label>
              <select
                value={formData.dataType}
                onChange={(e) => handleChange('dataType', e.target.value)}
              >
                <option value="3D">3D Scan</option>
                <option value="Photo">Photo</option>
                <option value="Video">Video</option>
                <option value="Document">Document</option>
                <option value="Audio">Audio</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>{t('dataLinks')}</h3>
              <button type="button" onClick={addLink} className="btn-add-link">
                + {t('addLink')}
              </button>
            </div>

            {formData.dataLinks.map((link, index) => (
              <div key={index} className="link-group">
                <div className="link-header">
                  <span>Link {index + 1}</span>
                  {formData.dataLinks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="btn-remove-link"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t('linkType')}</label>
                    <select
                      value={link.type}
                      onChange={(e) => handleLinkChange(index, 'type', e.target.value)}
                    >
                      <option value="3D Model">3D Model</option>
                      <option value="Photo">Photo</option>
                      <option value="Video">Video</option>
                      <option value="Document">Document</option>
                      <option value="Audio">Audio</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t('url')}</label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t('linkDescriptionJa')}</label>
                    <input
                      type="text"
                      value={link.descriptionJa}
                      onChange={(e) => handleLinkChange(index, 'descriptionJa', e.target.value)}
                      placeholder="リンクの説明"
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('linkDescriptionEn')}</label>
                    <input
                      type="text"
                      value={link.descriptionEn}
                      onChange={(e) => handleLinkChange(index, 'descriptionEn', e.target.value)}
                      placeholder="Link description"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              {t('cancel')}
            </button>
            <button type="submit" className="btn-submit">
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArchiveModal;