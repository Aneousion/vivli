"use client"

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col gap-4 h-screen w-screen p-4 bg-base-200">
        <div className="skeleton h-1/3 w-full"></div>
        <div className="skeleton h-8 w-2/3"></div>
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
        <div className="flex-grow skeleton w-full"></div>
      </div>
    </>
  );
};