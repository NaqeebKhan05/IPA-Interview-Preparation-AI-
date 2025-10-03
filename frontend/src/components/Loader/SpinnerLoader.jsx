// Red Normal Flames like circles 
// import React from "react";

// const SpinnerLoader = () => {
//   return (
//     <div className="flex items-center justify-center">
//       <div className="relative w-12 h-12">
//         {/* Outer glowing ring */}
//         <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-yellow-400 animate-spin blur-sm"></div>

//         {/* Inner glowing pulse */}
//         <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-orange-500 via-yellow-400 to-pink-500 animate-pulse blur-[2px] opacity-80"></div>

//         {/* Core flame orb */}
//         <div className="absolute inset-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 animate-[ping_1.2s_ease-in-out_infinite]"></div>
//       </div>
//       <span className="sr-only">Loading...</span>
//     </div>
//   );
// };

// export default SpinnerLoader;

// AI Blue Flame HD
import React from "react";

const SpinnerLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-10">
        {/* Outer oval blue flame with flicker effect */}
        <div className="absolute inset-0 rounded-[50%] border-4 border-transparent border-t-blue-400 border-b-blue-600 animate-flicker blur-sm bg-blue-500/20"></div>

        {/* Inner oval glowing flame */}
        <div className="absolute inset-1 rounded-[50%] bg-gradient-to-tr from-blue-400 via-cyan-300 to-blue-600 animate-pulse blur-[2px] opacity-70"></div>

        {/* Core oval flame with subtle scale animation */}
        <div className="absolute inset-2 rounded-[50%] bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-500 animate-gentle-scale"></div>

        {/* Centered "AI" text with sparkle effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-white tracking-wider relative">
            AI
            {/* Sparkle effects */}
            <span className="absolute -top-1 -left-1 w-1 h-1 bg-white rounded-full animate-sparkle"></span>
            <span className="absolute -bottom-1 -right-1 w-1 h-1 bg-white rounded-full animate-sparkle-delay-1"></span>
            <span className="absolute -top-2 -right-1 w-1.5 h-1.5 bg-cyan-200 rounded-full animate-sparkle-delay-2"></span>
          </span>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
