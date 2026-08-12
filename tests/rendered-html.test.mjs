import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished PhansiCare experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>PhansiCare — Transform the Ground<\/title>/i);
  assert.match(html, /Transform the ground/);
  assert.match(html, /Visualise my space/i);
  assert.match(html, /Colour explorer/i);
  assert.match(html, /Concept visualisation/i);
  assert.match(html, /og:image/);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("removes the temporary starter preview", async () => {
  const [page, experience, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/PhansiCareExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /force-static/);
  assert.match(experience, /function BeforeAfter/);
  assert.match(layout, /export const metadata/);
  assert.doesNotMatch(`${page}${experience}`, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../app/_sites-preview/preview.css", import.meta.url)));
});

test("declares a Vercel static deployment contract", async () => {
  const [vercelConfigText, nextConfig, packageJsonText] = await Promise.all([
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const vercelConfig = JSON.parse(vercelConfigText);
  const packageJson = JSON.parse(packageJsonText);

  assert.equal(vercelConfig.framework, null);
  assert.equal(vercelConfig.buildCommand, "npm run build:vercel");
  assert.equal(vercelConfig.outputDirectory, "dist/client");
  assert.equal(vercelConfig.installCommand, "npm ci");
  assert.equal(packageJson.scripts["build:vercel"], "vinext build");
  assert.match(nextConfig, /process\.env\.VERCEL === "1"/);
  assert.match(nextConfig, /output: isStaticExport \? "export"/);
});
