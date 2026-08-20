import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getFirebase } from "@/lib/firebase-client";
import { isProject, type Project } from "@/lib/portfolio-model";

export async function saveProjectToCloud(project: Project) {
  const firebase = getFirebase();
  if (!firebase) throw new Error("Firebase is not configured yet.");

  const payload = {
    ...project,
    updatedAt: serverTimestamp()
  };

  await setDoc(doc(firebase.db, "projects", project.slug), payload, {
    merge: true
  });
}

export async function loadPublishedProjectsFromCloud(): Promise<Project[]> {
  const firebase = getFirebase();
  if (!firebase) return [];

  const snapshot = await getDocs(
    query(
      collection(firebase.db, "projects"),
      where("published", "==", true)
    )
  );

  return snapshot.docs
    .map((item) => item.data())
    .filter(isProject)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

export async function loadProjectFromCloud(slug: string): Promise<Project | null> {
  const firebase = getFirebase();
  if (!firebase) return null;

  const snapshot = await getDoc(doc(firebase.db, "projects", slug));
  if (!snapshot.exists()) return null;

  const project = snapshot.data();
  return isProject(project) ? project : null;
}

export async function loadAllProjectsForAdmin(): Promise<Project[]> {
  const firebase = getFirebase();
  if (!firebase) return [];

  const snapshot = await getDocs(
    query(collection(firebase.db, "projects"), orderBy("updatedAt", "desc"))
  );

  return snapshot.docs.map((item) => item.data()).filter(isProject);
}

export async function uploadPortfolioImage(file: File, projectSlug: string) {
  const firebase = getFirebase();
  if (!firebase) throw new Error("Firebase is not configured yet.");

  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/^-|-$/g, "");

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
