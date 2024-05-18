import React, { useState } from 'react';
import Header from '../../../Layout/Header/Header';
import Footer from '../../../Layout/footer/Footer';
import { db, auth } from '../../../../firebase/Firebase';
import { doc, setDoc } from 'firebase/firestore';

const Recharge: React.FC = () => {
    const [qrIndex, setQrIndex] = useState<number>(Math.floor(Math.random() * 5));
    const [utrNumber, setUtrNumber] = useState<string>('');
    const [rechargeAmount, setRechargeAmount] = useState<number | null>(null);
    const currentUser = auth.currentUser;

    const qrDetails = [
        { src: '../../../../../public/UPI/upi1.jpeg', upiId: 'mr2919635@okhdfcbank', name: 'Muthuraman M' },
        { src: '../../../../../public/UPI/upi2.jpeg', upiId: 'priyadharshini140205@okaxis', name: 'Priya Dharshini' },
        { src: '../../../../../public/UPI/upi3.jpeg', upiId: 'abrahama1906-2@okicici', name: 'Abraham A' },
        { src: '../../../../../public/UPI/upi4.jpeg', upiId: 'masssaravanan854@okicici', name: 'Saravana Kumar' },
        { src: '../../../../../public/UPI/upi5.jpeg', upiId: 'rockynaveen029-2@oksbi', name: 'Naveen Rocky' },
    ];

    const rechargeOptions = [100, 200, 500, 1000, 2000, 2500, 3000, 5000];

    const handleUtrSubmit = async () => {
        if (!utrNumber || utrNumber.length !== 12 || !/^\d{12}$/.test(utrNumber)) {
            alert('Please Enter UTR number');
            return;
        }
        if (!rechargeAmount) {
            alert('Please select a recharge amount');
            return;
        }

        const userEmail = currentUser?.email;
        const timestamp = new Date();

        try {
            const docRef = doc(db, 'RechargeList', userEmail);
            await setDoc(docRef, {
                utrNumber: utrNumber.trim(),
                rechargeAmount,
                timestamp
            }, { merge: false });
            alert('Recharge information Sent Successfully Please wait 10 Minutes and get in your Wallet');
            setUtrNumber('');
            setRechargeAmount(null);
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Failed to save the recharge information.');
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-700 mb-6 mt-24">Recharge Your Wallet</h1>
                <div className='px-20'>
                    <img src={qrDetails[qrIndex].src} alt="UPI QR Code" className="mb-3" />
                </div>
                <p className="text-lg text-gray-800 mt-3">UPI ID: {qrDetails[qrIndex].upiId}</p>
                <p className="text-md text-gray-600 mb-6">Name: {qrDetails[qrIndex].name}</p>
                <div className="grid grid-cols-2 gap-4 mb-4 mt-5">
                    {rechargeOptions.map(amount => (
                        <button
                            key={amount}
                            onClick={() => setRechargeAmount(amount)}
                            className={`bg-white text-blue-700 border border-blue-300 hover:bg-blue-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${rechargeAmount === amount ? 'bg-blue-300' : ''}`}>
                            Recharge ₹{amount}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col items-center mt-10">
                    <input
                        type="text"
                        placeholder="Enter UTR Number"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        className="border border-gray-300 p-2 rounded-lg w-[325px]" />
                    <button
                        onClick={handleUtrSubmit}
                        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline sm:mb-10">
                        Submit
                    </button>
                </div>
            </div>
            <div className='mt-4'>
                <Footer />
            </div>
        </>
    );
};

export default Recharge;