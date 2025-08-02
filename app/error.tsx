"use client"
export default function Error() {
  return (
    <div className="w-full h-screen flex items-center justify-center text-white bg-[#181829]">
      <h1 className="text-3xl font-bold">An unexpected error occurred</h1>
      <p className="mt-4 text-lg">Please try again later or contact support.</p>
    </div>
  );
}
