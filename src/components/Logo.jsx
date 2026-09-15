export default function Logo({ size = 38, gradientId = 'sg' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M19 2L35 9V22C35 31 27 36 19 38C11 36 3 31 3 22V9L19 2Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M11 29.5L19 9.5L27 29.5"
        stroke="white"
        strokeWidth="2.1"
        fill="none"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <line
        x1="13.5" y1="22" x2="24.5" y2="22"
        stroke="white" strokeWidth="2.1" strokeLinecap="round" opacity="0.9"
      />
      <line
        x1="9" y1="30" x2="29" y2="10"
        stroke="#00C8A4" strokeWidth="2.3" strokeLinecap="round"
      />
      <polygon points="29,10 23,13.5 26.5,17.5" fill="#00C8A4" />
      <defs>
        <linearGradient id={gradientId} x1="3" y1="2" x2="35" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1B4080" />
          <stop offset="1" stopColor="#0B1F50" />
        </linearGradient>
      </defs>
    </svg>
  )
}
