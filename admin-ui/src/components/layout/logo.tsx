/**
 * PWB logo rendered as an inline SVG.
 *
 * Blocky "P" mark in the brand palette plus a serif "pwb" wordmark. The
 * wordmark uses currentColor so it stays readable on light and dark
 * backgrounds; the mark keeps its fixed brand colors.
 *
 * @param props.size - Height of the logo in pixels. Defaults to 24.
 * @param props.variant - "full" renders mark + "pwb" wordmark; "icon" renders
 *   only the blocky P mark (tight crop, for the navbar).
 */
export function Logo({ size = 24, variant = "full" }: { size?: number; variant?: "full" | "icon" }) {
  if (variant === "icon") {
    return (
      <svg
        width={size * 1.288}
        height={size}
        viewBox="320 -50 407 316"
        role="img"
        aria-label="PWB icon"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g shapeRendering="crispEdges">
          <path fill="#b51c04" d="M375 170h100v26H375z" />
          <path fill="#f39c2b" d="M475 20h100v24H475z" />
          <path fill="#ea781e" d="M475 44h100v32H475z" />
          <path fill="#f5b982" d="M575 44h21v32h-21z" />
          <path fill="#e36009" d="M475 76h100v32H475z" />
          <path fill="#ee8e18" d="M575 76h21v56h-21z" />
          <path fill="#f3be22" d="M596 76h50v56h-50z" />
          <path fill="#cf4b07" d="M475 108h63v24h-63z" />
          <path fill="#e36009" d="M538 108h37v24h-37z" />
          <path fill="#b51c04" d="M475 132h63v38h-63z" />
          <path fill="#cc2906" d="M538 132h37v38h-37z" />
          <path fill="#dc3d10" d="M575 132h21v38h-21z" />
          <path fill="#e45225" d="M596 132h50v38h-50z" />
          <path fill="#eb619f" d="M646 132h26v38h-26z" />
        </g>
      </svg>
    );
  }
  return (
    <svg
      width={size * 1.8}
      height={size}
      viewBox="0 0 900 500"
      role="img"
      aria-label="PWB logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g shapeRendering="crispEdges">
        {/* Lewy dolny pasek */}
        <path fill="#b51c04" d="M375 170h100v26H375z" />
        {/* Rząd 1 */}
        <path fill="#f39c2b" d="M475 20h100v24H475z" />
        {/* Rząd 2 */}
        <path fill="#ea781e" d="M475 44h100v32H475z" />
        <path fill="#f5b982" d="M575 44h21v32h-21z" />
        {/* Rząd 3 */}
        <path fill="#e36009" d="M475 76h100v32H475z" />
        <path fill="#ee8e18" d="M575 76h21v56h-21z" />
        <path fill="#f3be22" d="M596 76h50v56h-50z" />
        {/* Rząd 4 */}
        <path fill="#cf4b07" d="M475 108h63v24h-63z" />
        <path fill="#e36009" d="M538 108h37v24h-37z" />
        {/* Rząd 5 */}
        <path fill="#b51c04" d="M475 132h63v38h-63z" />
        <path fill="#cc2906" d="M538 132h37v38h-37z" />
        <path fill="#dc3d10" d="M575 132h21v38h-21z" />
        <path fill="#e45225" d="M596 132h50v38h-50z" />
        <path fill="#eb619f" d="M646 132h26v38h-26z" />
      </g>
      {/* Wordmark - currentColor adaptuje się do motywu */}
      <text
        x="85"
        y="389"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="210"
        fontWeight="bold"
        letterSpacing="-13"
        fill="currentColor"
      >
        pwb
      </text>
    </svg>
  );
}
