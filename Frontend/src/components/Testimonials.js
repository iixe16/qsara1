import React from "react";
import "./Testimonials.css";

function Testimonials() {
  return (
    <section className="testimonials">
      <h2 className="testimonials__title">آراء المستخدمين</h2>
      <div className="testimonials__container">
        <div className="testimonial">
          <p>"تجربة رائعة! ساعدني قُصارى على تحسين أدائي الأكاديمي بشكل ملحوظ."</p>
          <h4>- أحمد علي</h4>
        </div>
        <div className="testimonial">
          <p>"أحببت الميزات الذكية، تجربة تعلم ممتعة وفعالة!"</p>
          <h4>- فاطمة حسن</h4>
        </div>
        <div className="testimonial">
          <p>"منصة متميزة، سهولة في الاستخدام وتحليلات دقيقة."</p>
          <h4>- خالد محمود</h4>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;