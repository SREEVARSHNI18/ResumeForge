import { useState, useRef } from "react";
import type { DragEvent } from "react";
import { UploadCloud } from "lucide-react";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function ResumeDropzone({
  onFileSelected,
  disabled,
}: {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) return; // real validation happens server-side too
    onFileSelected(file);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) inputRef.current?.click();
      }}
      className={`group border-2 border-dashed rounded-2xl px-8 py-14 text-center transition-all cursor-pointer
        ${isDragging ? "border-accent bg-accent-soft scale-[1.01]" : "border-border bg-surface"}
        ${disabled ? "opacity-60 cursor-not-allowed" : "hover:border-accent hover:bg-accent-soft/40"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div
        className={`mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center transition-colors
          ${isDragging ? "bg-accent text-white" : "bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white"}`}
      >
        <UploadCloud size={22} strokeWidth={2} />
      </div>
      <p className="text-ink font-medium">
        {isDragging ? "Drop it here" : "Drop your resume here, or click to browse"}
      </p>
      <p className="text-sm text-ink-muted mt-1">PDF or DOCX, up to 5MB</p>
    </div>
  );
}
