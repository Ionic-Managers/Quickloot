import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase/Firebase';
import { query, where, getDocs, collection } from 'firebase/firestore';
import Header from '../Header/Header';
import Footer from '../footer/Footer';
import Referral from '../refer/Referral';
import MyTickets from '../MyTickets/MyTickets';

interface UserData {
  uid: string;
  country: string;
  email: string;
  mobile: string;
  name: string;
  time: { seconds: number };
  recharge: number;
  withdrawal: number;
  referrals: number;
  balance: number;
}

const Profile = () => {
  const currentUser = auth.currentUser;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const q = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data() as UserData;
              setUserData(userData);
            });
          } else {
            console.log('User document not found.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [currentUser]);


  const toggleReferral = () => {
    setIsReferralOpen(!isReferralOpen);
  };

  const toggleTicket = () => {
    setIsTicketOpen(!isTicketOpen);
  };

  return (
    <>
      <Header />
      <div className='flex flex-col h-screen'> 
        <div className="profile-container flex-grow">
          <div className="flex flex-col md:flex-row gap-x-5 relative mt-16 md:bottom-0 md:left-0 md:w-full md:justify-center">
            <div>
              {userData ? (
                <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
                  <div className="flex flex-col items-center p-4">
                    <img className="w-24 h-24 object-cover rounded-full border-2 border-gray-300" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.audMX4ZGbvT2_GJTx2c4GgHaHw%26pid%3DApi%26h%3D160&f=1&ipt=f2242b90a29a42d6c1f1d89b54609df622438e6cb8ed92c6bcb21bbf5f2c6db4&ipo=images" alt="User" />
                    <div className="flex flex-col items-center">
                      <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                      <p className="text-base"><span className="font-bold text-gray-700">Joined:</span> {new Date(userData.time.seconds * 1000).toLocaleString()}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex flex-col gap-4 p-4 items-center">
                    {[
                      { label: 'Country', value: userData.country },
                      { label: 'Email', value: userData.email },
                      { label: 'Mobile', value: userData.mobile },
                      { label: 'Balance', value: userData.balance },
                      { label: 'Invites', value: userData.referrals },
                      { label: 'Recharge', value: userData.recharge },
                      { label: 'Withdraw', value: userData.withdrawal },
                    ].map((item, index) => (
                      <React.Fragment key={index}>
                        <p><span className="font-bold text-gray-700">{item.label}:</span> {item.value}</p>
                        <hr />
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4 items-center">
                    <button onClick={toggleReferral} className="font-bold text-gray-700 focus:outline-none">
                      Referral Link
                    </button>
                    {isReferralOpen && <div className="transition-opacity duration-500 ease-in-out"><Referral userId={userData.uid} /></div>}
                    <hr />
                    <button onClick={toggleTicket} className="font-bold text-gray-700 focus:outline-none">
                      My Tickets
                    </button>
                    {isTicketOpen && <div className="transition-opacity duration-500 ease-in-out"><MyTickets /></div>}
                  </div>
                </div>
              ) : (
                <img className='absolute top-52 left-40' src="/Search.gif" alt="Searching..." />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
