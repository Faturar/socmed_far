

// next
import RegisterForm from "./RegisterForm"

export default async function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="xl:w-1/4 lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-md">
        <h2 className="text-gray-900 text-2xl mb-1 font-bold title-font">Register</h2>
        <p className="leading-relaxed mb-5 text-gray-600">Register your account to continue to social media app</p>

        {/* Name */}
        <div className="relative mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
          <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>

        {/* username */}
        <div className="relative mb-4">
          <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
          <input type="text" id="username" name="username" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>

        {/* email */}
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>

        {/* password */}
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
          <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>

        <button type="button" className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg mb-4">Register</button>

        <button type="button" className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 disabled:bg-gray-300 rounded text-lg" disabled={true}>Register With Google</button>    

        <p className="text-xs text-gray-500 mt-3">Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>    
      </div>
    </div>
  )
}
