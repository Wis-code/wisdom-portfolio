"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { firebaseConfigured } from "@/lib/firebase-client";
import { saveProjectToCloud, uploadPortfolioImage } from "@/lib/firebase-content";

type DraftAsset = {
  id: string;
  name: string;
  src: string;
  ratio: string;
  kind: string;
};

export function AdminStudio() {
  const seed = projects[0];
  const [tab, setTab] = useState<"projects" | "reviews" | "settings">("projects");
  const [title, setTitle] = useState(seed.title);
  const [category, setCategory] = useState(seed.category);
  const [description, setDescription] = useState(seed.description);
  const [assets, setAssets] = useState<DraftAsset[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const layoutSummary = useMemo(() => {
    const squares = assets.filter((asset) => asset.ratio === "square").length;
    const wide = assets.filter((asset) => asset.ratio === "wide" || asset.ratio === "landscape").length;
    const portrait = assets.filter((asset) => asset.ratio === "portrait").length;
    return { squares, wide, portrait };
  }, [assets]);

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setMessage("");
    try {
      for (const file of Array.from(files)) {
        const dimensions = await readImageSize(file);
        const ratio = dimensions.width / dimensions.height;
        const ratioName = ratio > 2.2 ? "wide" : ratio > 1.12 ? "landscape" : ratio < 0.82 ? "portrait" : "square";
        const kind = inferKind(file.name);
        const src = firebaseConfigured
          ? await uploadPortfolioImage(file, slugify(title))
          : URL.createObjectURL(file);
        setAssets((current) => [...current, { id: crypto.randomUUID(), name: file.name, src, ratio: ratioName, kind }]);
      }
      setMessage(firebaseConfigured ? "Assets uploaded to cloud storage." : "Preview mode: assets are only in this browser until Firebase is connected.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    const draft = {
      slug: slugify(title),
      title,
      category,
      description,
      published: false,
      assets
    };
    if (!firebaseConfigured) {
      localStorage.setItem("portfolio-project-draft", JSON.stringify(draft));
      setMessage("Saved locally. Add Firebase keys to make this cloud-editable.");
      return;
    }
    setBusy(true);
    try {
      await saveProjectToCloud(draft);
      setMessage("Draft saved to Firestore.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/">Onyedika.</a>
        <div className="admin-nav">
          <button className={tab === "projects" ? "active" : ""} onClick={() => setTab("projects")}>Projects</button>
          <button className={tab === "reviews" ? "active" : ""} onClick={() => setTab("reviews")}>Client reviews</button>
          <button className={tab === "settings" ? "active" : ""} onClick={() => setTab("settings")}>Site settings</button>
        </div>
        <div className={`cloud-status ${firebaseConfigured ? "online" : "offline"}`}>
          <span /> {firebaseConfigured ? "Firebase connected" : "Local preview mode"}
        </div>
      </aside>

      <section className="admin-main">
        {tab === "projects" ? (
          <>
            <div className="admin-heading">
              <div>
                <p>Project composer</p>
                <h1>Let the work decide the layout.</h1>
              </div>
              <button className="admin-save" onClick={save} disabled={busy}>{busy ? "Working…" : "Save draft"}</button>
            </div>

            <div className="admin-editor-grid">
              <div className="admin-form-card">
                <label>Project name<input value={title} onChange={(event) => setTitle(event.target.value)} /></label>
                <label>Work type<select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option>Brand Identity & Visual System</option>
                  <option>Campaign / Series</option>
                  <option>Single Flyer</option>
                  <option>Poster</option>
                  <option>Book Cover</option>
                  <option>Experimental</option>
                </select></label>
                <label>Project context<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={6} /></label>
              </div>

              <div className="admin-upload-card">
                <div className="admin-upload-title">
                  <div><span>Assets</span><strong>{assets.length || "—"}</strong></div>
                  <label className="upload-button">Add images<input type="file" multiple accept="image/*" onChange={(event) => addFiles(event.target.files)} /></label>
                </div>
                {!assets.length ? <div className="drop-empty">Drop the raw work here. No arranging first.</div> : (
                  <div className="admin-assets">
                    {assets.map((asset) => (
                      <figure key={asset.id}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={asset.src} alt="" />
                        <figcaption><span>{asset.kind}</span><span>{asset.ratio}</span></figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="ai-layout-panel">
              <div>
                <p>Presentation intelligence · V1</p>
                <h2>Geometry first. AI later.</h2>
                <span>The first pass already understands aspect ratios and probable asset types without spending an AI call.</span>
              </div>
              <div className="layout-metrics">
                <div><strong>{layoutSummary.wide}</strong><span>Wide</span></div>
                <div><strong>{layoutSummary.squares}</strong><span>Square</span></div>
                <div><strong>{layoutSummary.portrait}</strong><span>Portrait</span></div>
              </div>
            </div>
          </>
        ) : tab === "reviews" ? (
          <div className="admin-placeholder">
            <p>Client reviews</p>
            <h1>Upload the evidence, not rewritten praise.</h1>
            <span>This panel is reserved for WhatsApp / email / DM screenshots, client name, project link, crop control and publish status.</span>
          </div>
        ) : (
          <div className="admin-placeholder">
            <p>Site settings</p>
            <h1>One place for the parts that should change without code.</h1>
            <span>Hero copy, WhatsApp destination, availability, featured projects and future marketing-site handoff will live here.</span>
          </div>
        )}
        {message ? <div className="admin-toast">{message}</div> : null}
      </section>
    </main>
  );
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function inferKind(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("logo") || lower.includes("wordmark")) return "logo";
  if (lower.includes("pattern")) return "pattern";
  if (lower.includes("mockup")) return "mockup";
  if (lower.includes("flyer") || lower.includes("poster")) return "single";
  return "visual";
}

function readImageSize(file: File) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    const src = URL.createObjectURL(file);
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
      URL.revokeObjectURL(src);
    };
    image.onerror = () => reject(new Error(`Could not read ${file.name}`));
    image.src = src;
  });
}
