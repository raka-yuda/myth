import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const flags = {
  english: "🇬🇧",
  indonesian: "🇮🇩",
  // Add more flags for other languages as needed
};

export default function LanguageSelector({ availableLanguages, currentLanguage, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex justify-end text-left w-full">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="language-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {flags[currentLanguage]} {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)}
          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 top-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                className={`${
                  lang === currentLanguage ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
                onClick={() => {
                  onLanguageChange(lang);
                  setIsOpen(false);
                }}
              >
                {flags[lang]} {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}