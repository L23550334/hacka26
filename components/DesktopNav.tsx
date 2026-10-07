import { LogOut, Music } from "lucide-react";
import { TABS } from "@/lib/tabs";
import { initial } from "@/lib/format";
import type { TabKey } from "@/lib/types";

interface DesktopNavProps {
  tab: TabKey;
  onChange: (tab: TabKey) => void;
  userName: string;
  bookingsCount: number;
  onLogout: () => void;
}

export default function DesktopNav({
  tab,
  onChange,
  userName,
  bookingsCount,
  onLogout,
}: DesktopNavProps) {
  return (
    <header className="sticky top-0 z-30 hidden border-b border-sand/40 bg-white sm:block">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2 text-brand-600">
          <Music size={20} strokeWidth={2.25} aria-hidden="true" />
          <span className="text-lg font-semibold tracking-tight">sonora</span>
        </div>

        <nav className="flex items-center gap-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === key ? "bg-mist text-brand-700" : "text-muted hover:text-ink"
              }`}
            >
              <Icon size={15} />
              {label}
              {key === "reservas" && bookingsCount > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-semibold text-white">
                  {bookingsCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
            {initial(userName)}
          </span>
          <button
            onClick={onLogout}
            aria-label="Cerrar sesión"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-cream hover:text-danger"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
