import React from "react";

const RoleInfoHeader = ({
  role,
  experience,
  topicsToFocus,
  description,
  questions,
  lastUpdated,
}) => {
  return (
    <div className=" bg-white relative overflow-hidden grid grid-cols-12">
      {/* LEFT SIDE: Gradient + Info (col-span-5) */}
      <div className="relative col-span-12 lg:col-span-5">
        {/* BACKGROUND: Gradient Blobs */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-32 h-32 bg-lime-400 blur-[90px] animate-blob1" />
          <div className="w-32 h-32 bg-teal-400 blur-[90px] animate-blob2" />
          <div className="w-32 h-32 bg-cyan-300 blur-[75px] animate-blob3" />
          <div className="w-32 h-32 bg-fuchsia-200 blur-[75px] animate-blob1" />
        </div>

        {/* CONTENT: Info Section */}
        <div className="md:ml-20 container mx-auto px-6 md:px-0 flex items-center justify-between relative z-20 py-6">
          <div className="flex flex-col justify-between">
            <div className="flex items-start">
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-medium">{role}</h2>
                    <p className="text-sm text-medium text-gray-900">
                      {topicsToFocus}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:flex items-center gap-3 mt-4">
              <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full mb-1">
                Experience: {experience} {experience == 1 ? "year" : "years"}
              </div>
              <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full mb-1">
                {questions} Q&A
              </div>
              <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                Last Updated: {lastUpdated}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Empty space (col-span-7) so it doesn’t overlap drawer */}
      <div className="hidden lg:block lg:col-span-7"></div>
    </div>
  );
};

export default RoleInfoHeader;
