import Image from "next/image";
import Link from "next/link";

export default function author({name, img, designation}) {
  return (
    <div className="author flex py-5">
      <Image src={img} alt='authorImg' width={50} height={50} className="rounded-full"/>
      <div className="flex flex-col justify-center px-4">
        <Link href="/">
          <span className="text-md font-bold text-gray-800 hover:text-gray-600">
            {name}
          </span>
        </Link>
        <span className="text-sm text-gray-500">{designation}</span>
      </div>
    </div>
  );
}
