import React from 'react';
import { motion } from 'framer-motion';  // استيراد مكتبة framer-motion
import './Hero.css';
import backgroundImage from '../assets/background.png'; 
import Header from './Header';

const HeroSection = () => {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Header />
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 50 }}  
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}  
        >
          <span className="line1">تجربة مختلفة</span>
          <span className="line2">للدراسه مع</span>
        </motion.h1>
        
        <motion.h2
          className="hero-subtitle"
          initial={{ opacity: 0, y: 50 }}  
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}  
        >
          قُصَارى
        </motion.h2>
      </div>
    </section>
  );
};

export default HeroSection;
