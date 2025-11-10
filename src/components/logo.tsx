import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/provax/logo.svg"
        alt="Provax Logo"
        width={100}
        height={64}
      />
    </Link>
  );
}
