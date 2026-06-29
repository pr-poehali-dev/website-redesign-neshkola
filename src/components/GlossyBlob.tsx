interface GlossyBlobProps {
  size?: number;
  color?: string;
  className?: string;
  delay?: number;
  slow?: boolean;
}

export default function GlossyBlob({ size = 120, color = '#7cce3a', className = '', delay = 0, slow = false }: GlossyBlobProps) {
  return (
    <span
      className={`blob-glossy ${slow ? 'blob-drift-slow' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        background: `radial-gradient(circle at 35% 30%, ${lighten(color, 0.45)} 0%, ${color} 55%, ${darken(color, 0.22)} 100%)`,
        boxShadow: `0 12px 40px 0 ${color}55, inset 0 -6px 18px 0 ${darken(color, 0.18)}44`,
      }}
      aria-hidden="true"
    />
  );
}

function lighten(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (n >> 16) + Math.round(255 * amt));
  const g = Math.min(255, ((n >> 8) & 0xff) + Math.round(255 * amt));
  const b = Math.min(255, (n & 0xff) + Math.round(255 * amt));
  return `rgb(${r},${g},${b})`;
}

function darken(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - Math.round(255 * amt));
  const g = Math.max(0, ((n >> 8) & 0xff) - Math.round(255 * amt));
  const b = Math.max(0, (n & 0xff) - Math.round(255 * amt));
  return `rgb(${r},${g},${b})`;
}
