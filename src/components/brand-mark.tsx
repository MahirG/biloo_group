type BrandMarkProps = {
  className?: string;
  title?: string;
};

export function BrandMark({ className = "h-9 w-9", title = "Biloo" }: BrandMarkProps) {
  return (
    <svg
      aria-label={title}
      className={className}
      role="img"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#0F172A" height="48" rx="15" width="48" />
      <circle cx="19" cy="24" fill="none" r="8" stroke="#F8FAFC" strokeWidth="3.5" />
      <circle cx="29" cy="24" fill="none" r="8" stroke="#F8FAFC" strokeWidth="3.5" />
      <path d="M22 18.4C24 16.6 26 16.6 28 18.4" fill="none" stroke="#1E3A8A" strokeLinecap="round" strokeWidth="3.5" />
    </svg>
  );
}
