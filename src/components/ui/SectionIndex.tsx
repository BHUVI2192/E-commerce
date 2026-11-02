import React from 'react';

interface SectionIndexProps {
  number: string;
  title: string;
  tag?: string;
  dark?: boolean;
  className?: string;
}

export const SectionIndex: React.FC<SectionIndexProps> = ({
  number,
  title,
  tag,
  dark = false,
  className = '',
}) => {
  return (
    <div className={`w-full mb-12 lg:mb-16 ${className}`}>
      {/* 1px hairline top rule */}
      <div
        className={`w-full h-px ${
          dark ? 'bg-[#F2EFE9]/15' : 'bg-[#B9AE9C]/40'
        }`}
      />
      <div className="flex items-center justify-between pt-3 text-[11px] font-mono uppercase tracking-[0.14em]">
        <div className="flex items-center gap-2">
          <span className={dark ? 'text-[#F2EFE9]' : 'text-[#25231F]'}>
            {number}
          </span>
          <span className={dark ? 'text-[#F2EFE9]/40' : 'text-[#7A756B]'}>/</span>
          <span className={dark ? 'text-[#F2EFE9]/70' : 'text-[#7A756B]'}>
            {title}
          </span>
        </div>
        {tag && (
          <span
            className={
              tag.toLowerCase().includes('new') || tag.toLowerCase().includes('batch')
                ? 'text-[#B4532A]' // The ember accent
                : dark
                ? 'text-[#F2EFE9]/50'
                : 'text-[#7A756B]'
            }
          >
            {tag}
          </span>
        )}
      </div>
    </div>
  );
};
