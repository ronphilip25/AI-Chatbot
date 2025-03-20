import { supabase } from "./supabase";

// Sign in with Google
export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) throw error;
}

// Sign up with email & password
export async function signUpWithEmail(email, password) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
}

// Sign in with email & password
export async function signInWithEmail(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
}

// Sign out
export async function signOut() {
  await supabase.auth.signOut();
}

// Get user session
export async function getUser() {
  const session = await supabase.auth.getSession();
  return session.data;
}