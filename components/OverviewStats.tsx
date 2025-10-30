'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface StatCardProps {
  iconSrc: string;
  iconBg: string;
  title: string;
  value: string;
  subtitle?: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

function StatCard({ iconSrc, iconBg, title, value, subtitle, change, changeType }: StatCardProps) {
  return (
    <div className="rounded-2xl p-6 shadow-lg " style={{ backgroundColor: 'rgba(255, 255, 255, 0.34)' }}>
      <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center mb-4`}>
        <Image src={iconSrc} alt={title} width={24} height={24} className="brightness-0 invert" />
      </div>
      <p className="text-sm text-gray-600 mb-2">{title}</p>
      <div className="flex items-baseline gap-2 mb-2">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
      </div>
      <div className="flex items-center gap-1 text-xs">
        <span className={changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
          {changeType === 'increase' ? '↗' : '↘'} {change}
        </span>
      </div>
    </div>
  );
}

export default function OverviewStats() {
  const stats = [
    {
      iconSrc: '/chart.svg',
      iconBg: 'bg-[#D398E7]',
      title: 'Total revenue',
      value: '$53,00989',
      change: '92% increase from last month',
      changeType: 'increase' as const,
    },
    {
      iconSrc: '/briefcase.svg',
      iconBg: 'bg-[#E89271]',
      title: 'Projects',
      value: '95',
      subtitle: '/100',
      change: '10% decrease from last month',
      changeType: 'decrease' as const,
    },
    {
      iconSrc: '/task.svg',
      iconBg: 'bg-[#70A1E5]',
      title: 'Time spent',
      value: '1022',
      subtitle: '/1300 Hrs',
      change: '8% increase from last month',
      changeType: 'increase' as const,
    },
    {
      iconSrc: '/user.svg',
      iconBg: 'bg-[#F0C274]',
      title: 'Resources',
      value: '101',
      subtitle: '/120',
      change: '2% increase from last month',
      changeType: 'increase' as const,
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
        <button className="px-4 py-2 text-sm text-gray-700 bg-white rounded-lg hover:bg-gray-50 flex items-center gap-2">
          Last 30 days
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}
