import React from "react";
import "./AnalysisSection.css";

function AnalysisSection() {
  return (
    <section className="analysis">
      <h2 className="analysis__title">تحليل الأداء الأكاديمي</h2>
      <p className="analysis__description">نوفر تحليلاً دقيقًا للأداء الأكاديمي للطلاب باستخدام الذكاء الاصطناعي.</p>
      <div className="analysis__stats">
        <div className="analysis__stat">
          <h3>85%</h3>
          <p>تحسين في الأداء الدراسي</p>
        </div>
        <div className="analysis__stat">
          <h3>95%</h3>
          <p>دقة التنبؤ بالنتائج</p>
        </div>
        <div className="analysis__stat">
          <h3>80%</h3>
          <p>زيادة التفاعل مع المحتوى</p>
        </div>
      </div>
    </section>
  );
}

export default AnalysisSection;