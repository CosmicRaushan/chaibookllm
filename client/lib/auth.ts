
export const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function signInWithGoogle() {
    const response = await fetch(`${apiBaseUrl}/api/auth/sign-in/social`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            provider: "google",
            callbackURL: `${window.location.origin}/`,
        }),
    });




    if (!response.ok) {
        throw new Error("Unable to sign in with Google");
    }

    const data = await response.json();

    if (data.url) {
        window.location.href = data.url;
    }
}

export async function signOut() {
    const response = await fetch(`${apiBaseUrl}/api/auth/sign-out`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Unable to sign out");
    }

    window.location.reload();
}

export async function fetchAuthSession() {
    const response = await fetch(`${apiBaseUrl}/api/auth/get-session`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Unable to load auth session");
    }

    return response.json();
}
