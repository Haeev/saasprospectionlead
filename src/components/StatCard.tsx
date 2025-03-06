import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  chart?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  chart,
  actions,
  className = ''
}: StatCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-colors duration-300 ${className}`}>
      <div className="p-6">
        {/* En-tête avec titre et icône */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{title}</h3>
          {icon && <div className="text-gray-500 dark:text-gray-400">{icon}</div>}
        </div>
        
        {/* Valeur principale */}
        <div className="flex items-end space-x-2 mb-2">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
          
          {/* Tendance (optionnelle) */}
          {trend && (
            <div className={`flex items-center text-sm ${trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              <span className="mr-1">
                {trend.isPositive ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.919Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M1.22 5.222a.75.75 0 0 1 1.06 0L7 9.942l3.768-3.769a.75.75 0 0 1 1.113.058 20.908 20.908 0 0 1 5.4 9.243.75.75 0 0 1-.728.928.75.75 0 0 1-.729-.928 19.394 19.394 0 0 0-4.33-7.958L7 12.067 1.72 6.786a.75.75 0 0 1 0-1.06l-.5-.504Z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              {trend.value}%
            </div>
          )}
        </div>
        
        {/* Sous-titre (optionnel) */}
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
      
      {/* Graphique (optionnel) */}
      {chart && (
        <div className="px-6 pb-6">
          {chart}
        </div>
      )}
      
      {/* Actions (optionnelles) */}
      {actions && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          {actions}
        </div>
      )}
    </div>
  );
} 