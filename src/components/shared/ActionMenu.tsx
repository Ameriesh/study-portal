import { useEffect, useRef, useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

export interface ActionMenuItem {
  id: string;
  label: string;
  onClick: () => void;
  hidden?: boolean;
}

interface ActionMenuProps {
  items: ActionMenuItem[];
}

export default function ActionMenu({ items }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const visibleItems = items.filter((item) => !item.hidden);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(event.target as Node)) return;
      setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (visibleItems.length === 0) return null;

  return (
    <div ref={wrapperRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs hover:bg-primary/5 hover:text-primary transition-colors"
      >
        <EllipsisVerticalIcon className="h-4 w-4" />
        Actions
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-20 w-44 rounded-xl border border-border bg-surface shadow-lg p-1.5">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className="w-full text-left rounded-lg px-3 py-2 text-xs font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
