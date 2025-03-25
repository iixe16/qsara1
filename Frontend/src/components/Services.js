import React from "react";
import { motion } from "framer-motion";
import "./Services.css";
import serviceImage1 from "../assets/serviceImage1.png";
import serviceImage2 from "../assets/serviceImage2.png";
import serviceImage3 from "../assets/serviceImage3.png";
import serviceImage4 from "../assets/serviceImage4.png";

function Services() {
    return (
        <section className="services">
            <h2 className="services__title">خدماتنا</h2>
            <div className="services__container">
                {[serviceImage1, serviceImage2, serviceImage3, serviceImage4].map((image, index) => (
                    <motion.div
                        key={index}
                        className="service"
                        initial={{ opacity: 0, y: 50 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5, delay: index * 0.2 }} 
                        viewport={{ once: false, amount: 0.3 }} 
                    >
                        <img src={image} alt={`serviceImage${index + 1}`} className="service__image" />
                        <p className="service__description">
                            {[ 
                                "موفرين لكم غرف دراسيه تدرسون مع بعض في مده محدده مع مميزات عديده",
                                "هنا نوفر لك بطاقات التذكر عشان تساعدك في حفظ وتذكر المعلومات بشكل اسرع ",
                                "يمكنك التحدث مع الذكاء الاصطناعي وسؤاله عن اي شي تحتاجه",
                                "مستواك الدراسي يهمك ويهمنا عشان كذا وفرنا  تحليل مستواك الدراسي ويعطيك نصائح لتحسينه "
                            ][index]}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default Services;
