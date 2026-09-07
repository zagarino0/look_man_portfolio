export type ProjectStatus = 'Terminé' | 'En cours';

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  location: string;
  status: ProjectStatus;
  shortDescription: string;
  description: string;
  images: string[];
  number: string;
};

export const projects: Project[] = [
  {
    slug: 'atelier-des-murs',
    title: 'Atelier des murs',
    category: 'Mural',
    year: '2026',
    location: 'Antananarivo',
    status: 'Terminé',
    shortDescription: 'Une intervention murale pensée comme une grande composition en mouvement.',
    description: 'Atelier des murs explore le rapport entre architecture, geste pictural et mémoire collective. Le collectif a travaillé directement sur la surface pour construire une composition organique, visible comme une œuvre mais pensée pour vivre avec le lieu.',
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1800&q=85',
    ],
    number: '01',
  },
  {
    slug: 'matiere-brute',
    title: 'Matière brute',
    category: 'Studio',
    year: '2026',
    location: 'Antananarivo',
    status: 'Terminé',
    shortDescription: 'Recherche studio autour de la matière, de la texture et du geste.',
    description: 'Matière brute est une série de recherches réalisées en studio. Les couches, accidents et effacements deviennent le sujet même de la peinture. Le projet rassemble plusieurs formats développés comme une seule famille visuelle.',
    images: [
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&w=1800&q=85',
    ],
    number: '02',
  },
  {
    slug: 'ligne-de-fuite',
    title: 'Ligne de fuite',
    category: 'Mural · En cours',
    year: '2026',
    location: 'Majunga',
    status: 'En cours',
    shortDescription: 'Un projet mural en développement, construit à partir du mouvement et de la lumière.',
    description: 'Ligne de fuite est une intervention actuellement en construction. La composition évolue avec le lieu et ses contraintes. Les premières phases posent une ligne graphique forte qui sera progressivement enrichie par les gestes du collectif.',
    images: [
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1800&q=85',
    ],
    number: '03',
  },
  {
    slug: 'formes-en-commun',
    title: 'Formes en commun',
    category: 'Peinture collective',
    year: '2025',
    location: 'Antananarivo',
    status: 'Terminé',
    shortDescription: 'Une œuvre collective construite par fragments et conversations visuelles.',
    description: 'Formes en commun rassemble plusieurs écritures dans une même surface. Chaque artiste intervient, recouvre, déplace puis laisse une trace. Le résultat est une peinture collective où aucune signature ne domine l’ensemble.',
    images: [
      'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1578301978069-4526477c3a44?auto=format&fit=crop&w=1800&q=85',
    ],
    number: '04',
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
