import { TABS } from "@/lib/tabs";
import type { TabKey } from "@/lib/types";

interface BottomTabBarProps {
  tab: TabKey;
  onChange: (tab: TabKey) => void;
  bookingsCount: number;
}

export default function BottomTabBar({ tab, onChange, bookingsCount }: BottomTabBarProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-sand/40 bg-white pb-safe sm:hidden">
      <div className="grid grid-cols-3 px-2 py-2">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            aria-current={tab === key ? "page" : undefined}
            className={`flex flex-col items-center gap-1 py-1.5 text-[10px] font-semibold ${
              tab === key ? "text-brand-600" : "text-muted"
            }`}
          >
            <span className="relative">
              <Icon size={22} />
              {key === "reservas" && bookingsCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white">
                  {bookingsCount}
                </span>
              )}
            </span>
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
