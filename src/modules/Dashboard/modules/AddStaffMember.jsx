import React, { useState, useRef } from 'react';
import styles from './AddStaffMember.module.css';

const NIGERIAN_BANKS = [
  'Access Bank', 'First Bank of Nigeria', 'GTBank', 'UBA', 'Zenith Bank',
  'Sterling Bank', 'Wema Bank', 'FCMB', 'Polaris Bank', 'Fidelity Bank',
  'Kuda Bank', 'Opay', 'Moniepoint', 'Palmpay',
];

function PhotoUploader({ photo, onPhotoChange, error }) {
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Only JPG and PNG files are accepted.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => onPhotoChange(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className={styles.photoSection}>
      <div
        className={`${styles.photoBox} ${error ? styles.photoBoxError : photo ? styles.photoBoxFilled : ''}`}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current.click()}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && inputRef.current.click()}
        aria-label="Upload profile photo"
      >
        {photo ? (
          <img src={photo} alt="Profile preview" className={styles.photoPreview} />
        ) : (
          <div className={styles.photoPlaceholder}>
            <div className={styles.photoIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#e07a7a" strokeWidth="1.5"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#e07a7a" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className={styles.photoRequiredText}>Photo Required*</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          className={styles.fileInput}
          onChange={e => handleFile(e.target.files[0])}
          aria-hidden="true"
        />
      </div>

      <button
        type="button"
        className={styles.uploadBtn}
        onClick={() => inputRef.current.click()}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 8v5M9 11l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {photo ? 'Change Photo' : 'Upload Photo'}
      </button>

      <p className={styles.photoHint}>
        Upload a passport-style photo (JPG, PNG, max 5MB). Photo should show head
        and shoulders clearly with plain background.
      </p>
    </div>
  );
}

export default function AddStaffMember({ onSuccess, onCancel }) {
  const [photo, setPhoto] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nin: '',
  });
  const [ninConfirmed, setNinConfirmed] = useState(false);
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (name, value) => {
    setForm(p => ({ ...p, [name]: value }));
    setTouched(p => ({ ...p, [name]: true }));
  };

  const getError = (name) => {
    if (!touched[name] && !submitted) return null;
    switch (name) {
      case 'firstName': return !form.firstName ? 'First name is required' : null;
      case 'lastName': return !form.lastName ? 'Last name is required' : null;
      case 'email':
        if (!form.email) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Enter a valid email';
        return null;
      case 'phone':
        if (!form.phone) return 'Phone number is required';
        if (!/^\+?[\d\s\-]{10,14}$/.test(form.phone)) return 'Enter a valid phone number';
        return null;
      case 'dateOfBirth': return !form.dateOfBirth ? 'Date of birth is required' : null;
      case 'nin':
        if (!form.nin) return 'NIN is required';
        if (form.nin.length !== 11) return 'NIN must be 11 digits';
        return null;
      default: return null;
    }
  };

  const isValid =
    photo &&
    form.firstName &&
    form.lastName &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    /^\+?[\d\s\-]{10,14}$/.test(form.phone) &&
    form.dateOfBirth &&
    form.nin.length === 11 &&
    ninConfirmed;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setIsLoading(false);
    onSuccess?.({ ...form, photo });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <div>
          <h2 className={styles.title}>Add New Staff Member</h2>
          <p className={styles.subtitle}>
            Register a new staff member to the network (role and department will be assigned during onboarding)
          </p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Photo */}
        <div className={styles.fieldGroup}>
          <label className={styles.sectionLabel}>
            Profile Picture (Passport Style) <span className={styles.req}>*</span>
          </label>
          <PhotoUploader
            photo={photo}
            onPhotoChange={setPhoto}
            error={submitted && !photo}
          />
          {submitted && !photo && (
            <span className={styles.errMsg}>Profile photo is required</span>
          )}
        </div>

        {/* Name Row */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>
              First Name <span className={styles.req}>*</span>
            </label>
            <input
              className={`${styles.input} ${getError('firstName') ? styles.inputError : touched.firstName && form.firstName ? styles.inputSuccess : ''}`}
              type="text"
              placeholder="Jone"
              value={form.firstName}
              onChange={e => setField('firstName', e.target.value)}
            />
            {getError('firstName') && <span className={styles.errMsg}>{getError('firstName')}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Last Name <span className={styles.req}>*</span>
            </label>
            <input
              className={`${styles.input} ${getError('lastName') ? styles.inputError : touched.lastName && form.lastName ? styles.inputSuccess : ''}`}
              type="text"
              placeholder="Doe"
              value={form.lastName}
              onChange={e => setField('lastName', e.target.value)}
            />
            {getError('lastName') && <span className={styles.errMsg}>{getError('lastName')}</span>}
          </div>
        </div>

        {/* Email + Phone */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              className={`${styles.input} ${getError('email') ? styles.inputError : touched.email && !getError('email') && form.email ? styles.inputSuccess : ''}`}
              type="email"
              placeholder="jone@gmail.com"
              value={form.email}
              onChange={e => setField('email', e.target.value)}
            />
            {getError('email') && <span className={styles.errMsg}>{getError('email')}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Phone Number <span className={styles.req}>*</span>
            </label>
            <input
              className={`${styles.input} ${getError('phone') ? styles.inputError : touched.phone && !getError('phone') && form.phone ? styles.inputSuccess : ''}`}
              type="tel"
              placeholder="123-456-7890"
              value={form.phone}
              onChange={e => setField('phone', e.target.value)}
            />
            {getError('phone') && <span className={styles.errMsg}>{getError('phone')}</span>}
          </div>
        </div>

        {/* DOB + NIN */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>
              Date of Birth <span className={styles.req}>*</span>
            </label>
            <input
              className={`${styles.input} ${getError('dateOfBirth') ? styles.inputError : touched.dateOfBirth && form.dateOfBirth ? styles.inputSuccess : ''}`}
              type="date"
              value={form.dateOfBirth}
              onChange={e => setField('dateOfBirth', e.target.value)}
              max={new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            />
            {getError('dateOfBirth') && <span className={styles.errMsg}>{getError('dateOfBirth')}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              NIN (National Identification Number) <span className={styles.req}>*</span>
            </label>
            <input
              className={`${styles.input} ${getError('nin') ? styles.inputError : touched.nin && form.nin.length === 11 ? styles.inputSuccess : ''}`}
              type="text"
              inputMode="numeric"
              placeholder="12345678901"
              maxLength={11}
              value={form.nin}
              onChange={e => setField('nin', e.target.value.replace(/\D/g, ''))}
            />
            {getError('nin') && <span className={styles.errMsg}>{getError('nin')}</span>}
          </div>
        </div>

        {/* NIN Confirmation Warning */}
        <label className={`${styles.ninWarning} ${ninConfirmed ? styles.ninWarningChecked : ''}`}>
          <div className={styles.ninCheckboxWrap}>
            <input
              type="checkbox"
              className={styles.ninCheckbox}
              checked={ninConfirmed}
              onChange={e => setNinConfirmed(e.target.checked)}
            />
          </div>
          <div className={styles.ninWarningContent}>
            <p className={styles.ninWarningTitle}>
              ⚠️ Important: Double-check NIN
            </p>
            <p className={styles.ninWarningText}>
              I confirm that I have double-checked the NIN number above for accuracy.{' '}
              <strong>This detail cannot be modified after submission without contacting admin, which will incur additional fees.</strong>
            </p>
          </div>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className={`${styles.submitBtn} ${!isValid ? styles.submitBtnDisabled : ''}`}
          disabled={!isValid || isLoading}
        >
          {isLoading ? (
            <>
              <span className={styles.spinner}></span>
              Adding Staff Member…
            </>
          ) : (
            'Add Staff Member to Network'
          )}
        </button>
      </form>
    </div>
  );
}