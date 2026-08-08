import type { User, Resume } from "./api";
import { ApiError, setToken } from "./api";

// Simulates network latency so loading states are visible during testing.
function delay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const fakeUsers = new Map<string, string>(); // email -> password

const fakeParsedResume: Resume["parsed_data"] = {
  contact: ["Jane Doe", "jane.doe@email.com", "+1 555-0100"],
  skills: ["Python", "React", "SQL", "AWS", "Docker", "FastAPI"],
  experience: [
    "Software Engineering Intern, Acme Corp — built internal tooling for data pipelines",
    "Teaching Assistant, Data Structures — led weekly lab sections for 40 students",
  ],
  projects: [
    "Resume Tailor — full-stack app for matching resumes to job descriptions",
    "Campus Events App — React Native app with 200+ active student users",
  ],
  education: ["B.S. Computer Science, State University — expected 2027"],
  raw_text: "(mock parsed text would appear here)",
};

export const mockApi = {
  async signup(email: string, password: string): Promise<User> {
    await delay();
    if (fakeUsers.has(email)) {
      throw new ApiError(400, "Could not create account with those details");
    }
    fakeUsers.set(email, password);
    return { id: "mock-user-1", email };
  },

  async login(email: string, password: string): Promise<string> {
    await delay();
    const stored = fakeUsers.get(email);
    // In mock mode, allow login even without a prior signup, so you can test
    // the login screen directly — but still enforce a matching password if
    // the account was created via signup in this same session.
    if (stored !== undefined && stored !== password) {
      throw new ApiError(401, "Incorrect email or password");
    }
    const fakeToken = "mock-jwt-token";
    setToken(fakeToken);
    return fakeToken;
  },

  async uploadResume(file: File): Promise<Resume> {
    await delay(900);
    if (file.size > 5 * 1024 * 1024) {
      throw new ApiError(413, "File exceeds 5MB limit");
    }
    return {
      id: "mock-resume-1",
      original_filename: file.name,
      parsed_data: fakeParsedResume,
    };
  },

  async getResume(id: string): Promise<Resume> {
    await delay();
    return { id, original_filename: "resume.pdf", parsed_data: fakeParsedResume };
  },
};
