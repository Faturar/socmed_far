import Image from "next/image";

// Image
import profileImg from '../public/assets/image/profile2.png'

export default function PostItem() {
  const image = false;

  if(!image) {
    return (
      <div className="mt-6">
        <div className="bg-white p-6 border rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex">
            <div className="rounded-xl">
              <Image className="w-12 h-12" src={profileImg} />
            </div>
            <div className="ml-3">
              <h4>Karim Saif</h4>
              <span className="text-sm text-gray-400">UI/UX Designer</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex"></div>
        </div>
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}
