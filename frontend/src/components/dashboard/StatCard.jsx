import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass, trend }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl relative overflow-hidden group">
      {/* Background decoration */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-500 ${colorClass.split(' ')[0].replace('text-', 'bg-')}`}></div>
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-extrabold text-white">{value}</h3>
          
          {trend && (
            <p className="mt-2 flex items-center text-sm">
              <span className={`font-medium ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-gray-500 ml-2">from last month</span>
            </p>
          )}
        </div>
        
        <div className={`p-3 rounded-lg ${colorClass.replace('text-', 'bg-').replace('-500', '-500/10')} border border-gray-800`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
