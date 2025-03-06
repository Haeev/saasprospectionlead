'use client';

interface SimpleChartProps {
  data: number[];
  height?: number;
  color?: string;
  showDots?: boolean;
  activeIndex?: number;
  className?: string;
}

export default function SimpleChart({
  data,
  height = 60,
  color = '#3b82f6',
  showDots = true,
  activeIndex = -1,
  className = ''
}: SimpleChartProps) {
  // Trouver les valeurs min et max pour l'échelle
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  // Calculer les points du graphique
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = range === 0 ? 50 : 100 - ((value - min) / range) * 100;
    return { x, y, value };
  });
  
  // Créer le chemin SVG pour la ligne
  const path = points.map((point, index) => {
    return index === 0 
      ? `M ${point.x},${point.y}` 
      : `L ${point.x},${point.y}`;
  }).join(' ');
  
  return (
    <div className={`w-full ${className}`} style={{ height: `${height}px` }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Ligne du graphique */}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />
        
        {/* Points sur la ligne */}
        {showDots && points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={activeIndex === index ? 3 : 1.5}
            fill={activeIndex === index ? color : 'white'}
            stroke={color}
            strokeWidth="1.5"
            className="transition-all duration-300"
          />
        ))}
        
        {/* Remplissage sous la ligne (dégradé) */}
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <path
          d={`${path} L ${points[points.length - 1].x},100 L ${points[0].x},100 Z`}
          fill="url(#gradient)"
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
} 