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

  // Initialize "No" button position on mount
  useEffect(() => {
    if (containerRef.current && noButtonRef.current) {
      // Position it to the right of the Yes button with gap
      const yesButtonWidth = 100; // minWidth of Yes button
      const gap = 24; // gap-6 = 24px
      setNoButtonPosition({ x: yesButtonWidth + gap, y: 0 });
    }
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes heartFloat {
          0%, 100% {
            transform: translateY(0) scale(1) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) scale(1.1) rotate(-5deg);
          }
          50% {
            transform: translateY(-15px) scale(1.15) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) scale(1.1) rotate(5deg);
          }
        }

        .heart-float {
          animation: heartFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 4px 12px rgba(244, 63, 94, 0.3));
        }

        .heart-float:hover {
          animation-duration: 1.5s;
        }
      `}</style>

      <div
        className={`${geistSans.variable} font-sans flex min-h-screen items-center justify-center`}
        style={{ backgroundColor: "#FFE5EC" }}
      >
        <main className="w-full max-w-4xl mx-4">
          <div
            className="bg-white rounded-3xl shadow-lg p-16 flex flex-col items-center gap-10"
            style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)" }}
          >
            {/* Heart Animation */}
            <div className="w-52 h-52">
              <DotLottieReact
                src="https://lottie.host/3c8682b6-9750-429d-ae2e-c71f9ab49d78/SIxeg3Bxip.lottie"
                loop
                autoplay
              />
            </div>

            {/* Question */}
            <h1 className="text-3xl font-light text-center text-gray-800 leading-relaxed max-w-lg">
              Deepanshi, will you be my Valentine?
            </h1>

            {/* Buttons */}
            {!answer ? (
              <div
                ref={containerRef}
                className="relative w-full mt-6 max-w-md h-24 flex items-start justify-start gap-6"
              >
                <button
                  onClick={() => setAnswer("yes")}
                  className="py-3 px-8 rounded-full bg-rose-500 text-white text-base font-medium transition-all hover:bg-rose-600 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                  style={{ minWidth: '100px' }}
                >
                  Yes
                </button>
                <button
                  ref={noButtonRef}
                  onMouseEnter={handleNoButtonHover}
                  onClick={() => setAnswer("no")}
                  className="absolute py-3 px-8 rounded-full border-2 border-gray-300 text-gray-700 text-base font-medium transition-all hover:border-gray-400 hover:bg-gray-50"
                  style={{
                    left: `${noButtonPosition.x + 200}px`,
                    top: `${noButtonPosition.y}px`,
                    transition: 'left 0.3s ease-out, top 0.3s ease-out',
                    minWidth: '100px'
                  }}
                >
                  No
                </button>
              </div>
            ) : (
              <div className="text-center mt-6 w-full flex flex-col items-center gap-4">
                {answer === "yes" && (
                  <img
                    src="/yay.jpg"
                    alt="Celebration"
                    className="h-40 w-auto object-contain"
                  />
                )}

              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
