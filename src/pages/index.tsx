import { useState, useRef, useEffect } from "react";
import { Geist } from "next/font/google";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [initialNoPosition, setInitialNoPosition] = useState<{ x: number, y: number } | null>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!noButtonRef.current || !containerRef.current) return;

    const button = noButtonRef.current;
    const container = containerRef.current;
    const buttonRect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate available space
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    // Generate random position away from current position
    let newX, newY;
    do {
      newX = Math.random() * maxX;
      newY = Math.random() * maxY;
    } while (
      Math.abs(newX - noButtonPosition.x) < 100 &&
      Math.abs(newY - noButtonPosition.y) < 50
    );

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleContainerMouseLeave = () => {
    if (initialNoPosition) {
      setNoButtonPosition(initialNoPosition);
    }
  };

  // Initialize "No" button position on mount
  useEffect(() => {
    if (containerRef.current && noButtonRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();

      // Calculate start position: Center of container + half gap
      // The "Yes" block is centered. Total width of Yes+Gap+No = 100+24+100 = 224.
      // So center is at 112 from the start of the block.
      // "No" starts at 12px right of center.

      const initialX = (containerRect.width / 2) + 12;
      const initialY = 0; // Top aligned with Yes button

      const pos = { x: initialX, y: initialY };
      setNoButtonPosition(pos);
      setInitialNoPosition(pos);
    }
  }, []);

  return (
    <>


      <div
        className={`${geistSans.variable} font-sans flex min-h-screen items-center justify-center`}
        style={{ backgroundColor: "#FFE5EC" }}
      >
        <main className="w-full max-w-4xl mx-4">
          <div
            className="bg-white rounded-3xl shadow-lg p-8 md:p-16 flex flex-col items-center gap-10"
            style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)" }}
          >
            {/* Heart Animation */}
            <div className="w-40 h-40 md:w-52 md:h-52">
              <DotLottieReact
                src="/SIxeg3Bxip.lottie"
                loop
                autoplay
              />
            </div>

            {/* Question */}
            <h1 className="text-2xl md:text-3xl font-light text-center text-gray-800 leading-relaxed max-w-lg">
              Deepanshi, will you be my Valentine?
            </h1>

            {/* Buttons */}
            {!answer ? (
              <>
                <div
                  ref={containerRef}
                  onMouseLeave={handleContainerMouseLeave}
                  className="relative w-full mt-6 max-w-md h-32 flex items-start justify-center"
                >
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 flex gap-6">
                    <button
                      onClick={() => setAnswer("yes")}
                      className="py-3 px-8 rounded-full bg-rose-500 text-white text-base font-medium transition-all hover:bg-rose-600 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg whitespace-nowrap"
                      style={{ minWidth: '100px', zIndex: 10 }}
                    >
                      Yes
                    </button>
                    {/* Placeholder for No button initial position to keep layout stable */}
                    <div style={{ width: '100px' }}></div>
                  </div>

                  <button
                    ref={noButtonRef}
                    onMouseEnter={handleNoButtonHover}
                    onClick={() => setAnswer("no")}
                    className="absolute py-3 px-8 rounded-full border-2 border-gray-300 text-gray-700 text-base font-medium transition-all hover:border-gray-400 hover:bg-gray-50 whitespace-nowrap"
                    style={{
                      left: `${noButtonPosition.x}px`,
                      top: `${noButtonPosition.y}px`,
                      transition: 'left 0.3s ease-out, top 0.3s ease-out',
                      minWidth: '100px'
                    }}
                  >
                    No
                  </button>
                </div>
                <p className="text-sm text-gray-800 font-light animate-pulse">
                  no ko sharm aa rhi hai abhi please cooperate
                </p>
              </>
            ) : (
              <div className="text-center mt-6 w-full flex flex-col items-center gap-4">
                {answer === "yes" && (
                  <>
                    <h2 className="text-4xl font-bold text-rose-500 mb-2">Yay!</h2>
                    <img
                      src="/yay.jpg"
                      alt="Celebration"
                      className="h-40 w-auto object-contain"
                    />
                  </>
                )}

              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
