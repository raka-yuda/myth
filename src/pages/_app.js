import Loading from "@/components/Loading";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Set the same duration as the Loading component

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Myth</title>
      </Head>
      {isLoading ? (
        <Loading text="Welcome to the Mythical World!" duration={1000}/>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
