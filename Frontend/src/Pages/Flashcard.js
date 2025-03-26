import React, { useEffect } from 'react';

function Flashcard() {
  useEffect(() => {
    const token = localStorage.getItem('token');

    const startSession = async () => {
      try {
        await fetch('https://qsara-backend.onrender.com/api/user/start-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ pageName: 'Flashcard' })
        });
        console.log("✅ تم بدء جلسة الفلاش كارد");
      } catch (error) {
        console.error("❌ فشل في بدء جلسة الفلاش كارد:", error);
      }
    };

    const endSession = async () => {
      try {
        await fetch('https://qsara-backend.onrender.com/api/user/end-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        console.log("✅ تم إنهاء جلسة الفلاش كارد");
      } catch (error) {
        console.error("❌ فشل في إنهاء جلسة الفلاش كارد:", error);
      }
    };

    startSession();
    window.addEventListener("beforeunload", endSession); 

    return () => {
      endSession();
      window.removeEventListener("beforeunload", endSession);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", border: "none" }}>
      <iframe
        src="https://flashcard-6043c.web.app/"
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
        title="Flashcard App"
      />
    </div>
  );
}

export default Flashcard;
