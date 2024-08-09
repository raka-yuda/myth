import Navbar from "@/components/Navbar";
import LINKS from "@/constants/links";
import Head from "next/head";

export default function CustomNotFoundPage() {
  return (
    <div>
      <Head>
        <title>Myth | Not Found</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Navbar links={LINKS} />
        <main className="container max-w-7xl mx-auto px-4 pt-16 h-full min-h-[100vh] flex flex-col items-center justify-between">
          <div className="flex-grow flex flex-col items-center justify-center w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-800 mb-12">
              {"Sorry, we can't found your mythical story 😞"}
            </h1>
          </div>
          <footer className="w-full flex items-center justify-end py-8 text-black">
            <a href="#" target="_blank" rel="noopener noreferrer">
              Made with ❤️
            </a>
          </footer>
        </main>

      </div>
    </div>
  );
}