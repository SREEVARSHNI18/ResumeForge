import { FlaskConical } from "lucide-react";

export const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK_API === "true";

export function MockModeBanner() {
  if (!IS_MOCK_MODE) return null;
  return (
    <div className="flex items-start gap-2.5 bg-gap-soft border border-gap/25 rounded-lg px-3.5 py-2.5 mb-6">
      <FlaskConical size={16} className="text-gap mt-0.5 shrink-0" />
      <p className="text-sm text-gap">
        <span className="font-medium">Mock mode.</span> No backend is connected, so every upload
        returns the same example data regardless of the file you pick — this is here to test the
        interface, not to parse your real resume.
      </p>
    </div>
  );
}
