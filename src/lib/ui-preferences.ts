"use client";

import { useSyncExternalStore } from "react";

/**
 * Viewer preferences that persist in localStorage and are mirrored onto the
 * <html> element as data attributes so CSS can react without a re-render.
 *
 *   vs_theme      "light" | "dark"
 *   vs_saver      "1" | "0"
 *   vs_fontscale  "s" | "m" | "l"   (A- / A / A+ text size control)
 *
 * The inline boot script in app/layout.tsx applies the same keys before the
 * first paint so the page never flashes the wrong theme or size.
 */

export type FontScale = "s" | "m" | "l";
const FONT_SCALES: readonly FontScale[] = ["s", "m", "l"];

const subscribe = (listener: () => void) => {
  const onChange = () => {
    applyPreferences();
    listener();
  };
  window.addEventListener("storage", onChange);
  window.addEventListener("vs-preferences", onChange);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("vs-preferences", onChange);
    media.removeEventListener("change", onChange);
  };
};
const serverFalse = () => false;
const serverScale = (): FontScale => "m";
const noSubscribe = () => () => undefined;

function dataSaver() {
  try {
    return localStorage.getItem("vs_saver") === "1";
  } catch {
    return document.documentElement.dataset.saver === "1";
  }
}
function darkTheme() {
  try {
    const saved = localStorage.getItem("vs_theme");
    return (
      saved === "dark" ||
      (saved !== "light" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  } catch {
    return document.documentElement.dataset.theme === "dark";
  }
}
function fontScale(): FontScale {
  let saved: string | null | undefined;
  try {
    saved = localStorage.getItem("vs_fontscale");
  } catch {
    saved = document.documentElement.dataset.fontscale;
  }
  return FONT_SCALES.includes(saved as FontScale) ? (saved as FontScale) : "m";
}
function applyPreferences() {
  const root = document.documentElement;
  const dark = darkTheme();
  root.dataset.theme = dark ? "dark" : "light";
  root.classList.toggle("dark", dark);
  root.dataset.saver = dataSaver() ? "1" : "0";
  root.dataset.fontscale = fontScale();
}
function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Storage blocked: the attribute below still applies for this tab. */
  }
  const root = document.documentElement;
  if (key === "vs_saver") root.dataset.saver = value;
  else if (key === "vs_fontscale") root.dataset.fontscale = value;
  else root.dataset.theme = value;
  window.dispatchEvent(new Event("vs-preferences"));
}

export function useDataSaver() {
  return useSyncExternalStore(subscribe, dataSaver, serverFalse);
}
export function useDarkTheme() {
  return useSyncExternalStore(subscribe, darkTheme, serverFalse);
}
export function useFontScale() {
  return useSyncExternalStore(subscribe, fontScale, serverScale);
}
export function useHydrated() {
  return useSyncExternalStore(noSubscribe, () => true, serverFalse);
}
export function setDataSaver(on: boolean) {
  write("vs_saver", on ? "1" : "0");
}
export function setDarkTheme(on: boolean) {
  write("vs_theme", on ? "dark" : "light");
}
export function setFontScale(scale: FontScale) {
  write("vs_fontscale", scale);
}
