import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/ForgotPassword.css';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
    securityQuestion: '',
    securityAnswer: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;,.<>?]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("كلمة المرور وتأكيد كلمة المرور غير متطابقتين.");
      return;
    }
  
    if (!validatePassword(formData.newPassword)) {
      setErrorMessage("كلمة السر يجب أن تحتوي على الأقل على 8 أحرف، وتحتوي على حرف كبير، وحرف صغير، ورقم، ورمز خاص.");
      return;
    }
  
    try {
      const response = await fetch('https://qsara-backend.onrender.com/api/reset-password-security', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccessMessage("تم تغيير كلمة المرور بنجاح.");
  
        // تأخير الانتقال إلى صفحة تسجيل الدخول بناءً على التأخير المرسل من السيرفر
        const delay = data.delay || 3000; // استخدام تأخير السيرفر أو تأخير 3 ثوانٍ افتراضي
        setTimeout(() => navigate('/'), delay);
      } else {
        setErrorMessage(data.error || 'حدث خطأ أثناء تغيير كلمة المرور.');
      }
    } catch (error) {
      setErrorMessage('حدث خطأ في الاتصال.');
    }
  };
  

  return (
    <div className="signup-container">
      <div className="left-section">
        {/* يمكنك إضافة أي محتوى هنا في الجزء الأيسر */}
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>إعادة تعيين كلمة المرور</h2>
          
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          
          <p className="for-p">
            إذا كنت قد نسيت كلمة المرور، يرجى إدخال البريد الإلكتروني الخاص بك وسؤال الأمان وإجابته.
          </p>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="securityQuestion"
              placeholder="سؤال الأمان"
              value={formData.securityQuestion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="securityAnswer"
              placeholder="إجابة سؤال الأمان"
              value={formData.securityAnswer}
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="تأكيد كلمة المرور"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="forgot-button">تغيير كلمة المرور</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
