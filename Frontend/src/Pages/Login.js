import React, { useState } from 'react'; 
import '../style/Login.css';
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage('يرجى إدخال بريد إلكتروني صالح.');
      return;
    }

    
    if (!formData.password) {
      setErrorMessage('يرجى إدخال كلمة مرور.');
      return;
    }

    try {
      const response = await fetch('https://qsara-backend.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData); 
        setErrorMessage(errorData.error || 'البريد الالكتروني او كلمة السر غير صحيحة');
        return;
      }
    
      const data = await response.json();
if (data.token) {
  localStorage.setItem('token', data.token);
  navigate('/Home');
} else {
  setErrorMessage('لم يتم استقبال التوكن، تحقق من السيرفر.');
}

    } catch (error) {
      console.error("Network error:", error); 
      setErrorMessage('حدث خطأ في الشبكة. حاول مرة أخرى.');
    }
  };    

  return (
    <div className="signup-container">
      <div className="left-section">
        
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>تسجيل دخول</h2>

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

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <Link to="/ForgotPassword">
            <p className="log-p">هل نسيت كلمة السر؟</p>
          </Link>
          <button type="submit">تسجيل دخول</button>
          <p>لديك حساب بالفعل؟ <Link to="/SignUp">انشاء حساب</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
