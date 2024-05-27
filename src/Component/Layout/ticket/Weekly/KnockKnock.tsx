import React, { useRef, useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, db } from '../../../../firebase/Firebase';
import { doc, updateDoc, Timestamp, collection, query, where, getDocs, getDoc } from "firebase/firestore";
import PropTypes from 'prop-types';
import { useAuthState } from 'react-firebase-hooks/auth';
import KnockTicket from '../../../../../public/TicketImages/WeeklyTicket/Knockknock.jpg';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

interface MintedMillionsProps {
  selectedNumbers: number[];
  ticketCode: number;
}

const MintedMillions: React.FC<MintedMillionsProps> = ({ selectedNumbers, ticketCode }) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState<firebase.User | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [user] = useAuthState(auth);
  const [purchased, setPurchased] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (user) {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setBalance(doc.data().balance);
          });
        } catch (err) {
          console.error("Failed to fetch user balance:", err);
        }
      }
    };

    fetchUserBalance();
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user);
      } else {
        setUserName(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const storage = getStorage();

  const currentDate = new Date().toLocaleDateString();

  const downloadTicket = async () => {
    if (balance >= 299) {
      try {
        setPurchased(true);
        const ticketElement = ticketRef.current;
        if (!ticketElement) return;

        const canvas = await html2canvas(ticketElement);
        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve));
        if (!blob) return;

        const currentTime = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
        const ticketImageRef = ref(storage, `${userName.uid}/${userName.uid}_${currentTime}.png`);
        await uploadBytes(ticketImageRef, blob);

        const buyersListRef = doc(db, "Weekly", "Knock Knock");
        const buyersDoc = await getDoc(buyersListRef);
        let newTotal = 299;

        if (buyersDoc.exists()) {
          newTotal = (buyersDoc.data().total || 0) + 299;
        }

        const timestamp = Timestamp.fromDate(new Date());

        const updateData = {
          [timestamp.toMillis()]: userName?.email,
          total: newTotal,
          tickets: firebase.firestore.FieldValue.arrayUnion(ticketCode),
          [ticketCode]: userName?.email
        };

        await updateDoc(buyersListRef, updateData);
      } catch (error) {
        console.error("Error handling the download and data update:", error);
      }
      const newBalance = balance - 299;
      setBalance(newBalance);

      const q = query(collection(db, 'users'), where('uid', '==', userName.uid));
      const querySnapshot = await getDocs(q);
      const updatePromises: Promise<void>[] = [];

      querySnapshot.forEach((docSnapshot) => {
        const docRef = docSnapshot.ref;
        updatePromises.push(updateDoc(docRef, { balance: newBalance }));
      });
      await Promise.all(updatePromises);
    }
    else {
      alert("Please Recharge")
    }
  };

  function getNextWeekDate() {
    const currentDate = new Date();
    const nextWeekDate = new Date(currentDate);
    nextWeekDate.setDate(currentDate.getDate() + 7);
    const formattedDate = nextWeekDate.toLocaleDateString('en-GB');
    return formattedDate;
  }

  return (
    <>
      <div className='tref w-[400px] absolute left-0 sm:w-1/2  flex flex-col items-center mt-[60px] ' ref={ticketRef}>
      <div className='w-full h-[130px]'
          style={{
            backgroundImage: `url(${KnockTicket})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>
          <p className="text-[7px] font-black relative top-[119px] left-20">{selectedNumbers.join(' , ')}</p>
          <p className="text-[8px] relative top-[108px] text-center left-20">KK{ticketCode}</p>
          <p className="text-[8px] absolute left-[315px] top-6 text-white">KK{ticketCode}</p>
          <p className="text-[10px] text-white mt-[75px] ml-8"><span className="archivo-black-regular">{currentDate}</span> </p>
 
        </div>
        <p className='text-[10px] text-white relative -top-8 left-16 '>{getNextWeekDate()}</p>

        <div className="flex-col justify-center items-center w-max h-max relative -top-[92px] -right-[140px]">
            <QRCode value={ticketCode.toString()} size={50} />
          </div> 
          
      </div>
      <div className="absolute top-72 left-20">
      {purchased ? ( // If ticket is purchased
          <button className="bg-gray-400 text-white font-bold py-2 px-4 ml-6 rounded-lg shadow-lg" disabled>
            Purchased
          </button>
        ) : ( // If ticket is not purchased
          <button onClick={downloadTicket} className="bg-yellow-300 hover:bg-yellow-400 text-blue-800 font-bold py-2 px-4 ml-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            Buy now
          </button>
        )}
      </div>
    </>
  );
};

MintedMillions.propTypes = {
  selectedNumbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  ticketCode: PropTypes.number.isRequired,
};

export default MintedMillions;