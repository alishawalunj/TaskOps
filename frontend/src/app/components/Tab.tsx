'use client';
import clsx from 'clsx';

export default function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-6 py-3 text-sm font-semibold transition-all',
        active
          ? 'bg-green-500 text-black'
          : 'bg-green-900 text-green-300 hover:bg-green-700'
      )}
    >
      {label}
    </button>
  );
}
