import React, { useState } from 'react';
import '../style/Login.css';
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa6";

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
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
    
   
    if (!validatePassword(formData.password)) {
      setErrorMessage("كلمة السر يجب أن تحتوي على الأقل على 8 أحرف، وتحتوي على حرف كبير، وحرف صغير، ورقم، ورمز خاص.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("كلمتا السر غير متطابقتين.");
      return;
    }

    
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        
        navigate('/login');
      } else {
        
        setErrorMessage(data.error || 'حدث خطأ أثناء التسجيل.');
      }
    } catch (error) {
      console.error('خطأ في الاتصال:', error);
      setErrorMessage('حدث خطأ في الاتصال.');
    }
  };

  return (
    <div className="signup-container">
      <div className="left-section">
        
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>إنشاء حساب</h2>
          
          {errorMessage && <p className="error-message">{errorMessage}</p>} 
          
          <div className="input-box">
            <FaEnvelope className="input-icon" />
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
            <FaLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'} 
              name="password"
              placeholder="كلمة المرور"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className="password-eye">
              {showPassword ? <FaEye /> : <FaEyeSlash />} 
            </span>
          </div>
          <div className="input-box">
            <input
              type={showPassword ? 'text' : 'password'} 
              name="confirmPassword"
              placeholder="تأكيد كلمة المرور"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className="password-eye">
              {showPassword ? <FaEye /> : <FaEyeSlash />} 
            </span>
          </div>
          <div className="input-box">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="اسم المستخدم"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
         
          <div className="input-box">
            <input
              type="text"
              name="securityQuestion"
              placeholder="السؤال الأمني"
              value={formData.securityQuestion}
              onChange={handleChange}
              required
            />
          </div>
          
   
          <div className="input-box">
            <input
              type="text"
              name="securityAnswer"
              placeholder="الإجابة على السؤال الأمني"
              value={formData.securityAnswer}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">
            إنشاء حساب
          </button>
          <p>لديك حساب بالفعل؟ <Link to="/">تسجيل دخول</Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
