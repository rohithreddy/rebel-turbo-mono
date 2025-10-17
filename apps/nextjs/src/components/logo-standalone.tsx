export default function LogoStandalone({ width = 200, height = 80 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fire Logo */}
      <g transform="translate(0, 0) scale(0.6)">
        <circle cx="60" cy="60" r="60" fill="#FFF3E0" />
        <path
          d="M30 40C35 25 45 20 60 20C75 20 85 25 90 40C95 55 90 65 80 70C70 75 65 85 70 95C75 105 65 110 60 110C55 110 45 105 50 95C55 85 50 75 40 70C30 65 25 55 30 40Z"
          fill="#FF9800"
        />
        <path
          d="M35 45C40 30 50 25 60 25C70 25 80 30 85 45C90 60 85 70 75 75C65 80 60 90 65 100C70 110 60 115 55 115C50 115 40 110 45 100C50 90 45 80 35 75C25 70 30 60 35 45Z"
          fill="#FF5722"
        />
        <path
          d="M40 35C45 25 55 20 60 20C65 20 75 25 80 35C85 45 80 55 70 60C60 65 55 75 60 85C65 95 55 100 50 100C45 100 35 95 40 85C45 75 40 65 30 60C20 55 35 45 40 35Z"
          fill="#FFAB40"
        />
        <circle cx="25" cy="50" r="3" fill="#FFCC80" />
        <circle cx="85" cy="30" r="4" fill="#FFCC80" />
        <circle cx="95" cy="55" r="3" fill="#FFCC80" />
        <circle cx="75" cy="85" r="4" fill="#FFCC80" />
        <circle cx="40" cy="90" r="3" fill="#FFCC80" />
      </g>

      {/* Text */}
      <text x="80" y="35" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#000000">
        Be a
      </text>

      {/* REBEL text with fire effect */}
      <g>
        {/* Fire glow effects */}
        <text x="120" y="35" fontFamily="Arial" fontSize="16" fontWeight="900" fill="#FF5722" filter="blur(4px)">
          REBEL
        </text>
        <text x="120" y="35" fontFamily="Arial" fontSize="16" fontWeight="900" fill="#FF9800" filter="blur(2px)">
          REBEL
        </text>

        {/* Main text */}
        <text x="120" y="35" fontFamily="Arial" fontSize="16" fontWeight="900" fill="#FFFFFF">
          REBEL
        </text>
      </g>
    </svg>
  )
}
