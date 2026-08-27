/**
 * Inline, render-blocking script that resolves the theme before first paint,
 * so there is no light/dark flash. Keep it tiny and dependency-free.
 *
 * Resolution: explicit choice in localStorage ("tlp-theme" = light|dark|system),
 * otherwise the OS preference. The result is written to <html data-theme>.
 */
const script = `(function(){try{var k="tlp-theme";var s=localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=(s==="light"||s==="dark")?s:(m?"dark":"light");var e=document.documentElement;e.dataset.theme=t;e.style.colorScheme=t;}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
