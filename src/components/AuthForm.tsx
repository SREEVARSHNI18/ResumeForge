import type { ReactNode } from "react";
import { Logo } from "./Logo";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6">
          <Logo />
        </div>
        <div className="mb-8">
          <h1 className="text-2xl text-ink">{title}</h1>
          <p className="text-ink-muted mt-1">{subtitle}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl shadow-sm p-6">{children}</div>
      </div>
    </div>
  );
}

export function FormField({
  label,
  ...inputProps
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-ink mb-1.5">{label}</span>
      <input
        {...inputProps}
        className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
      />
    </label>
  );
}

export function SubmitButton({ children, loading }: { children: ReactNode; loading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-lg bg-accent text-white font-medium py-2.5 hover:bg-accent-strong active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
    >
      {loading ? "Working…" : children}
    </button>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="text-sm text-danger bg-danger-soft border border-danger/20 rounded-lg px-3 py-2 mb-4">
      {message}
    </p>
  );
}
