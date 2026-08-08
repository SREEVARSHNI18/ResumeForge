import { Briefcase, FolderGit2, GraduationCap, Sparkles, FileText } from "lucide-react";
import type { Resume } from "../lib/api";
import { IS_MOCK_MODE } from "./MockModeBanner";

function Section({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: typeof Briefcase;
  items: string[];
}) {
  return (
    <div className="border-t border-border pt-5 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-1.5 mb-2.5">
        <Icon size={14} className="text-ink-muted" />
        <h3 className="text-sm font-medium text-ink-muted uppercase tracking-wide">{title}</h3>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-ink-muted italic">Nothing detected in this section yet.</p>
      ) : (
        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className="text-[15px] leading-relaxed text-ink pl-0">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ParsedResumeView({ resume }: { resume: Resume }) {
  const { skills, experience, projects, education } = resume.parsed_data;

  return (
    <div className="bg-surface border border-border rounded-2xl shadow-sm p-7">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={18} className="text-ink-muted shrink-0" />
          <h2 className="text-lg text-ink truncate">{resume.original_filename}</h2>
        </div>
        <span
          className={`shrink-0 text-xs font-mono font-medium rounded-full px-2.5 py-1 ${
            IS_MOCK_MODE ? "text-gap bg-gap-soft" : "text-accent bg-accent-soft"
          }`}
        >
          {IS_MOCK_MODE ? "example data" : "parsed"}
        </span>
      </div>

      {skills.length > 0 && (
        <div className="border-t border-border pt-5 mb-5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Sparkles size={14} className="text-ink-muted" />
            <h3 className="text-sm font-medium text-ink-muted uppercase tracking-wide">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="text-sm font-medium bg-accent-soft text-accent-strong rounded-md px-2.5 py-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-5">
        <Section title="Experience" icon={Briefcase} items={experience} />
        <Section title="Projects" icon={FolderGit2} items={projects} />
        <Section title="Education" icon={GraduationCap} items={education} />
      </div>
    </div>
  );
}
