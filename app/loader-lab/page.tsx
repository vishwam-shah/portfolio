"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import dynamic from "next/dynamic";

/**
 * Scratch page for picking the preloader backdrop. Visit /loader-lab.
 * Not linked from anywhere; the root layout skips its chrome via SiteChrome.
 * Delete once the choice is locked in.
 *
 * Shown bare, exactly as the preloader renders them — no mark, no type, no
 * scrim. Only the selected one mounts, since three live WebGL2 contexts plus
 * remounts would start hitting the browser's per-page context cap.
 *
 * All three ride their own default colours. Anything dark-by-default vanished
 * against the ink stage, which is what made earlier candidates look broken
 * when they were in fact drawing correctly.
 *
 * FORCE MOTION patches window.matchMedia so these see prefers-reduced-motion
 * as false. They each read it directly and freeze when set (MoltenMetal
 * evaluates it at module scope; LiquidChrome and Iridescence read it during
 * setup). Preview-only hack, confined to this page.
 */

type Backdrop = React.ComponentType<Record<string, unknown>>;

const load = (name: string) =>
  dynamic(() => import(`@/components/reactbits/${name}`), {
    ssr: false,
    loading: () => null,
  }) as Backdrop;

const OPTIONS: { label: string; Comp: Backdrop }[] = [
  { label: "03 · LiquidChrome", Comp: load("LiquidChrome") },
  { label: "04 · MoltenMetal", Comp: load("MoltenMetal") },
  { label: "07 · Iridescence", Comp: load("Iridescence") },
];

function useForceMotion(on: boolean) {
  const original = useRef<typeof window.matchMedia | null>(null);
  useLayoutEffect(() => {
    if (!original.current) original.current = window.matchMedia.bind(window);
    const orig = original.current;
    if (on) {
      window.matchMedia = ((query: string) => {
        if (query.includes("prefers-reduced-motion")) {
          return {
            matches: false, media: query, onchange: null,
            addEventListener: () => {}, removeEventListener: () => {},
            addListener: () => {}, removeListener: () => {},
            dispatchEvent: () => false,
          } as unknown as MediaQueryList;
        }
        return orig(query);
      }) as typeof window.matchMedia;
    } else {
      window.matchMedia = orig;
    }
    return () => {
      if (original.current) window.matchMedia = original.current;
    };
  }, [on]);
}

// A media query is an external store, so this is the rule-correct way to read
// it: calling setState synchronously inside an effect trips
// react-hooks/set-state-in-effect, and the server snapshot keeps SSR honest.
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function LoaderLab() {
  const [i, setI] = useState(0);
  const [force, setForce] = useState(true);
  const osReduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const [diag, setDiag] = useState("probing…");
  const [jsError, setJsError] = useState("");

  const host = useRef<HTMLDivElement>(null);
  useForceMotion(force);

  useEffect(() => {
    const onErr = (e: ErrorEvent) => setJsError(e.message || String(e));
    const onRej = (e: PromiseRejectionEvent) => setJsError(String(e.reason));
    window.addEventListener("error", onErr);
    window.addEventListener("unhandledrejection", onRej);
    return () => {
      window.removeEventListener("error", onErr);
      window.removeEventListener("unhandledrejection", onRej);
    };
  }, []);

  // probe the mounted backdrop: did it create a canvas, and is it sized?
  useEffect(() => {
    const t = setTimeout(() => {
      const cv = host.current?.querySelector("canvas");
      if (!cv) {
        setDiag("FAIL · component rendered no <canvas>");
        return;
      }
      const r = cv.getBoundingClientRect();
      let gl = "webgl2 ok";
      try {
        if (!document.createElement("canvas").getContext("webgl2"))
          gl = "webgl2 UNAVAILABLE";
      } catch {
        gl = "webgl2 threw";
      }
      const dead = cv.width <= 1 || cv.height <= 1;
      setDiag(
        `${dead ? "FAIL · " : "ok · "}css ${Math.round(r.width)}x${Math.round(
          r.height
        )} · buffer ${cv.width}x${cv.height} · ${gl}`
      );
    }, 1200);
    return () => clearTimeout(t);
  }, [i, force]);

  const { Comp } = OPTIONS[i];

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#060608] font-mono text-white">
      <div ref={host} className="absolute inset-0 z-[1]">
        <Comp key={`${i}-${force}`} className="h-full w-full" />
      </div>

      {/* controls */}
      <div className="absolute inset-x-0 top-0 z-[20] flex flex-wrap items-center gap-1.5 p-3">
        {OPTIONS.map((o, k) => (
          <button
            key={o.label}
            onClick={() => {
              setDiag("probing…");
              setJsError("");
              setI(k);
            }}
            className={
              "rounded-sm border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition " +
              (k === i
                ? "border-white/70 bg-white/15 text-white"
                : "border-white/20 bg-black/40 text-white/60 hover:border-white/40 hover:text-white")
            }
          >
            {o.label}
          </button>
        ))}
        <span className="mx-2 h-4 w-px bg-white/20" />
        <button
          onClick={() => {
            setDiag("probing…");
            setJsError("");
            setForce((s) => !s);
          }}
          className={
            "rounded-sm border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition " +
            (force
              ? "border-emerald-400/70 bg-emerald-400/15 text-emerald-200"
              : "border-white/20 bg-black/40 text-white/60 hover:text-white")
          }
        >
          force motion {force ? "on" : "off"}
        </button>
      </div>

      {/* diagnostics */}
      <div className="absolute inset-x-0 bottom-0 z-[20] space-y-1 p-3 text-[10px] uppercase tracking-[0.2em]">
        {osReduced && (
          <div className="rounded-sm border border-amber-400/40 bg-amber-400/10 px-2.5 py-1.5 text-amber-200">
            OS reduce-motion is ON — that is why these freeze. force motion overrides it here only.
            real fix: windows settings → accessibility → visual effects → animation effects: on
          </div>
        )}
        {jsError && (
          <div className="rounded-sm border border-red-400/50 bg-red-500/15 px-2.5 py-1.5 text-red-200">
            js error: {jsError}
          </div>
        )}
        <div
          className={
            "rounded-sm border px-2.5 py-1.5 " +
            (diag.startsWith("FAIL")
              ? "border-red-400/50 bg-red-500/15 text-red-200"
              : "border-white/20 bg-black/50 text-white/60")
          }
        >
          {OPTIONS[i].label} → {diag}
        </div>
      </div>
    </div>
  );
}