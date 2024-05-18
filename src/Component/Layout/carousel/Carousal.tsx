import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../../firebase/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import './carousal.css';

interface LotteryData {
  id: string;
  result: string;
}

const LotteryCarousel: React.FC = () => {
 const [lotteryData, setLotteryData] = useState<LotteryData[]>([]);
 const carouselRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
    const fetchData = async () => {
      const collections = ['Monthly Result', 'Weekly Result', 'Daily Result'];
      let allData: LotteryData[] = [];

      for (const collectionName of collections) {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          result: doc.data().result
        }));
        allData = [...allData, ...data];
      }

      const duplicatedData = [...allData, ...allData,...allData,...allData];
      setLotteryData(duplicatedData);
    };

    fetchData();
 }, []);

 useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollInterval = setInterval(() => {
        if (carousel.scrollLeft !== null) {
          carousel.scrollLeft += 1;
          if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
            carousel.scrollLeft = carousel.scrollWidth / 2;
          }
        }
      }, 30);

      return () => clearInterval(scrollInterval);
    }
 }, [lotteryData]);

 return (
    <div className="slide carousel overflow-x-hidden flex p-4" ref={carouselRef}>
      {lotteryData.map((game, index) => (
        <div key={index} className="smallCard -mt-2 carousel-item flex-shrink-0 w-72 mr-4 p-4 bg-gradient-to-tr from-blue-600 via-blue-200 to-blue-500 rounded-md hover:scale-105 shadow-xl">
          <h3 className="text-xl font-bold mb-2 text-center">{game.id}</h3>
          <p className="text-gray-700 font-medium text-center">Result: {game.result}</p>
        </div>
      ))}
    </div>
 );
};

export default LotteryCarousel;
