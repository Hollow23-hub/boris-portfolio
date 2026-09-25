import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  Certificate,
  DownloadSimple,
  EnvelopeSimple,
  GithubLogo,
  GraduationCap,
  GlobeHemisphereWest,
  LinkedinLogo,
  List,
  MapPin,
  X,
} from '@phosphor-icons/react';
import '@fontsource/bebas-neue';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import { fetchPortfolioContent } from './sanity';

gsap.registerPlugin(ScrollTrigger);

const profileLinks = {
  linkedin: 'https://www.linkedin.com/in/boris-beltran-56309933b',
  github: 'https://github.com/Hollow23-hub',
  email: 'borisbel231199@gmail.com',
};

const curriculumLinks = {
  es: '/curriculum/Boris_Beltran_Curriculum_ES.pdf',
  en: '/curriculum/Boris_Beltran_Curriculum_EN.pdf',
};

const projects = [
  {
    id: 'salomon',
    name: 'Salomon Truck Parts',
    image: '/projects/salomon.png',
    eyebrow: { es: 'E-commerce · Automotriz', en: 'E-commerce · Automotive' },
    description: {
      es: 'Tienda para comercializar piezas de camiones con búsqueda por número de parte y diferentes modalidades de envío.',
      en: 'Truck-parts storefront with part-number search and multiple shipping methods.',
    },
    role: {
      es: 'Inventario, estructura de productos, colecciones, carrito mixto y operaciones de envío.',
      en: 'Inventory, product data structure, collections, mixed cart, and shipping operations.',
    },
    tech: ['React', 'Shopify', 'CSS', 'Figma'],
    href: 'https://salomontruckparts.com/',
  },
  {
    id: 'checkrent',
    name: 'CheckRent',
    image: '/projects/checkrent.png',
    eyebrow: { es: 'Plataforma · Real estate', en: 'Platform · Real estate' },
    description: {
      es: 'Plataforma uruguaya para publicar propiedades y gestionar alquileres temporales.',
      en: 'Uruguayan platform for publishing properties and managing short-term rentals.',
    },
    role: {
      es: 'Formularios y flujos de propietarios y alquileres, pagos, selector de idioma y banners publicitarios.',
      en: 'Owner and rental forms and flows, payments, language selector, and promotional banners.',
    },
    tech: ['PHP', 'HTML', 'JavaScript', 'Payments'],
    href: 'https://www.checkrent.com.uy/',
  },
  {
    id: 'parecefacil',
    name: '#PareceFácil',
    image: '/projects/parecefacil.png',
    eyebrow: { es: 'E-commerce · Fitness', en: 'E-commerce · Fitness' },
    description: {
      es: 'Marca y tienda de productos fitness y deportivos construida sobre Shopify.',
      en: 'Fitness and sports brand storefront built on Shopify.',
    },
    role: {
      es: 'Desarrollo del catálogo, checkout y operaciones del carrito como programador junior.',
      en: 'Catalog, checkout, and cart operations as a junior developer.',
    },
    tech: ['React', 'Tailwind CSS', 'Shopify'],
    href: 'https://parecefacil.us/',
  },
  {
    id: 'mag',
    name: 'MAG Builders',
    image: '/projects/mag-builders.png',
    eyebrow: { es: 'Web corporativa · Construcción', en: 'Corporate site · Construction' },
    description: {
      es: 'Sitio corporativo para presentar los servicios y proyectos de una empresa constructora.',
      en: 'Corporate site presenting the services and work of a construction company.',
    },
    role: {
      es: 'Frontend completo, integración del CMS, contenido y conexión de correos.',
      en: 'Complete frontend, CMS integration, content, and email connection.',
    },
    tech: ['Next.js', 'React', 'CSS', 'Sanity CMS'],
    href: 'https://mag-builders.lccopentech.workers.dev/',
  },
  {
    id: 'gaby',
    name: 'Gaby Pacheco',
    image: '/projects/gaby-pacheco.png',
    eyebrow: { es: 'Contenido · Lifestyle', en: 'Content · Lifestyle' },
    description: {
      es: 'Plataforma de contenido, eventos, tienda y comunidad con publicación periódica.',
      en: 'Content, events, storefront, and community platform with recurring publishing.',
    },
    role: {
      es: 'Mantenimiento mensual de encuentros, blogs, wallpapers y contenido editorial.',
      en: 'Monthly maintenance of events, blog posts, wallpapers, and editorial content.',
    },
    tech: ['React', 'Builder.io CMS', 'Tailwind CSS'],
    href: 'https://gabypacheco.com/',
  },
];

const copy = {
  es: {
    metaDescription: 'Portafolio de Boris Beltrán, ingeniero informático especializado en frontend, e-commerce y productos web.',
    nav: ['Inicio', 'Proyectos', 'Experiencia', 'Stack', 'Contacto'],
    homeAria: 'Ir al inicio', navAria: 'Navegación principal', languageAria: 'Seleccionar idioma', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú', projectScreenshot: 'captura del proyecto',
    kicker: 'Ingeniero informático', titleA: 'BORIS', titleB: 'BELTRÁN',
    specialization: 'FRONTEND ENGINEER · E-COMMERCE · FULL-STACK',
    intro: 'Ingeniero informático que diseña y desarrolla experiencias web rápidas, accesibles y escalables. Especializado en frontend y e-commerce, con participación en backend e infraestructura.',
    seeProjects: 'VER PROYECTOS', resumeCta: 'DESCARGAR CV', availability: 'Disponible para oportunidades remotas y proyectos de producto',
    stats: [['3+', 'Años de experiencia'], ['5', 'Proyectos'], ['2', 'Certificaciones']],
    selected: 'PROYECTOS DESTACADOS', objective: 'Objetivo', contribution: 'Mi aporte', visit: 'Visitar proyecto', internal: 'Proyecto privado / local',
    experience: 'EXPERIENCIA', experienceRole: 'Desarrollador frontend con participación full-stack',
    experienceBody: 'Desarrollo de interfaces para e-commerce, plataformas de servicios y sitios corporativos. Integración con Shopify, CMS, APIs, bases de datos y flujos operativos.', present: 'Aprox. 3 años',
    stack: 'MI STACK', education: 'FORMACIÓN', degree: 'Ingeniería Informática', university: 'Universidad Católica Andrés Bello · Extensión Guayana',
    certs: 'CERTIFICACIONES', thesis: 'TESIS UNIVERSITARIA', thesisTitle: 'Análisis de sentimientos en Instagram',
    thesisBody: 'Sistema en React y Python que utiliza un modelo preentrenado para categorizar sentimientos a partir de comentarios en publicaciones de Instagram.',
    contactLabel: 'HABLEMOS', contactTitle: '¿TIENES UN PROYECTO\nEN MENTE?',
    contactBody: 'Estoy abierto a oportunidades frontend, colaboraciones full-stack y proyectos donde el producto, el rendimiento y una buena experiencia de usuario importen.',
    contactOpen: 'DISPONIBLE PARA',
    contactAreas: ['POSICIONES FRONTEND', 'PROYECTOS E-COMMERCE', 'COLABORACIÓN FULL-STACK'],
    contactMode: 'Trabajo remoto',
    linkedinCta: 'CONTACTAR POR LINKEDIN', githubCta: 'VER GITHUB', location: 'Ciudad Guayana, Venezuela',
  },
  en: {
    metaDescription: 'Portfolio of Boris Beltrán, a frontend engineer with a degree in Informatics Engineering, specializing in e-commerce and web products.',
    nav: ['Home', 'Projects', 'Experience', 'Stack', 'Contact'],
    homeAria: 'Go to home', navAria: 'Primary navigation', languageAria: 'Select language', openMenu: 'Open menu', closeMenu: 'Close menu', projectScreenshot: 'project screenshot',
    kicker: 'Informatics engineer', titleA: 'BORIS', titleB: 'BELTRÁN',
    specialization: 'FRONTEND ENGINEER · E-COMMERCE · FULL-STACK',
    intro: 'Informatics Engineering graduate designing and building fast, accessible, and scalable web experiences. Specialized in frontend and e-commerce, with experience in backend and infrastructure.',
    seeProjects: 'VIEW PROJECTS', resumeCta: 'DOWNLOAD CV', availability: 'Available for remote opportunities and product work',
    stats: [['3+', 'Years of experience'], ['5', 'Projects'], ['2', 'Certifications']],
    selected: 'SELECTED PROJECTS', objective: 'Objective', contribution: 'My contribution', visit: 'Visit project', internal: 'Private / local project',
    experience: 'EXPERIENCE', experienceRole: 'Frontend developer with full-stack participation',
    experienceBody: 'Interface development for e-commerce, service platforms, and corporate sites. Integration with Shopify, CMS platforms, APIs, databases, and operational flows.', present: 'Approx. 3 years',
    stack: 'MY STACK', education: 'EDUCATION', degree: 'Informatics Engineering', university: 'Universidad Católica Andrés Bello · Guayana Campus',
    certs: 'CERTIFICATIONS', thesis: 'UNIVERSITY THESIS', thesisTitle: 'Instagram sentiment analysis',
    thesisBody: 'React and Python system using a pretrained model to categorize sentiment from comments on Instagram posts.',
    contactLabel: 'LET’S TALK', contactTitle: 'HAVE A PROJECT\nIN MIND?',
    contactBody: 'I am open to frontend opportunities, full-stack collaboration, and projects where product thinking, performance, and user experience matter.',
    contactOpen: 'OPEN TO',
    contactAreas: ['FRONTEND ROLES', 'E-COMMERCE PROJECTS', 'FULL-STACK COLLABORATION'],
    contactMode: 'Remote work',
    linkedinCta: 'CONTACT ON LINKEDIN', githubCta: 'VIEW GITHUB', location: 'Ciudad Guayana, Venezuela',
  },
};

const skills = {
  Frontend: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML / CSS'],
  Backend: ['Node.js', 'Python', 'C', 'C#', 'FastAPI'],
  'Data & Cloud': ['MySQL', 'PostgreSQL', 'Cloudflare'],
  Tools: ['Shopify', 'Git', 'Docker', 'Figma', 'CMS'],
};

function ExternalLink({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

function DataTopology() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0.72, y: 0.55, targetX: 0.72, targetY: 0.55 };
    let frame = 0;
    let width = 0;
    let height = 0;
    let points = [];

    const random = (seed) => {
      const value = Math.sin(seed * 999.91) * 43758.5453;
      return value - Math.floor(value);
    };

    const buildPoints = () => {
      const compact = width < 700;
      const count = compact ? 58 : 94;
      points = Array.from({ length: count }, (_, index) => ({
        x: 0.28 + random(index + 1) * 0.78,
        y: 0.06 + random(index + 91) * 0.9,
        depth: 0.35 + random(index + 211) * 0.95,
        phase: random(index + 401) * Math.PI * 2,
      }));
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildPoints();
      if (reducedMotion) draw(0);
    };

    const onPointerMove = (event) => {
      pointer.targetX = event.clientX / window.innerWidth;
      pointer.targetY = event.clientY / window.innerHeight;
    };

    const draw = (time) => {
      context.clearRect(0, 0, width, height);
      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;

      const mapped = points.map((point) => {
        const drift = reducedMotion ? 0 : Math.sin(time * 0.00035 + point.phase) * 5;
        const pullX = (pointer.x - 0.5) * 28 * point.depth;
        const pullY = (pointer.y - 0.5) * 20 * point.depth;
        return {
          ...point,
          px: point.x * width + pullX + drift,
          py: point.y * height + pullY + drift * 0.35,
        };
      });

      mapped.forEach((point, index) => {
        mapped.slice(index + 1).forEach((other) => {
          const dx = point.px - other.px;
          const dy = point.py - other.py;
          const distance = Math.hypot(dx, dy);
          const limit = 142 * Math.min(point.depth, other.depth);
          if (distance > limit) return;
          const edgeFade = Math.max(0, Math.min(1, (point.px / width - 0.18) / 0.34));
          context.strokeStyle = `rgba(124, 255, 177, ${(1 - distance / limit) * 0.24 * edgeFade})`;
          context.lineWidth = 0.65;
          context.beginPath();
          context.moveTo(point.px, point.py);
          context.lineTo(other.px, other.py);
          context.stroke();
        });
      });

      mapped.forEach((point, index) => {
        const pulse = reducedMotion ? 0.55 : (Math.sin(time * 0.0012 + point.phase) + 1) / 2;
        const edgeFade = Math.max(0, Math.min(1, (point.px / width - 0.16) / 0.32));
        const radius = (index % 13 === 0 ? 3.3 + pulse * 2 : 1.15 + pulse * 0.8) * point.depth;
        context.fillStyle = `rgba(0, 237, 100, ${(0.3 + pulse * 0.65) * edgeFade})`;
        context.beginPath();
        context.arc(point.px, point.py, radius, 0, Math.PI * 2);
        context.fill();
      });

      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    resize();
    if (!reducedMotion) frame = window.requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="topology-canvas" aria-hidden="true" />;
}

function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setVisible(false);
      onComplete();
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const root = preloaderRef.current;
    if (!root) return undefined;
    const letters = root.querySelectorAll('.preloader-letter');
    const strips = root.querySelectorAll('.preloader-strip');
    const name = root.querySelector('.preloader-name');
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          setVisible(false);
        },
      });

      timeline
        .fromTo(letters, { yPercent: 115 }, { yPercent: 0, duration: 0.42, stagger: 0.045 })
        .call(onComplete, [], '+=0.35')
        .to(strips, { yPercent: 105, duration: 0.68, stagger: 0.055 }, '<')
        .to(name, { autoAlpha: 0, duration: 0.25 }, '<0.18')
        .to(root, { autoAlpha: 0, duration: 0.18 }, '<0.36');
    }, root);

    return () => {
      context.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  if (!visible) return null;
  return (
    <div className="preloader" ref={preloaderRef} aria-label="Boris Beltrán" aria-live="polite">
      <div className="preloader-strips" aria-hidden="true">
        {Array.from({ length: 10 }, (_, index) => <span className="preloader-strip" key={index} />)}
      </div>
      <p className="preloader-name" aria-hidden="true">
        {'BORIS BELTRÁN'.split('').map((letter, index) => (
          <span className={letter === ' ' ? 'preloader-letter preloader-space' : 'preloader-letter'} key={`${letter}-${index}`}>{letter === ' ' ? '\u00A0' : letter}</span>
        ))}
      </p>
    </div>
  );
}

export function App() {
  const [language, setLanguage] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [cmsContent, setCmsContent] = useState(null);
  const shellRef = useRef(null);
  const progressRef = useRef(null);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);
  const settings = cmsContent?.settings;
  const t = useMemo(() => ({
    ...copy[language],
    intro: settings?.heroIntro?.[language] || copy[language].intro,
    availability: settings?.availability?.[language] || copy[language].availability,
    contactTitle: settings?.contactTitle?.[language] || copy[language].contactTitle,
    contactBody: settings?.contactBody?.[language] || copy[language].contactBody,
  }), [language, settings]);
  const activeProfileLinks = {
    linkedin: settings?.linkedinUrl || profileLinks.linkedin,
    github: settings?.githubUrl || profileLinks.github,
    email: settings?.email || profileLinks.email,
  };
  const cvFilename = `Boris_Beltran_Curriculum_${language.toUpperCase()}.pdf`;
  const cmsCurriculumUrl = language === 'en' ? settings?.curriculumEnUrl : settings?.curriculumEsUrl;
  const activeCurriculumLink = cmsCurriculumUrl
    ? `${cmsCurriculumUrl}?dl=${cvFilename}`
    : curriculumLinks[language];
  const projectContent = useMemo(() => {
    if (cmsContent?.projects) {
      return cmsContent.projects.filter((project) => project.id && project.name).map((project) => ({
        id: project.id,
        name: project.name,
        image: project.imageUrl || projects.find((item) => item.id === project.id)?.image,
        imageAlt: project.imageAlt?.[language],
        eyebrowText: project.category?.[language] || '',
        descriptionText: project.objective?.[language] || '',
        roleText: project.contribution?.[language] || '',
        tech: project.technologies || [],
        href: project.websiteUrl,
      }));
    }
    return projects.map((project) => ({
      ...project, eyebrowText: project.eyebrow[language], descriptionText: project.description[language], roleText: project.role[language],
    }));
  }, [cmsContent, language]);

  useEffect(() => {
    const controller = new AbortController();
    fetchPortfolioContent(controller.signal)
      .then(setCmsContent)
      .catch((error) => {
        if (error.name !== 'AbortError') console.warn('Sanity unavailable; showing bundled content.', error);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!introComplete || !cmsContent) return undefined;
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [introComplete, cmsContent]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = 'Boris Beltrán | Frontend Engineer';
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.metaDescription);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.metaDescription);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', t.metaDescription);
  }, [language, t.metaDescription]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useLayoutEffect(() => {
    if (!introComplete || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.site-header', { y: -24, autoAlpha: 0, duration: 0.65 })
        .from('.hero .eyebrow', { y: 18, autoAlpha: 0, duration: 0.5 }, '-=0.28')
        .from('.hero h1 span, .hero h1 strong', { yPercent: 115, autoAlpha: 0, duration: 0.78, stagger: 0.09 }, '-=0.25')
        .from('.specialization, .hero-intro, .hero-links, .availability', { y: 24, autoAlpha: 0, duration: 0.58, stagger: 0.08 }, '-=0.48')
        .from('.hero-stats > div', { y: 22, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, '-=0.38')
        .from('.hero-visual', { scale: 1.06, autoAlpha: 0, duration: 1.1 }, '-=1.05');

      gsap.to('.hero-visual', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
      });
      gsap.to('.asterisk', { rotate: 360, duration: 8, repeat: -1, ease: 'none' });

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 54,
          autoAlpha: 0,
          duration: 0.82,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });

      gsap.utils.toArray('.project-image img').forEach((image) => {
        gsap.fromTo(image, { scale: 1.09 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        });
      });
    }, shellRef);
    return () => context.revert();
  }, [introComplete]);

  const navTargets = ['top', 'projects', 'experience', 'stack', 'contact'];
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

  return (
    <>
      <Preloader onComplete={handleIntroComplete} />
      <div className={introComplete ? 'site-shell intro-ready' : 'site-shell intro-pending'} id="top" ref={shellRef}>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo('top')} aria-label={t.homeAria}>
          <span className="brand-copy">BORIS BELTRÁN</span>
        </button>
        <nav className={menuOpen ? 'nav open' : 'nav'} id="primary-navigation" aria-label={t.navAria}>
          {t.nav.map((item, index) => <button key={item} onClick={() => scrollTo(navTargets[index])}>{item}</button>)}
        </nav>
        <div className="header-actions">
          <div className="language" role="group" aria-label={t.languageAria}>
            <button className={language === 'es' ? 'active' : ''} onClick={() => setLanguage('es')}>ES</button><span>/</span>
            <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
          </div>
          <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? t.closeMenu : t.openMenu} aria-expanded={menuOpen} aria-controls="primary-navigation">{menuOpen ? <X size={25} /> : <List size={25} />}</button>
        </div>
      </header>

      <main>
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-visual" aria-hidden="true"><DataTopology /></div>
          <div className="hero-copy">
            <p className="eyebrow">{t.kicker}</p>
            <h1 id="hero-title"><span>{t.titleA}</span><strong>{t.titleB}</strong></h1>
            <p className="specialization">{t.specialization}</p><p className="hero-intro">{t.intro}</p>
            <div className="hero-links">
              <button className="button primary" onClick={() => scrollTo('projects')}>{t.seeProjects}<ArrowDown size={18} weight="bold" /></button>
              <a
                className="button curriculum-button"
                href={activeCurriculumLink}
                download={cvFilename}
              >
                {t.resumeCta}<DownloadSimple size={18} weight="bold" />
              </a>
              <ExternalLink href={activeProfileLinks.linkedin}>LinkedIn <ArrowUpRight size={16} /></ExternalLink>
              <ExternalLink href={activeProfileLinks.github}>GitHub <ArrowUpRight size={16} /></ExternalLink>
              <a className="hero-email" href={`mailto:${activeProfileLinks.email}`}><EnvelopeSimple size={16} weight="bold" />{activeProfileLinks.email}</a>
            </div>
            <p className="availability"><span />{t.availability}</p>
          </div>
          <div className="hero-stats">{t.stats.map(([number, label], index) => <div key={label}><strong>{index === 1 ? projectContent.length : number}</strong><span>{label}</span></div>)}</div>
        </section>

        <section className="projects section-pad" id="projects">
          <div className="section-heading" data-reveal><span className="asterisk">✳</span><h2>{t.selected}</h2></div>
          <div className="project-list">
            {projectContent.map((project, index) => (
              <article className="project" key={project.id} data-reveal>
                <span className="project-number">_{String(index + 1).padStart(2, '0')}.</span>
                <div className="project-title-block"><p>{project.eyebrowText}</p><h3>{project.name}</h3><div className="tech-list">{project.tech.map((item) => <span key={item}>{item}</span>)}</div></div>
                <div className="project-details">
                  <div><b>{t.objective}</b><p>{project.descriptionText}</p></div><div><b>{t.contribution}</b><p>{project.roleText}</p></div>
                  {project.href ? <ExternalLink href={project.href} className="project-link">{t.visit}<ArrowUpRight size={16} /></ExternalLink> : <span className="project-private">{t.internal}</span>}
                </div>
                <div className="project-image"><img src={project.image} alt={project.imageAlt || `${project.name} — ${t.projectScreenshot}`} loading="lazy" /></div>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-grid section-pad" id="experience">
          <article className="profile-panel experience-panel" data-reveal>
            <div className="panel-heading"><Briefcase size={22} /><h2>{t.experience}</h2></div><p className="company">LCC OPENTECH</p><h3>{t.experienceRole}</h3><span className="period">{t.present}</span><p>{t.experienceBody}</p>
          </article>
          <article className="profile-panel stack-panel" id="stack" data-reveal>
            <div className="panel-heading"><span className="code-mark">&lt;/&gt;</span><h2>{t.stack}</h2></div>
            <div className="skill-columns">{Object.entries(skills).map(([group, items]) => <div key={group}><h3>{group}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
          </article>
          <article className="profile-panel education-panel" data-reveal>
            <div className="panel-heading"><GraduationCap size={23} /><h2>{t.education}</h2></div><h3>{t.degree}</h3><p>{t.university}</p>
          </article>
          <article className="profile-panel certification-panel" data-reveal>
            <div className="panel-heading"><Certificate size={23} /><h2>{t.certs}</h2></div>
            <div className="credential"><strong>Máster en Programación Profesional</strong><span>Escuelas Millonarias · 2024</span></div>
            <div className="credential"><strong>Introducción a los Algoritmos de Ray Tracing y Path Tracing</strong><span>EVI / UCAB · 2017</span></div>
          </article>
          <article className="profile-panel thesis-panel" data-reveal>
            <div className="panel-heading"><span className="code-mark">AI</span><h2>{t.thesis}</h2></div><h3>{t.thesisTitle}</h3><p>{t.thesisBody}</p><div className="tech-list"><span>React</span><span>Python</span><span>NLP</span></div>
          </article>
        </section>

        <section className="contact section-pad" id="contact">
          <div data-reveal><p className="eyebrow">{t.contactLabel}</p><h2>{t.contactTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2><p>{t.contactBody}</p></div>
          <div className="contact-actions" data-reveal>
            <ExternalLink href={activeProfileLinks.linkedin} className="button primary">{t.linkedinCta}<LinkedinLogo size={20} weight="fill" /></ExternalLink>
            <div className="contact-opportunities">
              <span>{t.contactOpen}</span>
              {t.contactAreas.map((area) => <strong key={area}>{area}</strong>)}
            </div>
            <ExternalLink href={activeProfileLinks.github} className="button github-button"><GithubLogo size={20} weight="fill" />{t.githubCta}</ExternalLink>
            <a className="button email-button" href={`mailto:${activeProfileLinks.email}`}><EnvelopeSimple size={20} weight="bold" />{activeProfileLinks.email}</a>
            <div className="contact-meta">
              <p><GlobeHemisphereWest size={21} />{t.contactMode}</p>
              <p><MapPin size={21} />{t.location}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-pad"><span>© {new Date().getFullYear()} Boris Eduardo Beltrán García</span></footer>
      </div>
    </>
  );
}
