import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Menu, RotateCcw, Save, X } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { getProject, projects as initialProjects, type Project, type ProjectStatus } from './data/projects';

const team = [
  { name: 'Lookman', role: 'Direction artistique', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80' },
  { name: 'Mika', role: 'Muraliste', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80' },
  { name: 'Tiana', role: 'Peinture studio', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80' },
  { name: 'Noh', role: 'Illustration & matière', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80' },
];

const timeline = [
  { year: '2021', title: 'Le premier mur', text: 'LOOKMAN naît d’une envie simple : réunir plusieurs pratiques autour de la peinture et donner aux espaces une identité singulière.' },
  { year: '2022', title: 'Le collectif se forme', text: 'Les premières commandes prennent forme. Le mural devient un terrain commun entre illustration, couleur, architecture et geste.' },
  { year: '2024', title: 'Du mur au studio', text: 'Le collectif développe une recherche plus intime autour de la matière, des formats sur toile et des séries peintes.' },
  { year: '2025', title: 'Travailler ensemble', text: 'LOOKMAN collabore avec des lieux, marques et créateurs pour construire des univers visuels cohérents, du premier croquis à la réalisation.' },
  { year: '2026', title: 'Continuer à laisser des traces', text: 'De nouveaux murs, de nouveaux territoires et une même volonté : créer des images qui appartiennent réellement aux lieux qui les accueillent.' },
];

const collaborators = [
  { name: 'Atelier 22', type: 'Architecture & espaces', mark: 'A22' },
  { name: 'Studio Mada', type: 'Direction créative', mark: 'SM' },
  { name: 'Maison Sable', type: 'Hospitality & lifestyle', mark: 'MS' },
  { name: 'Kanto Studio', type: 'Design & photographie', mark: 'KS' },
  { name: 'Les Ateliers', type: 'Culture & événementiel', mark: 'LA' },
  { name: 'Collectif Nord', type: 'Art & territoire', mark: 'CN' },
];

function navigate(hash: string) {
  window.location.hash = hash;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Footer() {
  return <footer><span>LOOKMAN®</span><span>Collectif d'artistes · Madagascar</span><span>© 2026</span></footer>;
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <article className={`project-card ${featured ? 'featured' : ''}`} onClick={() => navigate(`project/${project.slug}`)}>
    <div className="project-card-image"><img src={project.images[0]} alt={project.title} loading="lazy" /><div className="project-card-overlay"><span>{project.status}</span><ArrowUpRight size={22} /></div></div>
    <div className="project-card-info"><div><span className="project-number">{project.number}</span><h2>{project.title}</h2></div><div className="project-card-meta"><span>{project.category}</span><span>{project.year}</span><span>{project.location}</span></div></div>
  </article>;
}

function ProjectsPage({ projects }: { projects: Project[] }) {
  return <div className="projects-page">
    <header className="page-intro section"><div><p className="eyebrow">03 / PROJETS</p><h1>Ce que nous<br /><em>laissons aux murs.</em></h1></div><div className="page-intro-side"><p>Une sélection de projets muraux, travaux studio et recherches collectives. Certaines pièces sont terminées, d'autres continuent de prendre forme.</p><div className="project-count"><strong>{String(projects.length).padStart(2, '0')}</strong><span>projets<br />présentés</span></div></div></header>
    <main className="projects-list section"><div className="projects-grid">{projects.map((project, i) => <ProjectCard key={project.slug} project={project} featured={i === 0 || i === 3} />)}</div></main>
    <section className="projects-note section"><p className="eyebrow">EN COURS</p><div><span className="status-dot" /> {projects.find((p) => p.status === 'En cours')?.title ?? 'Nouveau projet'} — 2026</div><p>Un projet n'est pas toujours terminé lorsqu'il est montré. Nous documentons aussi ce qui est encore en train de devenir.</p></section>
    <Footer />
  </div>;
}

function ProjectDetail({ project, allProjects }: { project: Project; allProjects: Project[] }) {
  const [active, setActive] = useState(0);
  const previous = () => setActive((current) => (current - 1 + project.images.length) % project.images.length);
  const next = () => setActive((current) => (current + 1) % project.images.length);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === 'ArrowLeft') previous(); if (event.key === 'ArrowRight') next(); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); });
  const index = allProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = allProjects[(index + 1) % allProjects.length];
  return <div className="detail-page">
    <section className="detail-hero section"><div className="detail-heading"><button className="back-link" onClick={() => navigate('projects')}><ArrowLeft size={16} /> Tous les projets</button><p className="eyebrow">PROJET {project.number} · {project.status}</p><h1>{project.title}<br /><em>{project.category}</em></h1></div><div className="detail-index"><strong>0{active + 1}</strong><span>/ 0{project.images.length}</span></div></section>
    <section className="detail-gallery"><div className="detail-image-wrap"><img src={project.images[active]} alt={`${project.title} — vue ${active + 1}`} /><button className="gallery-arrow gallery-prev" onClick={previous} aria-label="Image précédente"><ArrowLeft /></button><button className="gallery-arrow gallery-next" onClick={next} aria-label="Image suivante"><ArrowRight /></button></div><div className="gallery-thumbs">{project.images.map((image, i) => <button key={image} className={i === active ? 'thumb active' : 'thumb'} onClick={() => setActive(i)} aria-label={`Afficher l'image ${i + 1}`}><img src={image} alt="" /></button>)}</div></section>
    <section className="detail-info section"><div className="detail-label"><p className="eyebrow">À PROPOS DU PROJET</p><span>{project.year}</span></div><div className="detail-description"><p className="detail-lead">{project.shortDescription}</p><p>{project.description}</p></div><div className="detail-facts"><div><span>Type</span><strong>{project.category}</strong></div><div><span>Lieu</span><strong>{project.location}</strong></div><div><span>Année</span><strong>{project.year}</strong></div><div><span>Statut</span><strong>{project.status}</strong></div></div></section>
    <section className="next-project section"><p className="eyebrow">PROJET SUIVANT</p><button onClick={() => navigate(`project/${nextProject.slug}`)}><span>{nextProject.title}</span><ArrowUpRight /></button></section><Footer />
  </div>;
}

function JourneyPage() {
  return <div className="content-page journey-page"><section className="journey-hero section"><div className="journey-image"><img src="https://images.unsplash.com/photo-1577083552431-6e5fd01988c5?auto=format&fit=crop&w=1500&q=85" alt="Peinture murale en cours" /></div><div className="journey-intro"><p className="eyebrow">04 / NOTRE PARCOURS</p><h1>Une histoire<br /><em>en mouvement.</em></h1><p>LOOKMAN s’est construit par les murs, les rencontres et les projets qui nous ont poussés à aller plus loin. Notre parcours n’est pas une ligne droite : c’est une succession de gestes, d’essais et de collaborations.</p></div></section>
    <section className="timeline section"><div className="timeline-label"><p className="eyebrow">CHRONOLOGIE</p><span>05<br />DATES</span></div><div className="timeline-list">{timeline.map((item, i) => <article className="timeline-item" key={item.year}><div className="timeline-year">{item.year}</div><div className="timeline-marker"><span /></div><div className="timeline-copy"><p className="eyebrow">0{i + 1}</p><h2>{item.title}</h2><p>{item.text}</p></div></article>)}</div></section>
    <section className="journey-closing section"><p className="eyebrow">AUJOURD'HUI</p><p>Nous continuons de chercher des endroits où <em>la peinture peut changer la manière de regarder un lieu.</em></p></section><Footer />
  </div>;
}

function CollaborationPage() {
  return <div className="content-page collaboration-page"><section className="collab-intro section"><p className="eyebrow">05 / COLLABORATION</p><h1>Créer à plusieurs<br /><em>change tout.</em></h1><p>Nous travaillons avec des architectes, marques, lieux culturels, hôtels, studios et indépendants. Chaque collaboration commence par l’écoute et se construit autour d’une intention claire.</p></section>
    <section className="collab-grid section">{collaborators.map((item, i) => <article className="collab-card" key={item.name}><div className="collab-mark">{item.mark}</div><div><span>0{i + 1}</span><h2>{item.name}</h2><p>{item.type}</p></div><ArrowUpRight /></article>)}</section>
    <section className="collab-cta section"><p className="eyebrow">VOUS AVEZ UN PROJET ?</p><h2>Construisons<br /><em>quelque chose.</em></h2><button className="outline-link" onClick={() => navigate('contact')}>Parler du projet <ArrowUpRight size={17} /></button></section><Footer />
  </div>;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return <div className="content-page contact-page"><section className="contact-hero section"><div><p className="eyebrow">06 / CONTACT</p><h1>Un mur.<br />Une idée.<br /><em>On en parle ?</em></h1></div><div className="contact-side"><p>Pour une fresque, une collaboration artistique, un projet d’espace ou simplement pour nous présenter une idée.</p><a href="mailto:hello@lookman.art">hello@lookman.art <ArrowUpRight size={18} /></a><p className="contact-location">Antananarivo · Madagascar<br />Disponible pour des projets à Madagascar et au-delà.</p></div></section>
    <section className="contact-form-section section"><form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}><div className="form-row"><label>Votre nom<input required name="name" placeholder="Nom / organisation" /></label><label>Votre email<input required type="email" name="email" placeholder="email@exemple.com" /></label></div><label>Type de projet<select name="type" defaultValue=""><option value="" disabled>Choisir une option</option><option>Fresque / mural</option><option>Peinture studio</option><option>Collaboration artistique</option><option>Projet d'espace</option><option>Autre</option></select></label><label>Parlez-nous du projet<textarea required name="message" rows={6} placeholder="Lieu, intention, dimensions, calendrier…" /></label><button className="submit-button" type="submit">{sent ? <><Check size={17} /> Message préparé</> : <>Envoyer la demande <ArrowUpRight size={17} /></>}</button>{sent && <p className="form-note">Démo : le formulaire est prêt pour être relié à un email ou à un backend.</p>}</form></section><Footer /></div>;
}

function AdminPage({ projects, setProjects, onReset }: { projects: Project[]; setProjects: (projects: Project[]) => void; onReset: () => void }) {
  const [logged, setLogged] = useState(() => localStorage.getItem('lookman-admin') === '1');
  const [password, setPassword] = useState('');
  const [saved, setSaved] = useState(false);
  const [selected, setSelected] = useState(projects[0]?.slug ?? '');
  const project = projects.find((item) => item.slug === selected) ?? projects[0];

  if (!logged) return <div className="admin-login"><div className="admin-login-box"><p className="eyebrow">LOOKMAN / ADMIN</p><h1>Accès<br /><em>privé.</em></h1><p>Interface de démonstration pour gérer le contenu du portfolio.</p><form onSubmit={(e) => { e.preventDefault(); if (password === 'LOOKMAN') { localStorage.setItem('lookman-admin', '1'); setLogged(true); } }}><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Code d'accès" autoFocus /><button className="submit-button" type="submit">Entrer <ArrowUpRight size={17} /></button></form><small>Démo locale · code : LOOKMAN</small></div></div>;

  const updateProject = (patch: Partial<Project>) => { if (!project) return; setProjects(projects.map((item) => item.slug === project.slug ? { ...item, ...patch } : item)); setSaved(false); };
  return <div className="admin-page"><header className="admin-bar"><button className="wordmark" onClick={() => navigate('top')}>LOOKMAN<span>®</span></button><div><span>ADMIN / CONTENU</span><button onClick={() => { localStorage.removeItem('lookman-admin'); setLogged(false); }}>Quitter</button></div></header><main className="admin-main"><div className="admin-heading"><div><p className="eyebrow">ESPACE ADMIN</p><h1>Piloter<br /><em>le portfolio.</em></h1></div><div><button className="reset-button" onClick={onReset}><RotateCcw size={14} /> Réinitialiser</button><button className="save-button" onClick={() => { localStorage.setItem('lookman-projects', JSON.stringify(projects)); setSaved(true); }}><Save size={14} /> {saved ? 'Enregistré' : 'Enregistrer'}</button></div></div>
      <section className="admin-stats"><div><strong>{projects.length}</strong><span>Projets</span></div><div><strong>{projects.filter((p) => p.status === 'Terminé').length}</strong><span>Terminés</span></div><div><strong>{projects.filter((p) => p.status === 'En cours').length}</strong><span>En cours</span></div></section>
      <section className="admin-editor"><aside className="admin-project-list"><p className="eyebrow">PROJETS</p>{projects.map((item) => <button className={item.slug === selected ? 'active' : ''} key={item.slug} onClick={() => setSelected(item.slug)}><span>{item.number}</span><strong>{item.title}</strong><small>{item.status}</small></button>)}</aside>{project && <div className="admin-fields"><p className="eyebrow">MODIFIER / {project.number}</p><label>Titre<input value={project.title} onChange={(e) => updateProject({ title: e.target.value })} /></label><div className="form-row"><label>Statut<select value={project.status} onChange={(e) => updateProject({ status: e.target.value as ProjectStatus })}><option>Terminé</option><option>En cours</option></select></label><label>Année<input value={project.year} onChange={(e) => updateProject({ year: Number(e.target.value) })} /></label></div><label>Catégorie<input value={project.category} onChange={(e) => updateProject({ category: e.target.value })} /></label><label>Lieu<input value={project.location} onChange={(e) => updateProject({ location: e.target.value })} /></label><label>Description courte<textarea rows={3} value={project.shortDescription} onChange={(e) => updateProject({ shortDescription: e.target.value })} /></label><label>Description<textarea rows={6} value={project.description} onChange={(e) => updateProject({ description: e.target.value })} /></label><div className="admin-preview"><p className="eyebrow">IMAGE PRINCIPALE</p><img src={project.images[0]} alt="" /></div></div>}</section>
    </main></div>;
}

function AboutPage({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  return <div className="site"><header className="nav"><button className="wordmark" onClick={() => navigate('top')}>LOOKMAN<span>®</span></button><nav className={open ? 'navlinks open' : 'navlinks'}>{['À propos','Projets','Notre parcours','Collaboration','Contact'].map((x, i) => <a key={x} href={`#${['about','projects','journey','collaboration','contact'][i]}`} onClick={() => setOpen(false)}>{x}<sup>0{i + 1}</sup></a>)}</nav><button className="menu" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button></header>
    <main id="top"><section id="about" className="hero section"><div className="hero-logo"><div className="logo-mark">LOOK<br />MAN</div><a className="circle-link" href="#contact">Parlons<br />ensemble <ArrowUpRight size={18} /></a></div><div className="hero-copy"><p className="eyebrow">COLLECTIF D'ARTISTES · MADAGASCAR</p><h1>Peindre des espaces.<br /><em>Créer des traces.</em></h1><p className="lead">LOOKMAN est un collectif de peintres, muralistes et artistes studio. Nous transformons les murs, les matières et les idées en expériences visuelles.</p><a className="text-link" href="#projects">Découvrir notre travail <ArrowUpRight size={16} /></a></div></section>
      <section className="statement section"><p className="eyebrow">01 / À PROPOS</p><p className="statement-text">Nous travaillons entre <em>le geste et l'espace</em>, entre commande et recherche personnelle. Chaque projet commence par une rencontre et finit par une image qui reste.</p></section>
      <section className="team section"><div className="section-head"><p className="eyebrow">02 / L'ÉQUIPE</p><p>Des regards différents.<br />Une même signature.</p></div><div className="team-grid">{team.map((person, i) => <article className="member" key={person.name}><div className="member-image"><img src={person.image} alt={person.name} /><span>0{i + 1}</span></div><h3>{person.name}</h3><p>{person.role}</p></article>)}</div></section>
      <section id="projects" className="preview section"><div className="section-head"><p className="eyebrow">03 / PROJETS</p><button className="text-link" onClick={() => navigate('projects')}>Voir tous les projets <ArrowUpRight size={16} /></button></div><div className="project-feature"><button className="preview-image" onClick={() => navigate(`project/${projects[0].slug}`)}><img src={projects[0].images[0]} alt={projects[0].title} /><span>Voir le projet <ArrowUpRight size={16} /></span></button><div className="project-meta"><p className="eyebrow">{projects[0].category} · {projects[0].year}</p><h2>{projects[0].title}<br /><em>comme toile.</em></h2><p>{projects[0].shortDescription}</p></div></div></section>
      <section id="journey" className="mini-section section"><p className="eyebrow">04 / NOTRE PARCOURS</p><h2>Une histoire en<br /><em>mouvement.</em></h2><button className="text-link" onClick={() => navigate('journey')}>Lire notre parcours <ArrowUpRight size={16} /></button></section>
      <section id="collaboration" className="mini-section section"><p className="eyebrow">05 / COLLABORATION</p><h2>Créer à plusieurs<br /><em>change tout.</em></h2><button className="text-link" onClick={() => navigate('collaboration')}>Voir nos collaborations <ArrowUpRight size={16} /></button></section>
      <section id="contact" className="contact section"><p className="eyebrow">06 / CONTACT</p><h2>Un mur.<br />Une idée.<br /><em>On en parle ?</em></h2><a className="contact-mail" href="mailto:hello@lookman.art">hello@lookman.art <ArrowUpRight size={20} /></a></section>
    </main><Footer /></div>;
}

function ProjectShell({ children }: { children: ReactNode }) {
  return <div className="project-shell"><header className="nav project-nav"><button className="wordmark" onClick={() => navigate('top')}>LOOKMAN<span>®</span></button><nav className="navlinks"><a href="#top">À propos<sup>01</sup></a><a href="#projects">Projets<sup>02</sup></a><a href="#journey">Notre parcours<sup>03</sup></a><a href="#collaboration">Collaboration<sup>04</sup></a><a href="#contact">Contact<sup>05</sup></a></nav><button className="menu" onClick={() => navigate('top')} aria-label="Menu"><Menu /></button></header>{children}</div>;
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash.slice(1));
  const [projects, setProjects] = useState<Project[]>(() => { try { const stored = localStorage.getItem('lookman-projects'); return stored ? JSON.parse(stored) : initialProjects; } catch { return initialProjects; } });
  useEffect(() => { const update = () => setHash(window.location.hash.slice(1)); window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update); }, []);
  const resetProjects = () => { setProjects(initialProjects); localStorage.removeItem('lookman-projects'); };
  const routeProject = useMemo(() => hash.startsWith('project/') ? projects.find((p) => p.slug === hash.replace('project/', '')) : undefined, [hash, projects]);
  if (hash === 'projects') return <ProjectShell><ProjectsPage projects={projects} /></ProjectShell>;
  if (hash === 'journey') return <ProjectShell><JourneyPage /></ProjectShell>;
  if (hash === 'collaboration') return <ProjectShell><CollaborationPage /></ProjectShell>;
  if (hash === 'contact') return <ProjectShell><ContactPage /></ProjectShell>;
  if (hash === 'admin') return <AdminPage projects={projects} setProjects={setProjects} onReset={resetProjects} />;
  if (routeProject) return <ProjectShell><ProjectDetail project={routeProject} allProjects={projects} /></ProjectShell>;
  return <AboutPage projects={projects} />;
}
