import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProject, projects, type Project } from './data/projects';

const team = [
  { name: 'Lookman', role: 'Direction artistique', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80' },
  { name: 'Mika', role: 'Muraliste', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80' },
  { name: 'Tiana', role: 'Peinture studio', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80' },
  { name: 'Noh', role: 'Illustration & matière', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80' },
];

function navigate(hash: string) {
  window.location.hash = hash;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? 'featured' : ''}`} onClick={() => navigate(`project/${project.slug}`)}>
      <div className="project-card-image">
        <img src={project.images[0]} alt={project.title} loading="lazy" />
        <div className="project-card-overlay">
          <span>{project.status}</span>
          <ArrowUpRight size={22} />
        </div>
      </div>
      <div className="project-card-info">
        <div><span className="project-number">{project.number}</span><h2>{project.title}</h2></div>
        <div className="project-card-meta"><span>{project.category}</span><span>{project.year}</span><span>{project.location}</span></div>
      </div>
    </article>
  );
}

function ProjectsPage() {
  return (
    <div className="projects-page">
      <header className="page-intro section">
        <div><p className="eyebrow">03 / PROJETS</p><h1>Ce que nous<br /><em>laissons aux murs.</em></h1></div>
        <div className="page-intro-side"><p>Une sélection de projets muraux, travaux studio et recherches collectives. Certaines pièces sont terminées, d'autres continuent de prendre forme.</p><div className="project-count"><strong>{String(projects.length).padStart(2, '0')}</strong><span>projets<br />présentés</span></div></div>
      </header>

      <main className="projects-list section">
        <div className="projects-grid">
          <ProjectCard project={projects[0]} featured />
          <ProjectCard project={projects[1]} />
          <ProjectCard project={projects[2]} />
          <ProjectCard project={projects[3]} featured />
        </div>
      </main>

      <section className="projects-note section">
        <p className="eyebrow">EN COURS</p>
        <div><span className="status-dot" /> Ligne de fuite — Majunga · 2026</div>
        <p>Un projet n'est pas toujours terminé lorsqu'il est montré. Nous documentons aussi ce qui est encore en train de devenir.</p>
      </section>
      <Footer />
    </div>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const [active, setActive] = useState(0);

  const previous = () => setActive((current) => (current - 1 + project.images.length) % project.images.length);
  const next = () => setActive((current) => (current + 1) % project.images.length);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="detail-page">
      <section className="detail-hero section">
        <div className="detail-heading">
          <button className="back-link" onClick={() => navigate('projects')}><ArrowLeft size={16} /> Tous les projets</button>
          <p className="eyebrow">PROJET {project.number} · {project.status}</p>
          <h1>{project.title}<br /><em>{project.category}</em></h1>
        </div>
        <div className="detail-index"><strong>0{active + 1}</strong><span>/ 0{project.images.length}</span></div>
      </section>

      <section className="detail-gallery">
        <div className="detail-image-wrap">
          <img src={project.images[active]} alt={`${project.title} — vue ${active + 1}`} />
          <button className="gallery-arrow gallery-prev" onClick={previous} aria-label="Image précédente"><ArrowLeft /></button>
          <button className="gallery-arrow gallery-next" onClick={next} aria-label="Image suivante"><ArrowRight /></button>
        </div>
        <div className="gallery-thumbs">
          {project.images.map((image, index) => (
            <button key={image} className={index === active ? 'thumb active' : 'thumb'} onClick={() => setActive(index)} aria-label={`Afficher l'image ${index + 1}`}>
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </section>

      <section className="detail-info section">
        <div className="detail-label"><p className="eyebrow">À PROPOS DU PROJET</p><span>{project.year}</span></div>
        <div className="detail-description"><p className="detail-lead">{project.shortDescription}</p><p>{project.description}</p></div>
        <div className="detail-facts"><div><span>Type</span><strong>{project.category}</strong></div><div><span>Lieu</span><strong>{project.location}</strong></div><div><span>Année</span><strong>{project.year}</strong></div><div><span>Statut</span><strong>{project.status}</strong></div></div>
      </section>

      <section className="next-project section">
        <p className="eyebrow">PROJET SUIVANT</p>
        {(() => {
          const index = projects.findIndex((item) => item.slug === project.slug);
          const nextProject = projects[(index + 1) % projects.length];
          return <button onClick={() => navigate(`project/${nextProject.slug}`)}><span>{nextProject.title}</span><ArrowUpRight /></button>;
        })()}
      </section>
      <Footer />
    </div>
  );
}

function Footer() {
  return <footer><span>LOOKMAN®</span><span>Collectif d'artistes · Madagascar</span><span>© 2026</span></footer>;
}

function AboutPage() {
  const [open, setOpen] = useState(false);
  return <div className="site">
    <header className="nav"><button className="wordmark" onClick={() => navigate('top')}>LOOKMAN<span>®</span></button><nav className={open ? 'navlinks open' : 'navlinks'}>{['À propos','Projets','Notre parcours','Collaboration','Contact'].map((x,i)=><a key={x} href={`#${['about','projects','journey','collaboration','contact'][i]}`} onClick={()=>setOpen(false)}>{x}<sup>0{i+1}</sup></a>)}</nav><button className="menu" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button></header>
    <main id="top">
      <section id="about" className="hero section"><div className="hero-logo"><div className="logo-mark">LOOK<br/>MAN</div><a className="circle-link" href="#contact">Parlons<br/>ensemble <ArrowUpRight size={18}/></a></div><div className="hero-copy"><p className="eyebrow">COLLECTIF D'ARTISTES · MADAGASCAR</p><h1>Peindre des espaces.<br/><em>Créer des traces.</em></h1><p className="lead">LOOKMAN est un collectif de peintres, muralistes et artistes studio. Nous transformons les murs, les matières et les idées en expériences visuelles.</p><a className="text-link" href="#projects">Découvrir notre travail <ArrowUpRight size={16}/></a></div></section>
      <section className="statement section"><p className="eyebrow">01 / À PROPOS</p><p className="statement-text">Nous travaillons entre <em>le geste et l'espace</em>, entre commande et recherche personnelle. Chaque projet commence par une rencontre et finit par une image qui reste.</p></section>
      <section className="team section"><div className="section-head"><p className="eyebrow">02 / L'ÉQUIPE</p><p>Des regards différents.<br/>Une même signature.</p></div><div className="team-grid">{team.map((person,i)=><article className="member" key={person.name}><div className="member-image"><img src={person.image} alt={person.name}/><span>0{i+1}</span></div><h3>{person.name}</h3><p>{person.role}</p></article>)}</div></section>
      <section id="projects" className="preview section"><div className="section-head"><p className="eyebrow">03 / PROJETS</p><button className="text-link" onClick={() => navigate('projects')}>Voir tous les projets <ArrowUpRight size={16}/></button></div><div className="project-feature"><button className="preview-image" onClick={() => navigate(`project/${projects[0].slug}`)}><img src={projects[0].images[0]} alt={projects[0].title}/><span>Voir le projet <ArrowUpRight size={16}/></span></button><div className="project-meta"><p className="eyebrow">{projects[0].category} · {projects[0].year}</p><h2>{projects[0].title}<br/><em>comme toile.</em></h2><p>{projects[0].shortDescription}</p></div></div></section>
      <section id="journey" className="mini-section section"><p className="eyebrow">04 / NOTRE PARCOURS</p><h2>Une histoire en<br/><em>mouvement.</em></h2></section>
      <section id="collaboration" className="mini-section section"><p className="eyebrow">05 / COLLABORATION</p><h2>Créer à plusieurs<br/><em>change tout.</em></h2></section>
      <section id="contact" className="contact section"><p className="eyebrow">06 / CONTACT</p><h2>Un mur.<br/>Une idée.<br/><em>On en parle ?</em></h2><a className="contact-mail" href="mailto:hello@lookman.art">hello@lookman.art <ArrowUpRight size={20}/></a></section>
    </main><Footer />
  </div>;
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash.slice(1));

  useEffect(() => {
    const update = () => setHash(window.location.hash.slice(1));
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  if (hash === 'projects') return <ProjectShell><ProjectsPage /></ProjectShell>;
  if (hash.startsWith('project/')) {
    const project = getProject(hash.replace('project/', ''));
    if (project) return <ProjectShell><ProjectDetail project={project} /></ProjectShell>;
  }
  return <AboutPage />;
}

function ProjectShell({ children }: { children: React.ReactNode }) {
  return <div className="project-shell"><header className="nav project-nav"><button className="wordmark" onClick={() => navigate('top')}>LOOKMAN<span>®</span></button><nav className="navlinks"><a href="#top">À propos<sup>01</sup></a><a href="#projects">Projets<sup>02</sup></a><a href="#journey">Notre parcours<sup>03</sup></a><a href="#collaboration">Collaboration<sup>04</sup></a><a href="#contact">Contact<sup>05</sup></a></nav><button className="menu" aria-label="Menu"><Menu /></button></header>{children}</div>;
}
