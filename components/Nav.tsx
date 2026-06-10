import Link from "next/link";
import Clock from "./Clock";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-brand">
          DIAS<span className="tick">/</span>URAZOV
        </Link>
        <nav className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Clock />
      </div>
    </header>
  );
}
