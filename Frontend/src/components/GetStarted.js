import React from "react";
import { motion } from "framer-motion";
import "./GetStarted.css";

const Section = () => {
  return (
    <motion.div
      className="section-container"
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }} 
      viewport={{ once: false }} 
    >
      <motion.div className="content">
        <motion.h1
          className="title"
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          تعلم بذكاء، تفوق بتقنية
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          نهدف لتحويل التحديات الأكاديمية إلى إنجازات ملموسة
        </motion.p>

        <motion.p
          className="description"
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          كلنا عارفين اكبر مشكله تواجهه الطلاب وش؟ اكيد التسويف والتشتت، منصة قصارى هنا عشان نساعدك. كل شي تحتاجه في مكان واحد.
        </motion.p>

        <motion.button
          className="cta-button"
          initial={{ scale: 0 }} 
          whileInView={{ scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          يلا نبدأ؟
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Section;
