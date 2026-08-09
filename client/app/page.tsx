import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),_transparent_20%),linear-gradient(160deg,#7f292f_0%,#4d1016_40%,#1c1314_100%)] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_15%,rgba(0,0,0,0.45))] pointer-events-none" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10 sm:px-10">
        <header className="flex items-center justify-between gap-4 text-sm text-white/80">
          <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-2 shadow-[0_16px_60px_-45px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div>
              <p className="font-bold text-white">Granthaḥ</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white/90 hover:bg-white/10"
            >
              <a href="/sign-in">Login</a>
            </Button>
          </div>
        </header>

        <main className="mt-16 flex flex-1 flex-col justify-center gap-12 rounded-[3rem] border border-white/10 bg-white/10 p-10 shadow-[0_40px_120px_-80px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-14">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.32em] text-white/80">
                  Granthah AI for for everyone
                </span>
                <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  Build smarter notes, prompts, and knowledge workflows with
                  your own LLM Granthah.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-white/75">
                  Granthah LLM blends a warm brick-inspired visual design with
                  glassmorphism and fast Google sign-in, making AI note-taking
                  feel polished, secure, and modern.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button className="min-w-[180px] rounded-3xl bg-white text-black hover:bg-white/90">
                  <a href="/sign-in">Login with Google</a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[180px] rounded-3xl border-white/30 text-white hover:bg-white/10"
                >
                  <a href="/sign-in">Open notebook</a>
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 p-4 shadow-xl shadow-black/20 backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent)]" />
              <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <div className="space-y-2 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                    Notebook cell
                  </p>
                  <h2 className="text-2xl font-semibold text-white">
                    Write prompts in context
                  </h2>
                  <p className="text-sm leading-6 text-white/70">
                    Keep your prompts, answers, and references together in a
                    single notebook experience.
                  </p>
                </div>
                <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="h-3 w-full rounded-full bg-white/10" />
                  <div className="h-3 w-5/6 rounded-full bg-white/10" />
                  <div className="h-3 w-4/6 rounded-full bg-white/10" />
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="mb-3 text-sm uppercase tracking-[0.28em] text-white/70">
                    AI response
                  </p>
                  <p className="text-sm leading-6 text-white/75">
                    Your workspace remembers the conversation, sources, and AI
                    outputs so every note stays connected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60">
          <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Granthah LLM. Crafted for smarter
              note-taking.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/80">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Docs
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
