import React from "react";
import Header from "../Component/Layout/Header/Header";
import Carousal from "../Component/Layout/carousel/Carousal";
import { Outlet } from "react-router-dom";
import LotteryCard from "../Component/Layout/Card/LotteryCard";
import HeroSection from "../Component/Layout/Herosection/HeroSection";
import Footer from "../Component/Layout/footer/Footer";

function DefaultLayout() {
  return (
    <>
      <div className="w-full">
        <Header />
      </div>
      <div className="w-full relative top-24">
        <HeroSection />
        <Carousal />
        <LotteryCard />
        <Outlet />
      </div>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4901126073119757" crossorigin="anonymous"></script>
      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}

export default DefaultLayout;
