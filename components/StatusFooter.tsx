import { footer } from "@/lib/content";

export default function StatusFooter() {
  return (
    <footer className="osfooter">
      <span>{footer.left}</span>
      <span className="osf-mid">{footer.middle}</span>
      <span className="osf-status">
        <i aria-hidden /> {footer.right}
      </span>
    </footer>
  );
}
