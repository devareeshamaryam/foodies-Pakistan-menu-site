 import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Burger Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src="/burger.png"
            alt="Delicious Burger"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Side - SignUp Component */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">
        <div className="w-full max-w-md">
          <SignUp />
        </div>
      </div>
    </div>
  );
}