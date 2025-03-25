import React from "react";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import AnalysisSection from "../components/AnalysisSection";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import "../style/Home.css";
import GetStarted from "../components/GetStarted";

const Home = () => (
  <div className="bg-primary w-full overflow-hidden">
   
        <HeroSection />
        <GetStarted/>
        <Services />
        <Testimonials />
        <Footer />
      \
  </div>
);

export default Home;
