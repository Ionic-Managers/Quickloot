import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UsersIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import logo from "../../../../public/logo.ico";
import Footer from "../footer/Footer";
import { GiTrophy } from "react-icons/gi";
import bg from '../../../assets/gambling.jpeg';

export default function Landing() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLoginClick = (event) => {
    event.preventDefault();
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  };

  const navigation = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <div className="bg-white"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
      }}>
      <header className="fixed inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8 bg-white/60 backdrop-blur border border-white/30 shadow-lg"
          aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Quickloot</span>
              <img src={logo} alt="Quickloot logo" className="h-10 w-10" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-8 w-10 text-black" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              onClick={handleLoginClick}
              className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
              Log in →
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
                    onClick={handleLoginClick}>
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div
        className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl relative top-12 py-32 sm:py-48 lg:py-64 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Welcome to Quickloot
          </h1>
          <p className="mt-6 text-md font-medium md:text-lg lg:text-xl leading-8 text-white">
            Discover the excitement of winning with Quickloot! Our platform offers an unparalleled experience in online lotteries. With state-of-the-art technology and user-friendly design, Quickloot provides a seamless and secure environment for players to participate in lotteries from anywhere in the world.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              onClick={handleLoginClick}
              className="cursor-pointer bg-white/70 rounded-full px-5 py-3 text-sm font-bold text-blue-950 shadow-md backdrop-blur border border-white/30 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Start Playing
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-white">
              Learn More →
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-5 md:space-y-0 md:space-x-5 mt-20">
            <div className="w-full md:w-1/3 bg-white/60 p-6 rounded-lg shadow-md border border-white/30 backdrop-blur">
              <h1 className="text-lg font-bold text-black mb-2">Total Users</h1>
              <div className="flex flex-row gap-3 mt-1">
                <UsersIcon className="h-6 w-6 text-black  relative left-12" aria-hidden="true" />
                <p className="text-black ml-12">50,000+ Users</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-white/60 p-6 rounded-lg shadow-md border border-white/30 backdrop-blur">
              <h1 className="text-lg font-bold text-black mb-2">Total Winners</h1>
              <div className="flex flex-row gap-3 mt-1">
                <GiTrophy className="h-6 w-6 text-black  relative left-12" aria-hidden="true" />
                <p className="text-black ml-12">10,000+ Winners</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-white/60 p-6 rounded-lg shadow-md border border-white/30 backdrop-blur">
              <h1 className="text-lg font-bold text-black mb-2">Total Visitors</h1>
              <div className="flex flex-row gap-3 mt-1">
                <EyeIcon className="h-6 w-6 text-black relative left-12" aria-hidden="true" />
                <p className="text-black ml-12">1 Million+ Visitors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}