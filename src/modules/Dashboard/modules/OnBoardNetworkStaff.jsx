import { useState } from 'react';
import styles from './OnBoardNetworkStaff.module.css';

export default function OnBoardNetworkStaff({ onSuccess }) {
  const [form, setForm] = useState({
    nin: '',
    phone: '',
  });
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [staffData, setStaffData] = useState(null);
  const [verifyError, setVerifyError] = useState('');

  const setField = (name, value) => {
    setForm(p => ({ ...p, [name]: value }));
    setTouched(p => ({ ...p, [name]: true }));
    setVerifyError('');
  };

  const getError = (name) => {
    if (!touched[name] && !submitted) return null;
    switch (name) {
      case 'nin':
        if (!form.nin) return 'NIN is required';
        if (form.nin.length !== 11) return 'NIN must be 11 digits';
        return null;
      case 'phone':
        if (!form.phone) return 'Phone number is required';
        if (!/^\+?[\d\s-]{10,14}$/.test(form.phone)) return 'Enter a valid phone number';
        return null;
      default: return null;
    }
  };

  const isValid =
    form.nin.length === 11 &&
    /^\+?[\d\s-]{10,14}$/.test(form.phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setVerifyError('');
    if (!isValid) return;

    setIsLoading(true);
    // Simulate API call to verify staff member
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);

    const normalizedPhone = form.phone.replace(/\D/g, '');
    const found = form.nin === '11111111111' && normalizedPhone === '7777777777777777';

    if (!found) {
      setVerifyError('No matching staff member found. Please check your credentials and try again.');
      return;
    }

    // Mock staff data returned from API
    const mockStaff = {
      nin: form.nin,
      phone: form.phone,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      department: 'Engineering',
      role: 'Senior Developer',
      verified: true
    };

    setStaffData(mockStaff);
  };

  if (staffData) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.titleRow}>
          <div>
            <h2 className={styles.title}>Staff Member Found</h2>
            <p className={styles.subtitle}>
              Review the staff member details and confirm onboarding
            </p>
          </div>
        </div>

        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h3 className={styles.successTitle}>Verified</h3>
          
          <div className={styles.staffDetails}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Name</span>
              <span className={styles.detailValue}>{staffData.firstName} {staffData.lastName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Email</span>
              <span className={styles.detailValue}>{staffData.email}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Phone</span>
              <span className={styles.detailValue}>{staffData.phone}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>NIN</span>
              <span className={styles.detailValue}>{staffData.nin}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Department</span>
              <span className={styles.detailValue}>{staffData.department}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Role</span>
              <span className={styles.detailValue}>{staffData.role}</span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.confirmBtn} onClick={() => onSuccess?.(staffData)}>
              Confirm Onboarding
            </button>
            <button className={styles.backBtn} onClick={() => setStaffData(null)}>
              Search Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <div>
          <h2 className={styles.title}>Onboard Network Staff</h2>
          <p className={styles.subtitle}>
            Enter staff verification details to find and onboard network staff members as your employees
          </p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Verification Section */}
        <div className={styles.verificationBox}>
          <div className={styles.verificationHeader}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e07a7a" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span className={styles.verificationTitle}>Staff Identity Verification</span>
          </div>
          <p className={styles.verificationSubtitle}>
            Enter the NIN and phone number of the staff member you want to onboard
          </p>

          <div className={styles.fieldsGrid}>
            <div className={styles.field}>
              <label className={styles.label}>
                NIN (National Identification Number) <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${getError('nin') ? styles.inputError : touched.nin && form.nin ? styles.inputSuccess : ''}`}
                type="text"
                inputMode="numeric"
                placeholder="Enter 11-digit NIN"
                maxLength={11}
                value={form.nin}
                onChange={e => setField('nin', e.target.value.replace(/\D/g, ''))}
              />
              {getError('nin') && <span className={styles.errMsg}>{getError('nin')}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Phone Number <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${getError('phone') ? styles.inputError : touched.phone && form.phone ? styles.inputSuccess : ''}`}
                type="tel"
                placeholder="Enter phone number (e.g., +234 803 123 4567)"
                value={form.phone}
                onChange={e => setField('phone', e.target.value)}
              />
              {getError('phone') && <span className={styles.errMsg}>{getError('phone')}</span>}
            </div>
          </div>

          {verifyError && <div className={styles.verifyError}>{verifyError}</div>}

          <button
            type="submit"
            className={`${styles.verifyBtn} ${!isValid ? styles.verifyBtnDisabled : ''}`}
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Finding Staff Member…
              </>
            ) : (
              'Find and Verify Staff Member'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
