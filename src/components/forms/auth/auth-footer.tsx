import Link from "next/link";

export function AuthFooter() {
  return (
    <footer className="text-muted-foreground container max-w-6xl py-6 text-center text-xs">
      <Link href="/">Built with SaasPilot</Link>
      <span className="mx-1 opacity-50"> | </span>
      <Link href="/privacy-policy">Privacy policy</Link>
      <span className="mx-1 opacity-50"> | </span>
      <Link href="/terms">Terms and conditions</Link>
    </footer>
  );
}
