import React from 'react';
import { useLaunchCountdown } from '../../hooks/useLaunchCountdown';

interface LaunchCountdownProps {
  targetDate: Date;
  title?: string;
}

const LaunchCountdown: React.FC<LaunchCountdownProps> = ({ 
  targetDate, 
  title = "Launching In" 
}) => {
  const timeRemaining = useLaunchCountdown(targetDate);
  
  // Check if date is invalid or not set (epoch 0 or invalid date)
  const isInvalidDate = !targetDate || targetDate.getTime() === 0 || isNaN(targetDate.getTime());
  
  // Format date in EST timezone
  const formattedEstDate = !isInvalidDate ? targetDate.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'short',
  }) : null;

  // Show "Coming Soon!" if date is invalid OR countdown is complete
  if (isInvalidDate || timeRemaining.isComplete) {
    return (
      <div className="w-full mb-8 p-6 md:p-8 rounded-2xl bg-linear-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-3 leading-relaxed">
            Coming Soon!
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Get ready for the official SHI4GUD launch!
          </p>
        </div>
      </div>
    );
  }

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center p-1.5 md:p-4 rounded-lg md:rounded-xl bg-gray-900/50 border border-pink-500/30 w-[55px] md:w-[90px]">
      <div className="text-lg md:text-4xl font-bold bg-linear-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] md:text-sm text-gray-400 mt-0.5 md:mt-1 uppercase tracking-tight md:tracking-wider">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full mb-8 p-3 md:p-8 rounded-2xl bg-linear-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold bg-linear-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
          {title}
        </h2>
        <p className="text-gray-400 text-xs md:text-sm mb-1">
          Get ready for the official SHI4GUD launch!
        </p>
        {formattedEstDate && (
          <p className="text-gray-500 text-[10px] md:text-xs">
            {formattedEstDate} EST
          </p>
        )}
      </div>
      
      <div className="flex justify-center items-center gap-1 md:gap-4">
        <TimeUnit value={timeRemaining.days} label="Days" />
        <div className="text-2xl md:text-4xl font-bold text-pink-500 hidden sm:block">:</div>
        <TimeUnit value={timeRemaining.hours} label="Hours" />
        <div className="text-2xl md:text-4xl font-bold text-pink-500 hidden sm:block">:</div>
        <TimeUnit value={timeRemaining.minutes} label="Minutes" />
        <div className="text-2xl md:text-4xl font-bold text-pink-500 hidden sm:block">:</div>
        <TimeUnit value={timeRemaining.seconds} label="Seconds" />
      </div>
    </div>
  );
};

export default LaunchCountdown;