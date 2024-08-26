import InteractiveSliders from "@/components/GameSlideEffects";
import Link from "next/link";

const Home = () => {
  return (
    <section>
      <div className="px-4  mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="flex flex-wrap items-center mx-auto max-w-7xl">
          <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
            <div>
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 rounded-full bg-violet-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

                <div className="absolute rounded-full bg-fuchsia-300 -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <InteractiveSliders />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start mt-5 mb-5 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
            <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">
              Welcome to Interactive Game Console
            </h1>
            <p className="mb-2 text-base leading-relaxed text-left text-gray-500">
              Dive into immersive worlds, solve challenging puzzles, and compete
              with friends in dynamic, interactive gameplay. Ready to embark on
              your next adventure? Your journey starts here!
            </p>
            <div className="mt-0 lg:mt-6 max-w-7xl sm:flex">
              <div className="rounded-lg sm:mt-0">
                <button className="items-center block px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Link href="/form">Get Started</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
