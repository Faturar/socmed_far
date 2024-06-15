import Navbar from "../Navbar";

export default async function Page() {
  return (
  <section>
    <Navbar />
    <div className="container mx-auto flex justify-between pt-4 lg:pt-8">
      <div className="mx-auto w-6/12">
        <div className={`bg-white mx-0 sm:mx-0 mb-6 p-6 drop-shadow-sm rounded-2xl overflow-hidden`}>
          Notification
        </div>
      </div>  
    </div>  
  </section>
)}
