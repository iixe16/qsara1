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
        await fetch("https://qsara-backend.onrender.com/api/user/end-session", {
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

    window.addEventListener("beforeunload", endSession);

    const timeout = setTimeout(() => {
      window.location.assign("https://qoom-244v.vercel.app/");
    }); 
    return () => {
      window.removeEventListener("beforeunload", endSession);
      endSession();
      clearTimeout(timeout);
    };
  }, []);

  return null;
}

export default Qoom;