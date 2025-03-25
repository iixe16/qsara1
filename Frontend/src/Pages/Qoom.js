import { useEffect } from "react";

function Qoom() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    const startSession = async () => {
      try {
        await fetch("https://qsara-backend.onrender.com/api/user/start-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pageName: "Qoom" }),
        });
      } catch (error) {
        console.error("❌ فشل في بدء جلسة Qoom:", error);
      }
    };

    const endSession = async () => {
      try {
        await fetch("http://localhost:5000/api/user/end-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("❌ فشل في إنهاء جلسة Qoom:", error);
      }
    };

    // نسجل الجلسة
    startSession();

    // نسجل نهاية الجلسة عند مغادرة الصفحة أو تحديثها
    window.addEventListener("beforeunload", endSession);

    // نحوله لواجهة Qoom بعد لحظة
    const timeout = setTimeout(() => {
      window.location.assign("https://qoom-244v.vercel.app/");
    }, 500); // نصف ثانية قبل التحويل

    // ننظف المستمع عند الخروج
    return () => {
      window.removeEventListener("beforeunload", endSession);
      endSession();
      clearTimeout(timeout);
    };
  }, []);

  return null;
}

export default Qoom;