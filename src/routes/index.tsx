import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowUp,
  ExternalLink,
  Copy,
  Check,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  Database,
  Globe,
  Brain,
  Sparkles,
  Award,
  Trophy,
  Star,
  Menu,
  X,
  Send,
  ArrowRight,
} from "lucide-react";
import { toast, Toaster } from "sonner";

import profileImg from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: PortfolioPage,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const ROLES = [
  "Java Developer",
  "AI Enthusiast",
  "Machine Learning Engineer",
  "Software Engineer",
  "Problem Solver",
];

function PortfolioPage() {
  return (
    <div className="relative min-h-dvh bg-background text-foreground overflow-x-hidden">
      <AuroraBackground />
      <Spotlight />
      <ScrollProgress />
      <Nav />
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
          <Footer />
      <BackToTop />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

/* ---------- Background layers ---------- */

function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      
      {/* Aurora animation removed */}
      <div className="absolute inset-0 bg-aurora" />

      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "42px 42px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <Particles />
    </div>
  );
}


function Particles() {
  const dots = Array.from({ length: 24 });

  return (
    <div className="absolute inset-0">
      {dots.map((_, i) => {
        const size = 2 + (i % 4);
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;

        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background:
                i % 2
                  ? "oklch(0.85 0.15 200 / 0.7)"
                  : "oklch(0.72 0.22 250 / 0.7)",
              boxShadow: "0 0 12px currentColor",

              // floating animation removed
              animation: "none",
              transform: "none",
            }}
          />
        );
      })}
    </div>
  );
}


function Spotlight() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handler);

    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, [x, y]);


  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none hidden md:block"
      style={{
        background: useTransform([x, y], ([lx, ly]) =>
          `radial-gradient(
            360px circle at ${lx}px ${ly}px,
            oklch(0.72 0.22 250 / 0.12),
            transparent 60%
          )`
        ) as unknown as string,

        // prevent movement animation
        transform: "none",
      }}
    />
  );
}

/* ---------- Scroll indicator ---------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
    >
      <div className="h-full w-full bg-[linear-gradient(90deg,var(--electric),var(--royal),var(--cyan-accent))]" />
    </motion.div>
  );
}

/* ---------- Nav ---------- */

function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1120px,calc(100%-1.5rem))]"
      >
        <div className="glass-strong gradient-border rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 pl-1">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--gradient-primary)] text-white text-sm font-bold shadow-[var(--shadow-glow-blue)]">
              P
            </span>
            <span className="hidden sm:inline text-sm font-medium tracking-tight">Sai Varshitha</span>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  active === n.id ? "text-white" : "text-muted-foreground hover:text-white"
                }`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-1.5 text-xs font-semibold hover:bg-white/90 transition"
            >
              Hire Me <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden bg-black/70 backdrop-blur-lg"
          >
            <div className="p-6 flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="px-6 pt-4 flex flex-col gap-1">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-display font-semibold py-2 border-b border-white/5"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Hero ---------- */

function TypingText() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[idx];
    const speed = deleting ? 40 : 90;
    const t = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <span className="text-gradient">
      {text}
      <span className="animate-blink text-white">|</span>
    </span>
  );
}

function Hero() {
  return (
    <section id="home" className="relative pt-36 md:pt-40 pb-20 md:pb-28">
      <Container>
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <FadeUp>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for internships & full-time roles
              </div>
              <h1 className="mt-6 font-display font-semibold text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight">
                Hi, I'm <br />
                <span className="text-gradient">Pothamsetty</span>
                <br />
                Sai Varshitha
              </h1>
              <p className="mt-6 text-xl md:text-2xl font-display min-h-[2em]">
                I'm a <TypingText />
              </p>
              <p className="mt-6 max-w-xl text-muted-foreground text-base md:text-lg leading-relaxed">
                Computer Science student building practical software with Java and modern AI. I care
                about clean code, thoughtful design, and solutions that ship.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <MagneticButton primary href="/resume.pdf" download="Pothamsetty-Sai-Varshitha-Resume.pdf">
                  <Download className="h-4 w-4" />
                  Download Resume
                </MagneticButton>

                <MagneticButton href="#contact">
                  <Mail className="h-4 w-4" />
                  Contact Me
                </MagneticButton>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <SocialIcon href="https://github.com/pothamsettysaivarshitha" label="GitHub">
                  <Github className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon
                  href="https://www.linkedin.com/in/pothamsetty-sai-varshitha-b79153334"
                  label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href="mailto:pothamsettysaivarshitha@gmail.com" label="Email">
                  <Mail className="h-4 w-4" />
                </SocialIcon>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <ProfileCard />
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}

function ProfileCard() {
  return (
    <div className="relative mx-auto w-full max-w-md aspect-square">
      {/* rotating gradient ring */}
      <div
        className="absolute -inset-6 rounded-full opacity-70 blur-2xl animate-spin-slow"
        style={{ background: "var(--gradient-aurora)" }}
      />
      <div
        className="absolute inset-0 rounded-full p-[2px] animate-spin-slow"
        style={{ background: "var(--gradient-aurora)" }}
      >
        <div className="h-full w-full rounded-full bg-background" />
      </div>
      {/* glass container */}
      <div className="absolute inset-3 rounded-full overflow-hidden glass-strong animate-float shadow-[var(--shadow-glow)]">
        <img
          src={profileImg}
          alt="Pothamsetty Sai Varshitha"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </div>
      {/* floating chips */}
      <FloatingChip className="-top-2 left-8" delay={0}>
        <Code2 className="h-3.5 w-3.5 text-[var(--electric)]" /> Java
      </FloatingChip>
      <FloatingChip className="top-1/2 -right-4" delay={0.4}>
        <Brain className="h-3.5 w-3.5 text-[var(--royal)]" /> AI / ML
      </FloatingChip>
      <FloatingChip className="-bottom-2 left-4" delay={0.8}>
        <MapPin className="h-3.5 w-3.5 text-[var(--cyan-accent)]" /> India
      </FloatingChip>
    </div>
  );
}

function FloatingChip({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.4 + delay, duration: 0.6 }}
      className={`absolute glass-strong rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- About ---------- */

const STATS = [
  { label: "Java Development", value: "Core" },
  { label: "Artificial Intelligence", value: "Applied" },
  { label: "Machine Learning", value: "Hands-on" },
  { label: "Software Engineering", value: "Practical" },
  { label: "Web Development", value: "Modern" },
  { label: "Problem Solving", value: "Strong" },
];

function About() {
  return (
    <Section id="about" eyebrow="About" title="Building software with intent">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <FadeUp>
          <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm <span className="text-white">Pothamsetty Sai Varshitha</span>, a Computer Science
              and Engineering student passionate about Java Development and Artificial Intelligence.
            </p>
            <p>
              I enjoy building practical software solutions, solving real-world problems, and
              continuously learning modern technologies.
            </p>
            <p>
              I'm actively seeking <span className="text-white">Software Development, Java
              Developer, AI/ML Internship, and Full-Time Software Engineer</span> opportunities
              where I can contribute, innovate, and grow.
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <GlassCard key={s.label} className="p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {s.value}
                </p>
                <p className="mt-2 font-display font-semibold text-lg leading-tight">{s.label}</p>
              </GlassCard>
            ))}
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}

/* ---------- Education ---------- */

const EDUCATION = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    place: "St. Ann's College of Engineering & Technology, Chirala",
    period: "2023 – 2027",
    score: "CGPA 8.2",
  },
  {
    degree: "Intermediate",
    place: "DVC Viveka Junior College",
    period: "2021 – 2023",
    score: "86%",
  },
  {
    degree: "SSC (ICSE)",
    place: "St. Ann's School",
    period: "2020 – 2021",
    score: "73%",
  },
];

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic timeline">
      <Timeline items={EDUCATION.map((e) => ({
        title: e.degree,
        subtitle: e.place,
        meta: e.period,
        tag: e.score,
        icon: <GraduationCap className="h-4 w-4" />,
      }))} />
    </Section>
  );
}

const EXPERIENCE = [
  {
    role: "AI, Machine Learning & Deep Learning Intern",
    company: "Data Valley",
    period: "May 2026 – June 2026",
    certificate: "/datavalley intern.pdf",
    points: [
      "Worked on AI, ML, and Deep Learning concepts",
      "Built AI models and developed practical AI solutions",
      "Improved data analysis skills across real-world AI applications",
    ],
  },
  {
    role: "AI & Machine Learning Intern",
    company: "SmartBridge Educational Services Pvt. Ltd.",
    period: "May 2025 – Jul 2025",
    certificate: "/smartinternz internship.pdf",
    points: [
      "Data preprocessing and feature engineering",
      "Machine Learning model building and AI project implementation",
      "Practical industry training and analytical thinking development",
    ],
  },
];function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Internship Experience">
      <div className="space-y-4">
        {EXPERIENCE.map((exp, i) => (
          <FadeUp key={exp.role} delay={i * 0.08}>
            <GlassCard className="p-6 md:p-8 group hover:-translate-y-0.5 transition-transform">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0 h-11 w-11 rounded-full grid place-items-center bg-[var(--gradient-primary)] shadow-[var(--shadow-glow-blue)]">
                    <Briefcase className="h-5 w-5 text-white" />
                    <span className="absolute -inset-1 rounded-full border border-white/10 animate-ping" />
                  </div>

                  <div>
                    <h3 className="font-display font-semibold text-xl">
                      {exp.role}
                    </h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                </div>

                <span className="glass rounded-full px-3 py-1.5 text-xs">
                  {exp.period}
                </span>
              </div>

              <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
                {exp.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 rounded-full bg-[var(--electric)] shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <a
                  href={exp.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                >
                  View Certificate
                </a>
              </div>
            </GlassCard>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
/* ---------- Skills ---------- */

const SKILLS: { title: string; icon: React.ReactNode; items: string[] }[] = [
  { title: "Programming", icon: <Code2 className="h-4 w-4" />, items: ["Java", "Python", "C", "SQL"] },
  { title: "Web", icon: <Globe className="h-4 w-4" />, items: ["HTML", "CSS", "Bootstrap"] },
  { title: "Database", icon: <Database className="h-4 w-4" />, items: ["MySQL", "MongoDB"] },
  {
    title: "AI",
    icon: <Brain className="h-4 w-4" />,
    items: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "TensorFlow", "Scikit-learn"],
  },
  {
    title: "Soft Skills",
    icon: <Sparkles className="h-4 w-4" />,
    items: [
      "Problem Solving",
      "Teamwork",
      "Communication",
      "Leadership",
      "Time Management",
      "Adaptability",
    ],
  },
];

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="A well-rounded toolkit">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SKILLS.map((cat, i) => (
          <FadeUp key={cat.title} delay={i * 0.06}>
            <TiltCard>
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-2.5">
                  <span className="grid place-items-center h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-[var(--cyan-accent)]">
                    {cat.icon}
                  </span>
                  <h3 className="font-display font-semibold text-lg">{cat.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full glass px-3 py-1.5 text-xs hover:border-[var(--electric)] transition-colors"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </TiltCard>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Projects ---------- */

/* ---------- Projects ---------- */

const PROJECTS = [
  {
    title: "Contactless Attendance Management System",
    tech: ["Java", "MySQL"],
    description:
      "A database-driven attendance system that automates recording and securely stores student records, reducing manual effort and improving accuracy.",
    role:
      "Designed the database, implemented attendance features, and optimized storage and retrieval.",
    gradient:
      "from-[oklch(0.72_0.22_250)] to-[oklch(0.55_0.24_295)]",
    icon: <Code2 className="h-6 w-6" />,
    github:
      "https://github.com/pothamsettysaivarshitha/contactless-attendance-using-DB",
  },
  {
    title: "HematoVision - Advanced Blood Cell Classification",
    tech: ["Python", "Machine Learning", "OpenCV"],
    description:
      "An AI-powered blood cell classification system that detects and classifies blood cells from microscopic images using machine learning and image processing techniques.",
    role:
      "Developed image preprocessing, trained the ML model, and evaluated prediction accuracy.",
    gradient:
      "from-[oklch(0.55_0.24_295)] to-[oklch(0.85_0.15_200)]",
    icon: <Brain className="h-6 w-6" />,
    github:
      "https://github.com/pothamsettysaivarshitha/Hematovision-Advanced-Blood-cell-",
  },
  {
    title: "Voice Emotion Detector",
    tech: ["Python", "Speech Processing", "Machine Learning"],
    description:
      "A machine learning application that recognizes human emotions from voice recordings using speech feature extraction and classification algorithms.",
    role:
      "Performed audio preprocessing, feature extraction, model training, and emotion prediction.",
    gradient:
      "from-[oklch(0.85_0.15_200)] to-[oklch(0.6_0.24_275)]",
    icon: <Sparkles className="h-6 w-6" />,
    github:
      "https://github.com/pothamsettysaivarshitha/Voice-emotion-detector-main",
  },
];

function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Things I've Built">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((p, i) => (
          <FadeUp key={p.title} delay={i * 0.08}>
            <TiltCard>
              <GlassCard className="p-0 overflow-hidden h-full flex flex-col group">
                <div
                  className={`relative h-44 bg-gradient-to-br ${p.gradient} overflow-hidden`}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35) 0, transparent 40%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2) 0, transparent 40%)",
                    }}
                  />

                  <div className="absolute inset-0 grid place-items-center">
                    <div className="h-16 w-16 rounded-2xl glass-strong grid place-items-center text-white group-hover:scale-110 transition-transform">
                      {p.icon}
                    </div>
                  </div>

                  <div className="absolute inset-x-4 bottom-3 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="glass-strong rounded-full px-2.5 py-1 text-[10px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-lg leading-tight">
                    {p.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {p.description}
                  </p>

                  <p className="mt-3 text-xs text-muted-foreground/80">
                    <span className="text-white/80 font-medium">Role: </span>
                    {p.role}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/5">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm hover:border-[var(--electric)] transition"
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </a>
                  </div>
                </div>
              </GlassCard>
            </TiltCard>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}
/* ---------- Certifications ---------- */

const CERTS = [
  {
    name: "CSI First Prize - Poster Presentation",
    issuer: "Computer Society of India (CSI)",
    file: "/csi.pdf",
  },
  {
    name: "NPTEL Silver - Internet of Things (80%)",
    issuer: "NPTEL",
    file: "/iot-nptel.pdf",
  },
  {
    name: "NPTEL Elite - Privacy & Security in Online Social Media (54%)",
    issuer: "NPTEL",
    file: "/nptel-privacy-security.pdf",
  },
  {
    name: "TCS iON Java Certification",
    issuer: "TCS iON",
    file: "/tcsion-java.pdf",
  },
  {
    name: "Infosys Java Certification",
    issuer: "Infosys",
    file: "/infosys-java-certificate.pdf",
  },
];

function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Certifications & Achievements"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CERTS.map((c, i) => (
          <FadeUp key={c.name} delay={i * 0.08}>
            <GlassCard className="p-6 h-full flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">

              <div className="flex items-start gap-4">
                <div className="grid place-items-center h-12 w-12 rounded-2xl bg-[var(--gradient-primary)] text-white shadow-[var(--shadow-glow-blue)]">
                  <Award className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <h3 className="font-display font-semibold text-lg">
                    {c.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-1">
                    {c.issuer}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={c.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--gradient-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
                >
                  <Award className="h-4 w-4" />
                  View Certificate
                </a>
              </div>

            </GlassCard>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}


/* ---------- Contact ---------- */

function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const email = "pothamsettysaivarshitha@gmail.com";

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 1800);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Thanks! I'll be in touch soon.");
    setTimeout(() => setSent(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something together">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
        <FadeUp>
          <GlassCard className="p-6 md:p-8 h-full">
            <p className="text-sm text-muted-foreground">Prefer email or DMs?</p>
            <div className="mt-4 space-y-3">
              <ContactRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={email}
                action={
                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-xs hover:border-[var(--electric)]"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                }
              />
              <ContactRow
                icon={<Linkedin className="h-4 w-4" />}
                label="LinkedIn"
                value="pothamsetty-sai-varshitha"
                href="https://www.linkedin.com/in/pothamsetty-sai-varshitha-b79153334"
              />
              <ContactRow
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
                value="pothamsettysaivarshitha"
                href="https://github.com/pothamsettysaivarshitha"
              />
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-3">
            <a
  href="/resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90"
>
  <Download className="h-4 w-4" />
  View Resume
</a>

              <div className="flex items-center gap-2">
                <SocialIcon href="https://github.com/pothamsettysaivarshitha" label="GitHub">
                  <Github className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon
                  href="https://www.linkedin.com/in/pothamsetty-sai-varshitha-b79153334"
                  label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </SocialIcon>
                <SocialIcon href={`mailto:${email}`} label="Email">
                  <Mail className="h-4 w-4" />
                </SocialIcon>
              </div>
            </div>
          </GlassCard>
        </FadeUp>

        <FadeUp delay={0.1}>
          <GlassCard className="p-6 md:p-8">
            <form onSubmit={submit} className="grid gap-4">
              <Field label="Name">
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[var(--electric)] transition"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[var(--electric)] transition"
                />
              </Field>
              <Field label="Message">
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[var(--electric)] transition resize-none"
                />
              </Field>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gradient-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] hover:opacity-95 transition"
                style={{ background: "var(--gradient-primary)" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {sent ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="inline-flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" /> Message sent
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="inline-flex items-center gap-2"
                    >
                      Send message <Send className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </GlassCard>
        </FadeUp>
      </div>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  action,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  action?: React.ReactNode;
}) {
  const body = (
    <div className="flex items-center gap-3 rounded-2xl glass px-4 py-3 hover:border-[var(--electric)] transition-colors">
      <span className="grid place-items-center h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-[var(--cyan-accent)]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm truncate">{value}</p>
      </div>
      {action}
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {body}
    </a>
  ) : (
    body
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="relative mt-20 pb-10">
      <div className="mx-auto mb-10 h-px w-[min(1120px,calc(100%-1.5rem))] bg-[linear-gradient(90deg,transparent,var(--electric),var(--royal),transparent)] animate-shimmer" />
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display font-semibold text-lg">Pothamsetty Sai Varshitha</p>
            <p className="text-sm text-muted-foreground">Java Developer · AI Enthusiast</p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {NAV.slice(0, 6).map((n) => (
              <a key={n.id} href={`#${n.id}`} className="hover:text-white transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <SocialIcon href="https://github.com/pothamsettysaivarshitha" label="GitHub">
              <Github className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon
              href="https://www.linkedin.com/in/pothamsetty-sai-varshitha-b79153334"
              label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="mailto:pothamsettysaivarshitha@gmail.com" label="Email">
              <Mail className="h-4 w-4" />
            </SocialIcon>
          </div>
        </div>
        <p className="mt-8 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Pothamsetty Sai Varshitha · Designed & developed with care.
        </p>
      </Container>
    </footer>
  );
}

/* ---------- Back to top ---------- */

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 grid place-items-center h-11 w-11 rounded-full glass-strong shadow-[var(--shadow-glow)] hover:scale-105 transition"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ---------- Primitives ---------- */

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 md:px-8 ${className}`}>{children}</div>;
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative py-20 md:py-28 scroll-mt-24">
      <Container>
        <FadeUp>
          <div className="mb-10 md:mb-14 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                — {eyebrow}
              </p>
              <h2 className="mt-3 font-display font-semibold text-3xl md:text-5xl tracking-tight max-w-3xl">
                {title}
              </h2>
            </div>
          </div>
        </FadeUp>
        {children}
      </Container>
    </section>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass gradient-border rounded-3xl ${className}`}>{children}</div>
  );
}

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * 6);
    ry.set(px * 6);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="h-full will-change-transform"
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  children,
  primary,
  href,
  download,
}: {
  children: React.ReactNode;
  primary?: boolean;
  href?: string;
  download?: boolean | string;
}) {

  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
    primary
      ? "text-white shadow-[var(--shadow-glow)]"
      : "glass-strong hover:border-[var(--electric)]"
  }`;
  const style = primary ? { background: "var(--gradient-primary)" } : undefined;

  const inner = (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download as any}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={cls}
        style={style}
      >
        {inner}
      </motion.a>

    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cls}
      style={style}
    >
      {inner}
    </motion.button>
  );
}

function SocialIcon({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group relative grid place-items-center h-10 w-10 rounded-full glass hover:border-[var(--electric)] transition"
    >
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ boxShadow: "0 0 24px oklch(0.72 0.22 250 / 0.6)" }}
      />
      <span className="relative">{children}</span>
    </a>
  );
}

function Timeline({
  items,
}: {
  items: { title: string; subtitle: string; meta: string; tag?: string; icon?: React.ReactNode }[];
}) {
  return (
    <div className="relative pl-6 md:pl-10">
      <div className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-[linear-gradient(180deg,transparent,var(--electric),var(--royal),transparent)]" />
      <div className="space-y-6">
        {items.map((it, i) => (
          <FadeUp key={it.title} delay={i * 0.08}>
            <div className="relative">
              <span className="absolute -left-6 md:-left-10 top-4 h-4 w-4 rounded-full bg-[var(--gradient-primary)] shadow-[var(--shadow-glow-blue)] ring-4 ring-background" />
              <GlassCard className="p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {it.icon && (
                      <span className="grid place-items-center h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-[var(--cyan-accent)] shrink-0">
                        {it.icon}
                      </span>
                    )}
                    <div>
                      <h3 className="font-display font-semibold text-lg leading-tight">
                        {it.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{it.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-muted-foreground">{it.meta}</span>
                    {it.tag && (
                      <span className="rounded-full bg-[var(--gradient-primary)] px-3 py-1 text-xs font-semibold text-white">
                        {it.tag}
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
