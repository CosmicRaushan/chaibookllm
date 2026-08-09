"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoogleLogo, ArrowRight, SignOut } from "@phosphor-icons/react";
import { signInWithGoogle, signOut, fetchAuthSession } from "@/lib/auth";

interface SessionData {
  user?: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  };
}

export default function SignInPage() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadSession() {
      try {
        const data = await fetchAuthSession();
        if (active) {
          setSession(data);
        }
      } catch (err) {
        if (active) {
          setError("Unable to load session. You can still sign in.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadSession();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-border bg-card/80 p-10 shadow-xl shadow-black/5 backdrop-blur-xl">
        <div className="mb-8 flex flex-col gap-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Authentication</p>
          <h1 className="text-4xl font-semibold">Sign in to continue</h1>
          <p className="text-base leading-7 text-muted-foreground">
            Use Google authentication to access your workspace and source data.
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="mb-6 rounded-2xl border border-border bg-muted/50 p-6 text-center text-sm text-foreground/80">
            Loading session...
          </div>
        ) : session?.user ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-background/80 p-6">
              <p className="text-sm  text-muted-foreground">Signed in as</p>
              <p className="mt-3 text-xl font-semibold text-foreground">{session.user.name ?? session.user.email}</p>
              {/* <p className="text-sm text-muted-foreground">{session.user.email}</p> */}
            </div>
            <Button variant="outline" size="lg" onClick={signOut} className="w-full justify-center gap-2">
              <SignOut size={20} />
              Sign out
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              You are already signed in. Return to the app when ready.
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <Button variant="default" size="lg" onClick={signInWithGoogle} className="w-full justify-center gap-2">
              <GoogleLogo size={20} />
              Sign in with Google
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Your authentication is handled by the backend and stored in cookies.
            </p>
          </div>
        )}

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            Back to home <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </div>
    </main>
  );
}
