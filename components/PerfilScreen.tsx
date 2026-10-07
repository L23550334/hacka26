import {
  Bell,
  ChevronRight,
  CreditCard,
  FileText,
  LifeBuoy,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { initial } from "@/lib/format";

interface PerfilScreenProps {
  userName: string;
  onLogout: () => void;
}

const menuItems = [
  { icon: CreditCard, label: "Métodos de pago" },
  { icon: Bell, label: "Notificaciones" },
  { icon: LifeBuoy, label: "Ayuda y soporte" },
  { icon: FileText, label: "Términos y privacidad" },
];

export default function PerfilScreen({ userName, onLogout }: PerfilScreenProps) {
  return (
    <div className="mx-auto max-w-xl px-5 pb-28 sm:px-6 sm:pb-16">
      <header className="flex items-center gap-4 pt-14">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-xl font-semibold text-white">
          {initial(userName)}
        </div>
        <h1 className="text-xl font-semibold">{userName}</h1>
      </header>

      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-mist/40 p-4">
        <ShieldCheck size={20} className="mt-0.5 shrink-0 text-brand-600" />
        <div>
          <p className="text-sm font-semibold">Bóveda segura</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted">
            Los pagos de tus reservas se guardan aquí hasta que cada evento finalice.
          </p>
        </div>
      </div>

      <ul className="mt-4 divide-y divide-sand/40 overflow-hidden rounded-2xl border border-sand/40">
        {menuItems.map(({ icon: Icon, label }) => (
          <li key={label}>
            <button className="flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm font-medium transition hover:bg-cream">
              <Icon size={18} className="text-muted" />
              <span className="flex-1">{label}</span>
              <ChevronRight size={16} className="text-muted" />
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={onLogout}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-danger transition hover:bg-danger/5"
      >
        <LogOut size={16} />
        Cerrar sesión
      </button>
    </div>
  );
}
