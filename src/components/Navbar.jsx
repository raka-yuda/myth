import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';


const Navbar = ({ logoSrc = "", links = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  return (
    <nav className="bg-white bg-opacity-30 backdrop-blur-md shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex items-center w-full justify-between ">
            <div className="flex-shrink-0">
              {logoSrc && <img className="h-8 w-8" src={logoSrc} alt="Logo" />}
              {!logoSrc && <p className="text-2xl text-black">🗿</p>}
            </div>
            <div className="hidden md:block justify-self-end">
              <div className="ml-10 flex items-baseline space-x-4" data-testid="links">
                {links.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className='cursor-pointer'
                    legacyBehavior>
                    <a
                      className={`px-3 py-2 rounded-md text-base font-medium hover:cursor-pointer ${
                        router.pathname === link.href
                          ? 'text-black'
                          : 'hover:text-black text-gray-400'
                      }`}
                    >
                      {link.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href} legacyBehavior>
              <a
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  router.pathname === link.href
                    ? 'text-black'
                    : 'hover:text-black text-gray-300'
                }`}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  logoSrc: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
};

export default Navbar;
