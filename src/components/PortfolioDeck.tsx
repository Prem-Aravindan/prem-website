import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Expand,
  Minimize2,
  MonitorPlay,
} from 'lucide-react';
import { cn } from '@/lib/utils';

import edu2 from '@/assets/edu2.png';
import mindlinkanalyzer1 from '@/assets/mindlinkanalyzer1.png';
import mindlinkanalyzer2 from '@/assets/mindlinkanalyzer2.png';
import ongoing1 from '@/assets/ongoing1.png';
import ongoing2 from '@/assets/ongoing2.png';
import ongoing3 from '@/assets/ongoing3.png';
import ongoing5 from '@/assets/ongoing5.png';
import ongoing6 from '@/assets/ongoing6.png';
import proddev from '@/assets/proddev.png';
import fulllstack1 from '@/assets/fulllstack1.png';
import fulllstack2 from '@/assets/fulllstack2.png';
import fulllstack3 from '@/assets/fulllstack3.png';
import rag1 from '@/assets/rag1.png';
import rag2 from '@/assets/rag2.png';
import rag3 from '@/assets/rag3.png';
import masterthesis1 from '@/assets/masterthesis1.png';
import masterthesis2 from '@/assets/masterthesis2.png';
import bachelorthesis1 from '@/assets/bachelorthesis1.png';
import bachelorthesis2 from '@/assets/bachelorthesis2.png';
import ppg1 from '@/assets/ppg1.png';
import hypertension1 from '@/assets/hypertension1.png';
import work2 from '@/assets/work2.png';

type PortfolioSlide = {
  kicker: string;
  title: string;
  subtitle: string;
  focus: string[];
  tags: string[];
  points: string[];
  takeaway: string;
  images: string[];
  accent: string;
};

const IMAGE_AUTOSCROLL_MS = 3500;

const slides: PortfolioSlide[] = [
  {
    kicker: 'About Me',
    title: 'Biomedical ideas to explainable AI systems',
    subtitle: 'Healthcare data | full-stack software | bounded AI',
    focus: ['Research to application', 'Workflow builder', 'Explainable AI'],
    tags: [],
    points: [
      'Biomedical engineering foundation',
      'Full-stack product ownership',
      'AI inside controlled workflows',
      'Usable, testable, explainable systems',
    ],
    takeaway: 'I build the workflow around the model.',
    images: [edu2, work2, proddev],
    accent: 'from-cyan-400 to-emerald-300',
  },
  {
    kicker: 'Career Start',
    title: 'Research shaped the baseline',
    subtitle: 'Prototype thinking before product thinking',
    focus: ['Patient impact', 'Prototype scaling', 'Technical upskilling'],
    tags: [],
    points: [
      'Professor-led research direction',
      'Bachelor POC to startup prototype',
      'Incubator positioning + funding path',
      'KU Leuven + Barco thesis',
      'AR tele-proctoring for surgery',
    ],
    takeaway: 'Impact needs more than a good idea.',
    images: [ppg1, hypertension1, bachelorthesis1, bachelorthesis2, masterthesis1, masterthesis2],
    accent: 'from-rose-300 to-orange-200',
  },
  {
    kicker: 'Mindspeller Client Workflows',
    title: 'Learning full-stack under pressure',
    subtitle: 'From client tickets to workflow ownership',
    focus: ['Production systems', 'Client workflows', 'Ownership growth'],
    tags: [],
    points: [
      'Live tickets from day one',
      'Learned stack while delivering',
      'Vue + Python APIs + MySQL',
      'Deployment, debugging, support',
      'Semantic networks',
      'AI-assisted data cleaning',
    ],
    takeaway: 'Support work became system ownership.',
    images: [fulllstack1, fulllstack2, fulllstack3, proddev],
    accent: 'from-emerald-400 to-teal-200',
  },
  {
    kicker: 'Neuroprofiling Platform',
    title: 'Released neuroprofiling product',
    subtitle: 'EEG | semantic responses | bounded AI reports',
    focus: ['Real users', 'Live traffic', 'Explainable AI'],
    tags: [],
    points: [
      'B2B to B2C product shift',
      'Consumer-grade EEG constraints',
      'Live processing layer',
      'Semantic / IAT response path',
      'Three bounded AI agents',
      '1000+ people screened',
      'Multiple live events',
      'V1 open roles to V2 curated mapping',
    ],
    takeaway: 'AI as interpreter, not authority.',
    images: [ongoing3, ongoing5, ongoing6, ongoing1, ongoing2, mindlinkanalyzer1, mindlinkanalyzer2],
    accent: 'from-violet-300 to-cyan-300',
  },
  {
    kicker: 'RAG Transfer',
    title: 'Retrieval as evidence control',
    subtitle: 'From document assistant to MDR workflow thinking',
    focus: ['Grounded retrieval', 'Source traceability', 'Human review'],
    tags: [],
    points: [
      'PDF ingestion',
      'OCR + chunking',
      'Embeddings + retrieval',
      'Grounded answers',
      'Country-scoped MDR context',
      'Source citations',
      'Gap analysis',
      'Audit trail + review',
    ],
    takeaway: 'RAG is the knowledge layer, not the product.',
    images: [rag1, rag2, rag3],
    accent: 'from-amber-300 to-sky-300',
  },
  {
    kicker: 'VITO Fit',
    title: 'What my portfolio shows VITO',
    subtitle: 'Translate | build | constrain | review',
    focus: ['TRL7 mindset', 'Healthcare AI', 'Regulatory workflow'],
    tags: [],
    points: [
      'Unclear idea to working workflow',
      'Data to structure to interpretation',
      'Deterministic logic before AI',
      'AI with boundaries',
      'Validation thinking',
      'Documentation mindset',
      'Human-in-the-loop review',
    ],
    takeaway: 'Useful AI must be scoped, grounded, tested, and reviewed.',
    images: [mindlinkanalyzer2, ongoing1, rag1, work2],
    accent: 'from-lime-300 to-cyan-300',
  },
];

function getImageAlt(slide: PortfolioSlide, index: number) {
  return `${slide.title} supporting visual ${index + 1}`;
}

export default function PortfolioDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [manualImageSlides, setManualImageSlides] = useState<Set<number>>(() => new Set());
  const [isPresenting, setIsPresenting] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const deckRef = useRef<HTMLElement>(null);
  const slide = slides[currentSlide];
  const hasManualImageSelection = manualImageSlides.has(currentSlide);

  const goToSlide = useCallback((nextIndex: number) => {
    const boundedIndex = (nextIndex + slides.length) % slides.length;
    setCurrentSlide(boundedIndex);
    setActiveImage(0);
    setIsImagePreviewOpen(false);
  }, []);

  const goToPrevious = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);
  const goToNext = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);

  const selectImage = (index: number) => {
    setActiveImage(index);
    setIsImagePreviewOpen(false);
    setManualImageSlides((previous) => {
      const next = new Set(previous);
      next.add(currentSlide);
      return next;
    });
  };

  const togglePresentationMode = async () => {
    if (isPresenting) {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsPresenting(false);
      return;
    }

    setIsPresenting(true);
    await deckRef.current?.requestFullscreen?.();
  };


  useEffect(() => {
    if (slide.images.length <= 1 || hasManualImageSelection) return;

    const timer = window.setInterval(() => {
      setIsImagePreviewOpen(false);
      setActiveImage((previous) => (previous + 1) % slide.images.length);
    }, IMAGE_AUTOSCROLL_MS);

    return () => window.clearInterval(timer);
  }, [currentSlide, hasManualImageSelection, slide.images.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      }
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        goToNext();
      }
      if (event.key === 'Escape') {
        setIsPresenting(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsPresenting(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <section
      id="portfolio-deck"
      ref={deckRef}
      className={cn(
        'py-12 sm:py-16 px-4',
        isPresenting && 'fixed inset-0 z-[120] h-screen overflow-hidden bg-[#0d0f12] p-4'
      )}
    >
      <div className={cn('mx-auto flex w-full flex-col px-2 sm:w-[92%] lg:w-[82%]', isPresenting && 'h-full px-0 sm:w-full lg:w-full')}>
        <div className={cn('mb-5 flex shrink-0 flex-col gap-3 text-left sm:mb-6 md:flex-row md:items-end md:justify-between', isPresenting && 'hidden')}>
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-gray-300">
              <MonitorPlay className="h-3.5 w-3.5" />
              Interview Portfolio Deck
            </div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Presentation Mode</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">
              Use the arrows, keyboard, or fullscreen mode to walk through the portfolio story during the interview.
            </p>
          </div>

          <button
            type="button"
            onClick={togglePresentationMode}
            className="inline-flex w-fit items-center gap-2 rounded-md border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
          >
            <Expand className="h-4 w-4" />
            Fullscreen
          </button>
        </div>

        <div
          className={cn(
            'relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/12 bg-[#111318] shadow-2xl shadow-black/30',
            isPresenting ? 'h-full' : 'h-[clamp(640px,78vh,800px)]'
          )}
        >
          <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', slide.accent)} />

          <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div className="flex min-h-0 flex-col justify-between gap-6 overflow-hidden p-7 text-left sm:p-9 lg:p-11">
              <div className="min-h-0 space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <span className="font-medium text-gray-200">{slide.kicker}</span>
                  <span className="h-1 w-1 rounded-full bg-gray-600" />
                  <span>Slide {currentSlide + 1} of {slides.length}</span>
                </div>

                <div className="space-y-4">
                  <h3 className="max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-4xl xl:text-[42px]">
                    {slide.title}
                  </h3>
                  <p className="max-w-4xl text-base leading-7 text-gray-300 sm:text-lg xl:text-xl">
                    {slide.subtitle}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {slide.focus.map((focus) => (
                    <span
                      key={focus}
                      className="rounded-full border border-white/14 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-gray-100"
                    >
                      {focus}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-400">Key points</p>
                  <ul className={cn(slide.points.length > 6 ? 'space-y-2.5 text-sm leading-6 sm:text-base' : 'space-y-4 text-base leading-7 sm:text-lg', 'text-gray-200')}>
                    {slide.points.map((point) => (
                      <li key={point} className="grid grid-cols-[1rem_minmax(0,1fr)] gap-3">
                        <span className={cn('mt-3 h-2 w-2 rounded-full bg-gradient-to-r', slide.accent)} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="shrink-0 space-y-4">
                {slide.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {slide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="rounded-lg border border-white/12 bg-white/[0.04] p-4">
                  <p className="text-sm font-medium leading-6 text-gray-100">
                    {slide.takeaway}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex min-h-0 flex-col border-t border-white/10 bg-[#0b0d10] p-5 lg:border-l lg:border-t-0">
              <div className="mb-3 flex shrink-0 items-center justify-between gap-3 text-sm text-gray-400">
                <span>Visual evidence</span>
                <span>{activeImage + 1} / {slide.images.length}</span>
              </div>

              <div
                className="relative min-h-0 flex-1 cursor-zoom-in overflow-hidden rounded-lg border border-white/10 bg-black/45"
                onMouseEnter={() => setIsImagePreviewOpen(true)}
                onMouseLeave={() => setIsImagePreviewOpen(false)}
              >
                <img
                  src={slide.images[activeImage]}
                  alt={getImageAlt(slide, activeImage)}
                  className="h-full w-full object-contain"
                />
                {hasManualImageSelection && (
                  <div className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/70 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
                    Autoscroll paused
                  </div>
                )}
              </div>

              <div className="mt-3 grid shrink-0 grid-cols-3 gap-2">
                {slide.images.map((image, index) => (
                  <button
                    key={`${slide.title}-${image}`}
                    type="button"
                    onClick={() => selectImage(index)}
                    className={cn(
                      'aspect-video overflow-hidden rounded-md border bg-black/50 transition',
                      activeImage === index
                        ? 'border-white/80 ring-2 ring-white/20'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    )}
                    aria-label={`Show visual ${index + 1} for ${slide.title}`}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isImagePreviewOpen && (
            <div className="pointer-events-none fixed inset-0 z-[160] flex items-center justify-center bg-black/55 p-8 backdrop-blur-sm" aria-hidden="true">
              <div className="max-h-[82vh] max-w-[82vw] overflow-hidden rounded-xl border border-white/15 bg-black shadow-2xl shadow-black/60">
                <img
                  src={slide.images[activeImage]}
                  alt=""
                  className="max-h-[82vh] max-w-[82vw] object-contain"
                />
              </div>
            </div>
          )}

          <div className="flex shrink-0 flex-col gap-3 border-t border-white/10 bg-[#0d0f12] p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-2 sm:justify-start">
              <button
                type="button"
                onClick={goToPrevious}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={togglePresentationMode}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
              >
                {isPresenting ? <Minimize2 className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
                {isPresenting ? 'Exit' : 'Fullscreen'}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
                  )}
                  aria-label={`Go to slide ${index + 1}: ${item.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

