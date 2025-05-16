export default function Logo({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-600"
        aria-label="Logo"
        role="img"
      >
        <path
          d="M20 4C11.163 4 4 11.163 4 20C4 28.837 11.163 36 20 36C28.837 36 36 28.837 36 20C36 11.163 28.837 4 20 4ZM20 8C26.627 8 32 13.373 32 20C32 26.627 26.627 32 20 32C13.373 32 8 26.627 8 20C8 13.373 13.373 8 20 8Z"
          fill="currentColor"
        />
        <path
          d="M20 12C15.582 12 12 15.582 12 20C12 24.418 15.582 28 20 28C24.418 28 28 24.418 28 20C28 15.582 24.418 12 20 12ZM20 16C22.209 16 24 17.791 24 20C24 22.209 22.209 24 20 24C17.791 24 16 22.209 16 20C16 17.791 17.791 16 20 16Z"
          fill="currentColor"
        />
        <path
          d="M20 20C20.552 20 21 20.448 21 21V23C21 23.552 20.552 24 20 24C19.448 24 19 23.552 19 23V21C19 20.448 19.448 20 20 20Z"
          fill="currentColor"
        />
      </svg>
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
        Quiz Mint AI
      </span>
    </div>
  );
}
