import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

const team = [
  { name: 'Lookman', role: 'Direction artistique', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80' },
  { name: 'Mika', role: 'Muraliste', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80' },
  { name: 'Tiana', role: 'Peinture studio', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80' },
  { name: 'Noh', role: 'Illustration & matière', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80' },
];

export default function App() {
  const [open, setOpen] = useState(false);
  return <div className="site">
    <header className="nav"><a className="wordmark" href="#top">LOOKMAN<span>®</span></a><nav className={open ? 'navlinks open' : 'navlinks'}>{['À propos','Projets','Notre parcours','Collaboration','Contact'].map((x,i)=><a key={x} href={`#${['about','projects','journey','collaboration','contact'][i]}`} onClick={()=>setOpen(false)}>{x}<sup>0{i+1}</sup></a>)}</nav><button className="menu" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button></header>
    <main id="top">
      <section id="about" className="hero section"><div className="hero-logo"><div className="logo-mark">LOOK<br/>MAN</div><a className="circle-link" href="#contact">Parlons<br/>ensemble <ArrowUpRight size={18}/></a></div><div className="hero-copy"><p className="eyebrow">COLLECTIF D'ARTISTES · MADAGASCAR</p><h1>Peindre des espaces.<br/><em>Créer des traces.</em></h1><p className="lead">LOOKMAN est un collectif de peintres, muralistes et artistes studio. Nous transformons les murs, les matières et les idées en expériences visuelles.</p><a className="text-link" href="#projects">Découvrir notre travail <ArrowUpRight size={16}/></a></div></section>
      <section className="statement section"><p className="eyebrow">01 / À PROPOS</p><p className="statement-text">Nous travaillons entre <em>le geste et l'espace</em>, entre commande et recherche personnelle. Chaque projet commence par une rencontre et finit par une image qui reste.</p></section>
      <section className="team section"><div className="section-head"><p className="eyebrow">02 / L'ÉQUIPE</p><p>Des regards différents.<br/>Une même signature.</p></div><div className="team-grid">{team.map((person,i)=><article className="member" key={person.name}><div className="member-image"><img src={person.image} alt={person.name}/><span>0{i+1}</span></div><h3>{person.name}</h3><p>{person.role}</p></article>)}</div></section>
      <section id="projects" className="preview section"><div className="section-head"><p className="eyebrow">03 / PROJETS</p><a className="text-link" href="#projects">Voir tous les projets <ArrowUpRight size={16}/></a></div><div className="project-feature"><div className="placeholder-art"><span>PROJECT<br/>01</span></div><div className="project-meta"><p className="eyebrow">MURAL · 2026</p><h2>La ville<br/><em>comme toile.</em></h2><p>Une première sélection de travaux sera intégrée ici avec les photographies réelles de LOOKMAN.</p></div></div></section>
      <section id="journey" className="mini-section section"><p className="eyebrow">04 / NOTRE PARCOURS</p><h2>Une histoire en<br/><em>mouvement.</em></h2></section>
      <section id="collaboration" className="mini-section section"><p className="eyebrow">05 / COLLABORATION</p><h2>Créer à plusieurs<br/><em>change tout.</em></h2></section>
      <section id="contact" className="contact section"><p className="eyebrow">06 / CONTACT</p><h2>Un mur.<br/>Une idée.<br/><em>On en parle ?</em></h2><a className="contact-mail" href="mailto:hello@lookman.art">hello@lookman.art <ArrowUpRight size={20}/></a></section>
    </main><footer><span>LOOKMAN®</span><span>Collectif d'artistes · Madagascar</span><span>© 2026</span></footer>
  </div>;
}