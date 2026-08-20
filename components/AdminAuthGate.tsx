"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User
} from "firebase/auth";
import { firebaseConfigured, getFirebase } from "@/lib/firebase-client";
import styles from "./AdminAuthGate.module.css";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(!firebaseConfigured);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!firebaseConfigured) return;

    const firebase = getFirebase();
    if (!firebase) return;

    return onAuthStateChanged(firebase.auth, (nextUser) => {
      setUser(nextUser);
      setReady(true);
    });
  }, []);

  async function login(event: FormEvent) {
    event.preventDefault();
    setMessage("");

    const firebase = getFirebase();
    if (!firebase) return;

    try {
      await signInWithEmailAndPassword(firebase.auth, email, password);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not sign in.");
    }
  }

  async function logout() {
    const firebase = getFirebase();
    if (!firebase) return;
    await signOut(firebase.auth);
  }

  if (!ready) {
    return <div className={styles.loading}>Opening Portfolio Studio…</div>;
  }

  if (!firebaseConfigured) {
    return <>{children}</>;
  }

  if (!user) {
    return (
      <main className={styles.shell}>
        <form className={styles.card} onSubmit={login}>
          <span>Portfolio Studio</span>
          <h1>Owner access</h1>
          <p>Sign in with the Firebase account enabled for this portfolio.</p>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button type="submit">Sign in</button>
          {message ? <small>{message}</small> : null}
        </form>
      </main>
    );
  }

  return (
    <>
      <button className={styles.signOut} onClick={logout}>
        Sign out
      </button>
      {children}
    </>
  );
}
