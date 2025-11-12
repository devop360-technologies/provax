import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 ">
      <Image
        src="/provax/logo.svg"
        alt="Provax Logo"
        className="w-20 md:w-22 lg:25 h-64"
        // fill
        width={100}
        height={64}
      />
    </Link>
  );
}
