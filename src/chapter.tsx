import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import chapters from './chapters.json';

type Chapter = (typeof chapters)[number];

// React owns the initial structure. The existing simulation owns its descendants
// after bootstrap; do not rerender this root or enable StrictMode replay here.
function ChapterShell({ chapter }: { chapter: Chapter }) {
  return <>
    <header className="topbar"><a href="/" className="brand">Atlas of Physics</a><span className="crumb">{chapter.crumb}</span><nav className="dots" id="dots" aria-label="Pages" /></header>
    <div className="scroll-space" id="space" />
    <main className="book" id="book">
      <section className="page left" id="left" aria-live="polite">
        <article className="sheet" id="sheet" /><article className="plate" id="plate" hidden />
        <footer className="folio"><span>{chapter.folio}</span><span id="folio">1</span></footer>
      </section>
      <section className="page right" id="right"><div className="figure">
        <canvas id="gl" aria-label={chapter.canvasLabel} /><div id="labels" aria-hidden="true" />
        <div className="corner tl" id="figno">Fig. 1</div><div className="corner tr" id="figtitle" />
        <div className="corner bl" id="hint">Drag to turn · shift-drag to pan · click to break it down</div><div className="corner br readout" id="readout" />
      </div></section>
      <div className="leaf" id="leaf" aria-hidden="true"><div className="leaf-front"><span id="leafnext" /></div><div className="leaf-back"><article className="sheet" id="leafsheet" /></div></div>
      <div className="spine" aria-hidden="true" />
    </main>
    <p className="scroll-cue" id="cue">Scroll to turn the page</p>
  </>;
}

async function boot() {
  const chapter = chapters.find(c => c.slug === document.body.dataset.chapter);
  if (!chapter) throw new Error('Unknown physics chapter');
  const modules = import.meta.glob('../*/main.js');
  const load = modules[`../${chapter.slug}/main.js`];
  if (!load) throw new Error(`Missing simulation: ${chapter.slug}`);
  const root = createRoot(document.getElementById('root')!);
  flushSync(() => root.render(<ChapterShell chapter={chapter} />));
  await load();
}

void boot().catch(error => {
  console.error('Chapter failed to start', error);
  const notice = document.createElement('aside');
  notice.setAttribute('role', 'alert');
  notice.style.cssText = 'position:fixed;inset:70px 16px auto;z-index:1000;background:#fff;padding:24px;border:1px solid #aaa';
  notice.textContent = 'This simulation could not start. Reload the page and check that WebGL is enabled in your browser. ';
  const link = document.createElement('a'); link.href = '/'; link.textContent = 'Return to chapters'; notice.append(link);
  document.body.append(notice);
});
