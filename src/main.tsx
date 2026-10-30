import { createRoot } from 'react-dom/client';
import chapters from './chapters.json';
import './home.css';

const images = import.meta.glob<string>('../img/*.jpg', { eager: true, query: '?url', import: 'default' });
type Chapter = (typeof chapters)[number];

function ChapterCard({ chapter }: { chapter: Chapter }) {
  return <a className="card" href={`/${chapter.slug}/`}>
    <div className="no"><span>No. {String(chapter.number).padStart(2, '0')}</span><span>{chapter.pages} pages</span></div>
    <h2>{chapter.title}</h2><i>{chapter.subtitle}</i>
    <img src={images[`../${chapter.image}`]} alt={chapter.alt} loading={chapter.number > 4 ? 'lazy' : 'eager'} width="450" height="400" />
  </a>;
}

function App() {
  return <>
    <a className="sr-only focus:not-sr-only" href="#chapters">Skip to chapters</a>
    <header><b>Atlas of Physics</b><span><a href="/equations/">Equation sheet</a><a className="gh" href="https://github.com/dchulhan/atlas-of-physics" aria-label="Source on GitHub">GitHub</a></span></header>
    <main id="chapters">
      <section className="hero"><h1>Physics, taken apart.</h1><p>Learn each chapter with in-depth visuals and explanations</p></section>
      {([['mechanics', 'AP Physics 1/C · Mechanics'], ['electromagnetism', 'AP Physics C · Electricity and magnetism']] as const).map(([group, title]) => <section key={group} aria-labelledby={group}>
        <h2 className="section" id={group}>{title}</h2>
        <div className="shelf">{chapters.filter(c => c.group === group).map(chapter => <ChapterCard key={chapter.slug} chapter={chapter} />)}</div>
      </section>)}
    </main>
  </>;
}

createRoot(document.getElementById('root')!).render(<App />);
