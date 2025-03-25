import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlashCardChart from '../components/FlashCardChart';
import PieSessionsChart from '../components/PieSessionsChart';
import TimeBarChart from '../components/TimeBarChart';
import StatsCards from '../components/StatsCards';
import StudyPlan from '../components/StudyPlan';
import Achievements from '../components/Achievements';
import AreaSessionChart from '../components/AreaSessionChart';
import SmartInsights from '../components/SmartInsights';
import '../style/profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn("لا يوجد توكن مخزن، إعادة التوجيه إلى تسجيل الدخول...");
          return;
        }

        const res = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(res.data);
      } catch (error) {
        console.error("❌ خطأ أثناء تحميل البروفايل:", error);
        setError('تعذر تحميل بيانات البروفايل. يرجى المحاولة لاحقًا.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const toggleMode = () => {
    setDarkMode(prev => !prev);
  };

  if (loading) return <div className="loading">جاري التحميل...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!userData) return <div className="error">تعذر تحميل بيانات المستخدم.</div>;

  return (
    <div className={`profile-dashboard-container ${darkMode ? 'dark' : 'light'}`} style={{ fontFamily: 'Cairo, sans-serif' }}>
      <div className="header" style={{ textAlign: 'right' }}>
        <div className="header-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <h2 style={{ margin: '0 0 10px 0' }}>مرحبًا {userData.name}</h2>
          <button className="toggle-btn" onClick={toggleMode}>
            {darkMode ? '☀️ الوضع الفاتح' : '🌙 الوضع الداكن'}
          </button>
        </div>
        <h3 style={{ color: '#9ca3af' }}>لوحة التحكم</h3>
      </div>

      <StatsCards sessions={userData.sessions || []} />

      <div className="grid-section">
        <div className="chart-card">
          <FlashCardChart sessions={userData.sessions || []} />
        </div>
        <div className="chart-card">
          <PieSessionsChart sessions={userData.sessions || []} />
        </div>
        <div className="chart-card">
          <AreaSessionChart sessions={userData.sessions || []} />
        </div>
        <div className="chart-card full-width">
          <TimeBarChart sessions={userData.sessions || []} />
        </div>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <button className="toggle-btn" onClick={() => setShowInsights(!showInsights)}>
          {showInsights ? 'إخفاء التحليل الذكي' : '🔍 عرض التحليل الذكي'}
        </button>
      </div>

      {showInsights && <SmartInsights sessions={userData.sessions || []} />}

      <StudyPlan sessions={userData.sessions || []} />

      <Achievements sessions={userData.sessions || []} />
    </div>
  );
};

export default Profile;
