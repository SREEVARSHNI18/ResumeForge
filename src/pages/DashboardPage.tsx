import { useState } from "react";
import { LogOut, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api, ApiError } from "../lib/api";
import type { Resume } from "../lib/api";
import { ResumeDropzone } from "../components/ResumeDropzone";
import { ParsedResumeView } from "../components/ParsedResumeView";
import { MockModeBanner } from "../components/MockModeBanner";
import { Logo } from "../components/Logo";

export function DashboardPage() {
  const { logout } = useAuth();
  const [resume, setResume] = useState<Resume | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const uploaded = await api.uploadResume(file);
      setResume(uploaded);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-surface sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <Logo />
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-12">
        <MockModeBanner />

        {!resume ? (
          <>
            <h1 className="text-2xl text-ink mb-1.5">Upload your resume</h1>
            <p className="text-ink-muted mb-7 max-w-md">
              We'll pull out your skills, experience, and projects — then you'll pick a target
              company and role to see exactly how well you match.
            </p>
            <ResumeDropzone onFileSelected={handleFile} disabled={uploading} />
            {uploading && (
              <p className="text-sm text-ink-muted mt-3 flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                Parsing your resume…
              </p>
            )}
            {error && (
              <p className="text-sm text-danger bg-danger-soft border border-danger/20 rounded-lg px-3 py-2 mt-3">
                {error}
              </p>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl text-ink">Here's what we found</h1>
              <button
                onClick={() => setResume(null)}
                className="text-sm text-accent font-medium hover:underline shrink-0"
              >
                Upload a different file
              </button>
            </div>
            <ParsedResumeView resume={resume} />
            <div className="flex items-center justify-between mt-5 bg-accent-soft border border-accent/15 rounded-xl px-5 py-4">
              <p className="text-sm text-accent-strong font-medium">
                Next: pick a target company and role to see your match score.
              </p>
              <ArrowRight size={16} className="text-accent-strong shrink-0" />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
