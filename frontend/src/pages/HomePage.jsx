import React from "react";
import HeroSection from "../Components/HeroSection";
import CoursesSection from "../Components/CoursesSection";
import CertificateSection from "../Components/CertificateSection";
import Features from "../Components/Features";
import StartLearningSection from "../Components/StartLearningSection";
import Instructor from "../Components/Instructor";
import FooterComponents from "../Components/FooterComponents";

function HomePage() {
  return (
    <>
      <HeroSection />
      <CoursesSection />
      <CertificateSection />
      <Features />
      <StartLearningSection />
      <Instructor />
      {/* <FooterComponents /> */}
    </>
  );
}

export default HomePage;