import { identity } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {identity.name}</span>
        <span>{identity.location} · {identity.timezoneLabel}</span>
        <span style={{ display: "flex", gap: "1.6rem" }}>
          <a href={identity.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={`mailto:${identity.email}`}>Email</a>
        </span>
      </div>
    </footer>
  );
}
