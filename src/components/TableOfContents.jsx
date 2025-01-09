import React from 'react';
import { useEffect, useState } from 'react';

const SCROLL_OFFSET = 96;

const TableOfContents = ({ headings }) => {
  const [activeId, setActiveId] = useState('');

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setActiveId(entry.target.id);
  //         }
  //       });
  //     },
  //     { rootMargin: '0% 0% -80% 0%' }
  //   );

  //   headings.forEach((heading) => {
  //     const element = document.getElementById(heading.id);
  //     if (element) observer.observe(element);
  //   });

  //   return () => observer.disconnect();
  // }, [headings]);

  // const handleClick = (e, id) => {
  //   e.preventDefault();
  //   const element = document.getElementById(id);
  //   // if (element) {
  //   //   element.scrollIntoView({
  //   //     behavior: 'smooth'
  //   //   });
  //   // }
  //   if (element) {
  //     const elementPosition = element.getBoundingClientRect().top;
  //     const offsetPosition = elementPosition + window.scrollY - SCROLL_OFFSET;

  //     window.scrollTo({
  //       top: offsetPosition,
  //       behavior: 'smooth'
  //     });
  //   }
  // };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Only update if the element is more than 50% visible
            setActiveId(entry.target.id);
          }
        });
      },
      {
        // Larger rootMargin to make it less sensitive
        rootMargin: '-20% 0% -50% 0%',
        threshold: 0.5
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - SCROLL_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Set active state after a small delay to ensure smooth transition
      setTimeout(() => {
        setActiveId(id);
      }, 100);
    }
  };

  return (
    <nav className="toc">
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={`toc-item`}>
            <a
              href={`#${heading.id}`}
              className={`block py-1 px-2 text-lg hover:bg-gray-100 rounded
                ${activeId === heading.id ? 'active font-bold text-blue-600' : 'text-gray-700'}
              `}
              onClick={(e) => handleClick(e, heading.id)}
              data-testid={`toc-link-${heading.id}`} 
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;