import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getFirebase } from "@/lib/firebase-client";

export async function saveProjectToCloud(project: Record<string, unknown>) {
  const firebase = getFirebase();
  if (!firebase) throw new Error("Firebase is not configured yet.");
  const slug = String(project.slug || "untitled-project");
  await setDoc(doc(firebase.db, "projects", slug), project, { merge: true });
}

export async function uploadPortfolioImage(file: File, projectSlug: string) {
  const firebase = getFirebase();
  if (!firebase) throw new Error("Firebase is not configured yet.");
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
  const path = `portfolio/projects/${projectSlug}/${Date.now()}-${safeName}`;
  const task = uploadBytesResumable(ref(firebase.storage, path), file, {
    contentType: file.type,
    cacheControl: "public,max-age=31536000,immutable"
  });

  await new Promise<void>((resolve, reject) => {
    task.on("state_changed", undefined, reject, () => resolve());
  });

  return getDownloadURL(task.snapshot.ref);
}
