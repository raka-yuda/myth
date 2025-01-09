import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "./Loading";
import { useState } from "react";
import ReactDOM from "react-dom";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const TransitionLink = ({
  children,
  href,
  ...props
}) => {
  const router = useRouter();

  const handleTransition = async (
  	e
  ) => {
  	e.preventDefault();
  	const body = document.querySelector("body");

  	body?.classList.add("page-transition");

  	await sleep(300);
  	router.push(href);
  	await sleep(300);

  	body?.classList.remove("page-transition");
  };

  // const [isLoading, setIsLoading] = useState(false);

  // const handleTransition = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true); // Show the loading component

  //   // Simulate loading duration
  //   await new Promise((resolve) => setTimeout(resolve, 1500));

  //   // await sleep(1500);

  //   router.push(href); // Navigate to the target page
  //   setIsLoading(false); // Hide the loading component after navigation
  // };

  // const handleTransition = async (e) => {
  //   e.preventDefault(); // Prevent the default link behavior
  //   setIsLoading(true); // Show the loading component

  //   // Start navigating to the target page in the background
  //   router.push(href).then(() => {
  //     // Optionally, hide loading after a delay
  //     setTimeout(() => setIsLoading(false), 1000);
  //   });
  // };

  // const handleTransition = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     await router.push(href);
  //   } catch (error) {
  //     console.error('Navigation failed:', error);
  //   } finally {
  //     // Add a small delay before hiding the loading state
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 500);
  //   }
  // };


  return (
    <>
      {/* {isLoading &&
        ReactDOM.createPortal(
          // <Loading text="Welcome to the Mythical World!" duration={1000} />
          <Loading text="Loading" duration={1000} />
          ,
          document.body // Render the loading component at the root of the DOM
        )} */}
      <Link {...props} href={href} onClick={handleTransition}>
        {children}
      </Link>
    </>
  );
};

export default TransitionLink;