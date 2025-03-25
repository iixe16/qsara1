import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();  
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,  
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage('');
      } else {
        setErrorMessage(data.error || 'حدث خطأ أثناء إعادة تعيين كلمة المرور.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('حدث خطأ في الشبكة. حاول مرة أخرى.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="reset-container">
      <form onSubmit={handleSubmit} className="reset-form">
        <h2>إعادة تعيين كلمة المرور</h2>
        <div className="input-box">
          <input
            type="password"
            name="newPassword"
            placeholder="كلمة المرور الجديدة"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="confirmPassword"
            placeholder="تأكيد كلمة المرور الجديدة"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="reset-button">إعادة تعيين كلمة المرور</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;
