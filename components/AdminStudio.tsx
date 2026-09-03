"use client";

import { useEffect, useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { analyseImageFile } from "@/lib/asset-analysis";
import { firebaseConfigured } from "@/lib/firebase-client";
import {
  loadAllProjectsForAdmin,
  loadSiteProfile,
  saveProjectToCloud,
  saveSiteProfile,
  uploadPortfolioImage
} from "@/lib/firebase-content";
import { composeProject } from "@/lib/layout-engine";
import {
  PROJECT_TYPE_LABELS,
  type AssetKind,
  type AssetWeight,
  type Project,
  type ProjectAsset,
  type ProjectType
} from "@/lib/portfolio-model";
import {
  defaultSiteProfile,
  type SiteLink,
  type SiteProfile
} from "@/data/site";
import styles from "./AdminStudio.module.css";

function emptyProject(): Project {
  return {
    slug: "",
    title: "",
    client: "",
    year: String(new Date().getFullYear()),
    type: "brand-identity",
    category: PROJECT_TYPE_LABELS["brand-identity"],
    description: "",
    challenge: "",
    objective: "",
    audience: "",
    services: [],
    palette: [],
    assets: [],
    featured: false,
    featuredOrder: undefined,
    published: false,
    layoutVersion: 2
  };
}

export function AdminStudio() {
  const [library, setLibrary] = useState<Project[]>(projects);
  const [draft, setDraft] = useState<Project>(projects[0] ?? emptyProject());
  const [profile, setProfile] = useState<SiteProfile>(defaultSiteProfile);
  const [activeTab, setActiveTab] = useState<"content" | "assets" | "publish" | "site">("content");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!firebaseConfigured) return;

    Promise.all([loadAllProjectsForAdmin(), loadSiteProfile()])
      .then(([cloudProjects, cloudProfile]) => {
        if (cloudProjects.length) {
          setLibrary(cloudProjects);
          setDraft(cloudProjects[0]);
        }
        setProfile(cloudProfile);
      })
      .catch(() => setMessage("Could not load cloud content. Seed content is still available."));
  }, []);

  const blocks = useMemo(() => composeProject(draft), [draft]);

  function patch<K extends keyof Project>(key: K, value: Project[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function chooseProject(slug: string) {
    const project = library.find((item) => item.slug === slug);
    if (project) setDraft(project);
  }

  function newProject() {
    setDraft(emptyProject());
    setActiveTab("content");
  }

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;

    setBusy(true);
    setMessage("");

    try {
      const fileArray = Array.from(files);
      const slug = draft.slug || slugify(draft.title || "untitled-project");
      const additions: ProjectAsset[] = [];

      for (let index = 0; index < fileArray.length; index += 1) {
        const file = fileArray[index];
        const analysis = await analyseImageFile(
          file,
          draft.type,
          draft.assets.length + index,
          draft.assets.length + fileArray.length
        );

        const src = firebaseConfigured
          ? await uploadPortfolioImage(file, slug)
          : URL.createObjectURL(file);

        additions.push({
          ...analysis,
          src,
          alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")
        });
      }

      patch("assets", [...draft.assets, ...additions]);
      setMessage(
        firebaseConfigured
          ? "Assets uploaded and analysed."
          : "Preview mode: assets are only in this browser."
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  function updateAsset(index: number, changes: Partial<ProjectAsset>) {
    patch(
      "assets",
      draft.assets.map((asset, assetIndex) =>
        assetIndex === index ? { ...asset, ...changes } : asset
      )
    );
  }

  function removeAsset(index: number) {
    patch(
      "assets",
      draft.assets.filter((_, assetIndex) => assetIndex !== index)
    );
  }

  function moveAsset(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= draft.assets.length) return;

    const next = [...draft.assets];
    [next[index], next[target]] = [next[target], next[index]];

    patch(
      "assets",
      next.map((asset, assetIndex) => ({ ...asset, order: assetIndex }))
    );
  }

  async function save(published = draft.published) {
    const normalized: Project = {
      ...draft,
      slug: draft.slug || slugify(draft.title),
      category: draft.category || PROJECT_TYPE_LABELS[draft.type],
      published
    };

    setBusy(true);
    setMessage("");

    try {
      if (firebaseConfigured) {
        await saveProjectToCloud(normalized);
        setMessage(published ? "Published to Firestore." : "Draft saved to Firestore.");
      } else {
        localStorage.setItem(
          `portfolio-project:${normalized.slug}`,
          JSON.stringify(normalized)
        );
        setMessage("Saved locally. Firebase is not configured in this environment.");
      }

      setDraft(normalized);
      setLibrary((current) => {
        const remaining = current.filter((item) => item.slug !== normalized.slug);
        return [normalized, ...remaining];
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  function patchProfile<K extends keyof SiteProfile>(key: K, value: SiteProfile[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function updateLink(index: number, changes: Partial<SiteLink>) {
    patchProfile(
      "links",
      profile.links.map((link, linkIndex) =>
        linkIndex === index ? { ...link, ...changes } : link
      )
    );
  }

  function addLink() {
    patchProfile("links", [
      ...profile.links,
      {
        id: crypto.randomUUID(),
        label: "New link",
        href: "",
        enabled: false,
        type: "social"
      }
    ]);
  }

  function removeLink(index: number) {
    patchProfile("links", profile.links.filter((_, linkIndex) => linkIndex !== index));
  }

  async function saveProfile() {
    setBusy(true);
    setMessage("");

    try {
      if (firebaseConfigured) {
        await saveSiteProfile(profile);
        setMessage("Contact details and links published.");
      } else {
        localStorage.setItem("portfolio-site-profile", JSON.stringify(profile));
        setMessage("Site details saved locally. Firebase is not configured here.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save site details.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <a className={styles.brand} href="/">Onyedika.</a>

        <button className={styles.newButton} onClick={newProject}>
          + New project
        </button>

        <div className={styles.projectList}>
          {library.map((project) => (
            <button
              key={project.slug}
              className={project.slug === draft.slug ? styles.activeProject : ""}
              onClick={() => chooseProject(project.slug)}
            >
              <span>{project.title}</span>
              <small>
                {project.published ? "Published" : "Draft"}
                {project.featured ? ` · Home${project.featuredOrder ? ` #${project.featuredOrder}` : ""}` : ""}
              </small>
            </button>
          ))}
        </div>

        <div className={styles.cloudState}>
          <i className={firebaseConfigured ? styles.online : ""} />
          {firebaseConfigured ? "Firebase connected" : "Local preview"}
        </div>
      </aside>

      <section className={styles.main}>
        <header className={styles.header}>
          <div>
            <span>Portfolio Studio</span>
            <h1>{draft.title || "Untitled project"}</h1>
          </div>

          <div className={styles.headerActions}>
            {activeTab === "site" ? (
              <button className={styles.publish} onClick={saveProfile} disabled={busy}>
                Save site details
              </button>
            ) : (
              <>
                <button onClick={() => save(false)} disabled={busy}>Save draft</button>
                <button className={styles.publish} onClick={() => save(true)} disabled={busy}>
                  Publish
                </button>
              </>
            )}
          </div>
        </header>

        <nav className={styles.tabs}>
          <button className={activeTab === "content" ? styles.activeTab : ""} onClick={() => setActiveTab("content")}>Content</button>
          <button className={activeTab === "assets" ? styles.activeTab : ""} onClick={() => setActiveTab("assets")}>Assets · {draft.assets.length}</button>
          <button className={activeTab === "publish" ? styles.activeTab : ""} onClick={() => setActiveTab("publish")}>Presentation</button>
          <button className={activeTab === "site" ? styles.activeTab : ""} onClick={() => setActiveTab("site")}>Contact & links</button>
        </nav>

        {activeTab === "content" ? (
          <div className={styles.contentGrid}>
            <div className={styles.card}>
              <label>Project title<input value={draft.title} onChange={(event) => patch("title", event.target.value)} /></label>
              <label>Client<input value={draft.client} onChange={(event) => patch("client", event.target.value)} /></label>
              <label>Year<input value={draft.year} onChange={(event) => patch("year", event.target.value)} /></label>

              <label>
                Work type
                <select
                  value={draft.type}
                  onChange={(event) => {
                    const type = event.target.value as ProjectType;
                    setDraft((current) => ({
                      ...current,
                      type,
                      category: PROJECT_TYPE_LABELS[type]
                    }));
                  }}
                >
                  {Object.entries(PROJECT_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>

              <label>Category label<input value={draft.category} onChange={(event) => patch("category", event.target.value)} /></label>
              <label>Short description<textarea rows={4} value={draft.description} onChange={(event) => patch("description", event.target.value)} /></label>
            </div>

            <div className={styles.card}>
              <label>Challenge<textarea rows={5} value={draft.challenge} onChange={(event) => patch("challenge", event.target.value)} /></label>
              <label>Objective<textarea rows={4} value={draft.objective} onChange={(event) => patch("objective", event.target.value)} /></label>
              <label>Audience<input value={draft.audience} onChange={(event) => patch("audience", event.target.value)} /></label>
              <label>Services<input value={draft.services.join(", ")} onChange={(event) => patch("services", splitList(event.target.value))} /></label>
              <label>Palette<input value={draft.palette.join(", ")} onChange={(event) => patch("palette", splitList(event.target.value))} /></label>

              <label className={styles.check}>
                <input type="checkbox" checked={Boolean(draft.featured)} onChange={(event) => patch("featured", event.target.checked)} />
                Feature this project on the homepage
              </label>

              {draft.featured ? (
                <label>
                  Homepage position (1–6)
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={draft.featuredOrder ?? ""}
                    placeholder="1"
                    onChange={(event) => {
                      const value = event.target.value;
                      patch("featuredOrder", value ? Math.min(6, Math.max(1, Number(value))) : undefined);
                    }}
                  />
                </label>
              ) : null}
            </div>
          </div>
        ) : null}

        {activeTab === "assets" ? (
          <div className={styles.assetSection}>
            <div className={styles.assetToolbar}>
              <div>
                <span>Raw work in</span>
                <strong>Presentation out</strong>
              </div>
              <label>
                Add images
                <input type="file" multiple accept="image/*" onChange={(event) => addFiles(event.target.files)} />
              </label>
            </div>

            {!draft.assets.length ? (
              <div className={styles.empty}>Upload the work. Do not arrange it manually first.</div>
            ) : (
              <div className={styles.assetGrid}>
                {draft.assets.map((asset, index) => (
                  <article className={styles.assetCard} key={asset.id ?? `${asset.src}-${index}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset.src} alt="" />

                    <div className={styles.assetFields}>
                      <small>{asset.ratio}{asset.width && asset.height ? ` · ${asset.width} × ${asset.height}` : ""}</small>
                      <select value={asset.kind} onChange={(event) => updateAsset(index, { kind: event.target.value as AssetKind })}>
                        {["logo","pattern","mockup","presentation","single","campaign","poster","cover","social","process","visual"].map((kind) => (
                          <option key={kind} value={kind}>{kind}</option>
                        ))}
                      </select>

                      <select value={asset.weight ?? "support"} onChange={(event) => updateAsset(index, { weight: event.target.value as AssetWeight })}>
                        <option value="hero">hero</option>
                        <option value="major">major</option>
                        <option value="support">support</option>
                      </select>

                      <input value={asset.group ?? ""} placeholder="group" onChange={(event) => updateAsset(index, { group: event.target.value })} />
                      <input value={asset.alt} placeholder="Accessible image description" onChange={(event) => updateAsset(index, { alt: event.target.value })} />
                    </div>

                    <div className={styles.assetActions}>
                      <button onClick={() => moveAsset(index, -1)}>↑</button>
                      <button onClick={() => moveAsset(index, 1)}>↓</button>
                      <button onClick={() => removeAsset(index)}>Remove</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {activeTab === "publish" ? (
          <div className={styles.presentation}>
            <div className={styles.presentationIntro}>
              <span>Deterministic layout engine · V2</span>
              <h2>{blocks.length} presentation blocks generated.</h2>
              <p>
                Layout now changes by project type. Branding, campaigns, single designs,
                posters and covers no longer get forced into the same case-study structure.
              </p>
            </div>

            <div className={styles.blockList}>
              {blocks.map((block, index) => (
                <div key={`${block.type}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{block.type}</strong>
                  <small>{block.assets.length} asset{block.assets.length === 1 ? "" : "s"}</small>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "site" ? (
          <div className={styles.siteSettings}>
            <div className={styles.card}>
              <span className={styles.settingKicker}>Public contact</span>
              <label>Name<input value={profile.name} onChange={(event) => patchProfile("name", event.target.value)} /></label>
              <label>Professional title<input value={profile.role} onChange={(event) => patchProfile("role", event.target.value)} /></label>
              <label>Email<input type="email" value={profile.email} onChange={(event) => patchProfile("email", event.target.value)} /></label>
              <label>Phone number<input value={profile.phone} onChange={(event) => patchProfile("phone", event.target.value)} /></label>
              <label>Displayed phone<input value={profile.phoneDisplay} onChange={(event) => patchProfile("phoneDisplay", event.target.value)} /></label>
              <label>Location / availability<input value={profile.location} onChange={(event) => patchProfile("location", event.target.value)} /></label>
            </div>

            <div className={styles.linkManager}>
              <div className={styles.linkHeader}>
                <div>
                  <span className={styles.settingKicker}>Public links</span>
                  <h2>Add a link only when it is ready.</h2>
                </div>
                <button onClick={addLink}>+ Add link</button>
              </div>

              <div className={styles.linkList}>
                {profile.links.map((link, index) => (
                  <div className={styles.linkRow} key={link.id}>
                    <input aria-label="Link label" value={link.label} onChange={(event) => updateLink(index, { label: event.target.value })} />
                    <input aria-label="Link URL" value={link.href} placeholder="https://" onChange={(event) => updateLink(index, { href: event.target.value })} />
                    <select aria-label="Link type" value={link.type} onChange={(event) => updateLink(index, { type: event.target.value as SiteLink["type"] })}>
                      <option value="social">Social</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                      <option value="other">Other</option>
                    </select>
                    <label className={styles.linkToggle}>
                      <input type="checkbox" checked={link.enabled} onChange={(event) => updateLink(index, { enabled: event.target.checked })} />
                      Live
                    </label>
                    <button className={styles.removeLink} onClick={() => removeLink(index)}>Remove</button>
                  </div>
                ))}
              </div>

              <p className={styles.linkNote}>
                Disabled links stay in the studio but are hidden from the public site.
              </p>
            </div>
          </div>
        ) : null}

        {message ? <div className={styles.toast}>{message}</div> : null}
      </section>
    </main>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
