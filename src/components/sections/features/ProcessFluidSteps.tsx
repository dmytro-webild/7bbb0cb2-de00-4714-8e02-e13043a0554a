import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Bell,
  Calendar,
  Check,
  Circle,
  Cloud,
  CreditCard,
  Database,
  FileText,
  Folder,
  Inbox,
  Landmark,
  LineChart,
  Link,
  Mail,
  MessageSquare,
  Sparkle,
  Users,
  type LucideIcon,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import FluidPanel from "@/components/kit/FluidPanel";
import MutedAccentTitle from "@/components/kit/MutedAccentTitle";
import { useKitMotion } from "@/components/kit/kitMotion";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const ICONS: Record<string, LucideIcon> = {
  calendar: Calendar,
  inbox: Inbox,
  chat: MessageSquare,
  mail: Mail,
  file: FileText,
  card: CreditCard,
  bank: Landmark,
  chart: LineChart,
  users: Users,
  cloud: Cloud,
  database: Database,
  folder: Folder,
  bell: Bell,
  link: Link,
};

const SWAP: [number, number, number, number] = [0.65, 0, 0.35, 1];
const SKELETON = ["100%", "86%", "62%", "74%"];

type Source = { label: string; icon?: string };
type RankedRow = { label: string; value: number };

type ConnectSpec = { kind: "connect"; variant?: "hub" | "flow" | "stack"; title?: string; sources: Source[] };
type RankedSpec = { kind: "ranked"; variant?: "list" | "bars" | "board"; title: string; badge?: string; columns?: string[]; rows: RankedRow[] };
type ApproveSpec = {
  kind: "approve";
  variant?: "card" | "chat" | "checklist";
  title: string;
  badge?: string;
  lines?: number;
  messages?: string[];
  tasks?: string[];
  primary: string;
  secondary?: string;
};

type StepUi = ConnectSpec | RankedSpec | ApproveSpec;

type Step = { title: string; description?: string; ui: StepUi; imageSrc?: string; imageAlt?: string };

type ProcessFluidStepsProps = {
  tag?: string;
  title?: string;
  mutedTitle?: string;
  description?: string;
  primaryButton?: { text: string; href: string };
  items?: Step[];
  className?: string;
};

type Motion = { play: boolean; loop: boolean; delay: number };

const DEFAULT_ITEMS: Step[] = [
  {
    title: "Connect your tools",
    description: "Link the apps your team already uses in a few clicks. Everything syncs in the background from day one.",
    ui: { kind: "connect", sources: [{ label: "Email", icon: "mail" }, { label: "Calendar", icon: "calendar" }, { label: "Docs", icon: "file" }] },
  },
  {
    title: "See what matters",
    description: "Every task and request is ranked by impact, so the work that matters most sits at the top of the list.",
    ui: { kind: "ranked", title: "Top priorities", badge: "Today", rows: [{ label: "Client follow-up", value: 0.9 }, { label: "Team review", value: 0.65 }, { label: "Weekly report", value: 0.4 }] },
  },
  {
    title: "Act in one place",
    description: "Approve drafted replies, updates and reports in one view, then get back to the work that counts.",
    ui: { kind: "approve", title: "Draft ready", badge: "just now", lines: 3, primary: "Approve & send", secondary: "Edit" },
  },
];

const unit = (value: number) => Math.min(1, Math.max(0, value));

const MAX_ROWS = 4;

function cap<T>(list: T[]) {
  if (list.length <= MAX_ROWS) return { shown: list, extra: 0 };
  return { shown: list.slice(0, MAX_ROWS - 1), extra: list.length - MAX_ROWS + 1 };
}

const DotCluster = ({ className = "" }: { className?: string }) => (
  <div aria-hidden="true" className={cn("relative", className)}>
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="absolute left-1/2 top-1/2 h-[18%] w-[18%] rounded-full bg-current"
        style={{ transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-170%) scale(${i % 2 ? 0.8 : 1})` }}
      />
    ))}
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <div className="flex shrink-0 items-center gap-1.5">
    <div aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white" />
    <p className="whitespace-nowrap text-[length:var(--text-label)] text-white/70">{text}</p>
  </div>
);

const HubTile = ({ play, loop, delay, className }: Motion & { className: string }) => {
  const { ease } = useKitMotion();
  return (
    <motion.div
      initial={false}
      animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.5, ease, delay }}
      className="shrink-0 rounded-[calc(var(--radius)+0.5rem)] border border-white/25 bg-white/10 p-[1.6cqw] backdrop-blur-md"
    >
      <div className={cn("grid aspect-square place-items-center rounded-[var(--radius)] bg-white text-black", className)}>
        <motion.div
          className="w-[40%]"
          animate={loop ? { transform: ["rotate(0deg)", "rotate(360deg)"] } : undefined}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <DotCluster className="aspect-square w-full" />
        </motion.div>
      </div>
    </motion.div>
  );
};

type Box = { left: number; top: number; right: number; bottom: number; cx: number; cy: number };

const rel = (base: DOMRect, el: Element | null | undefined): Box | null => {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const left = r.left - base.left;
  const top = r.top - base.top;
  return { left, top, right: left + r.width, bottom: top + r.height, cx: left + r.width / 2, cy: top + r.height / 2 };
};

const n1 = (value: number) => value.toFixed(1);

type Wiring = { routes: string[]; lines: string };

const Wires = ({
  boxRef,
  measure,
  play,
  loop,
  delay,
  dur,
}: Motion & { boxRef: RefObject<HTMLDivElement | null>; measure: (base: DOMRect) => Wiring | null; dur: number }) => {
  const { ease } = useKitMotion();
  const [geo, setGeo] = useState<(Wiring & { w: number; h: number }) | null>(null);
  const measureRef = useRef(measure);
  useLayoutEffect(() => {
    measureRef.current = measure;
  });
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    let alive = true;
    const update = () => {
      if (!alive) return;
      const wiring = measureRef.current(box.getBoundingClientRect());
      setGeo(wiring ? { ...wiring, w: box.offsetWidth, h: box.offsetHeight } : null);
    };
    const observer = new ResizeObserver(update);
    observer.observe(box);
    document.fonts?.ready.then(update);
    return () => {
      alive = false;
      observer.disconnect();
    };
  }, [boxRef]);
  if (!geo) return null;
  return (
    <svg
      aria-hidden="true"
      width={geo.w}
      height={geo.h}
      viewBox={`0 0 ${n1(geo.w)} ${n1(geo.h)}`}
      className="pointer-events-none absolute left-0 top-0 overflow-visible"
    >
      <motion.path
        d={geo.lines}
        fill="none"
        strokeWidth={1}
        strokeLinejoin="round"
        className="stroke-white/40"
        initial={false}
        animate={{ opacity: play ? 1 : 0 }}
        transition={{ duration: 0.5, ease, delay: delay + 0.2 }}
      />
      {loop &&
        geo.routes.map((route, i) => (
          <circle key={i} r={3.5} opacity={0} className="fill-white">
            <animateMotion
              path={route}
              dur={`${dur}s`}
              begin={`${(delay + 0.6 + (i * dur) / geo.routes.length).toFixed(2)}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keyPoints="0;1;1"
              keyTimes="0;0.85;1"
              keySplines="0.45 0 0.55 1;0 0 1 1"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0;0"
              keyTimes="0;0.1;0.74;0.85;1"
              dur={`${dur}s`}
              begin={`${(delay + 0.6 + (i * dur) / geo.routes.length).toFixed(2)}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
    </svg>
  );
};

const HubConnect = ({ sources, play, loop, delay }: Motion & { sources: Source[] }) => {
  const { ease } = useKitMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hubRef = useRef<HTMLDivElement>(null);
  const { shown, extra } = cap(sources);
  const count = shown.length + (extra ? 1 : 0);
  const measure = (base: DOMRect) => {
    const hub = rel(base, hubRef.current);
    const chips = chipRefs.current.slice(0, count).map((el) => rel(base, el)).filter((b): b is Box => !!b);
    if (!hub || !chips.length) return null;
    const bus = (Math.max(...chips.map((c) => c.right)) + hub.left) / 2;
    const routes = chips.map((c) => `M${n1(c.right)} ${n1(c.cy)} H${n1(bus)} V${n1(hub.cy)} H${n1(hub.left)}`);
    return { routes, lines: routes.join(" ") };
  };
  return (
    <div ref={boxRef} className="relative flex w-full items-center justify-center px-[2cqw]">
      <Wires boxRef={boxRef} measure={measure} play={play} loop={loop} delay={delay} dur={2.8} />
      <div className="relative flex min-w-[clamp(6.5rem,32cqw,10rem)] max-w-[46cqw] shrink-0 flex-col gap-[clamp(0.375rem,2.4cqw,0.75rem)]">
        {shown.map((source, i) => {
          const Icon = (source.icon && ICONS[source.icon]) || Circle;
          return (
            <div
              key={`${source.label}-${i}`}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              className="h-[clamp(1.625rem,8cqw,2.25rem)] w-full"
            >
              <motion.div
                initial={false}
                animate={play ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                transition={{ duration: 0.45, ease, delay: delay + 0.1 + i * 0.06 }}
                className="flex h-full w-full items-center gap-2 rounded-lg border border-white/15 bg-black/30 px-[clamp(0.5rem,3cqw,0.75rem)] backdrop-blur-md"
              >
                <Icon aria-hidden="true" size={14} strokeWidth={1.75} className="shrink-0 text-white" />
                <p className="min-w-0 truncate whitespace-nowrap text-[length:var(--text-label)] text-white">{source.label}</p>
              </motion.div>
            </div>
          );
        })}
        {extra > 0 && (
          <div
            ref={(el) => {
              chipRefs.current[shown.length] = el;
            }}
            className="h-[clamp(1.625rem,8cqw,2.25rem)] w-full"
          >
            <motion.div
              initial={false}
              animate={play ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.45, ease, delay: delay + 0.1 + shown.length * 0.06 }}
              className="flex h-full w-full items-center rounded-lg border border-white/15 bg-black/30 px-[clamp(0.5rem,3cqw,0.75rem)] backdrop-blur-md"
            >
              <p className="whitespace-nowrap text-[length:var(--text-label)] text-white/70">+{extra} more</p>
            </motion.div>
          </div>
        )}
      </div>
      <div aria-hidden="true" className="w-[clamp(1.5rem,12cqw,6rem)] shrink-0" />
      <div ref={hubRef} className="relative shrink-0">
        <HubTile play={play} loop={loop} delay={delay + 0.2} className="w-[clamp(3.5rem,20cqw,7rem)]" />
      </div>
    </div>
  );
};

const FlowConnect = ({ sources, play, loop, delay }: Motion & { sources: Source[] }) => {
  const { ease } = useKitMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hubRef = useRef<HTMLDivElement>(null);
  const { shown, extra } = cap(sources);
  const count = shown.length + (extra ? 1 : 0);
  const measure = (base: DOMRect) => {
    const nodes = [...nodeRefs.current.slice(0, count), hubRef.current].map((el) => rel(base, el)).filter((b): b is Box => !!b);
    if (nodes.length < 2) return null;
    const segments = nodes.slice(1).map((next, i) => {
      const from = nodes[i];
      const y = from.cy;
      return { a: from.right + 4, b: next.left - 4, y };
    });
    const chain = segments.map(({ a, b, y }) => `M${n1(a)} ${n1(y)} H${n1(b)}`).join(" ");
    const heads = segments.map(({ b, y }) => `M${n1(b - 4)} ${n1(y - 3.5)} L${n1(b)} ${n1(y)} L${n1(b - 4)} ${n1(y + 3.5)}`).join(" ");
    return { routes: [chain, chain], lines: `${chain} ${heads}` };
  };
  return (
    <div ref={boxRef} className="relative flex w-full items-center justify-between gap-[2cqw] px-[1cqw] pb-[clamp(1.25rem,6cqw,1.75rem)]">
      <Wires boxRef={boxRef} measure={measure} play={play} loop={loop} delay={delay} dur={3.6} />
      {shown.map((source, i) => {
        const Icon = (source.icon && ICONS[source.icon]) || Circle;
        return (
          <div key={`${source.label}-${i}`} className="relative flex min-w-0 flex-1 justify-center">
            <div
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              className="relative"
            >
              <motion.div
                initial={false}
                animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.45, ease, delay: delay + 0.1 + i * 0.08 }}
                className="grid aspect-square w-[clamp(2rem,10cqw,2.75rem)] place-items-center rounded-lg border border-white/15 bg-black/30 text-white backdrop-blur-md"
              >
                <Icon aria-hidden="true" size={15} strokeWidth={1.75} />
              </motion.div>
              <motion.p
                initial={false}
                animate={{ opacity: play ? 1 : 0 }}
                transition={{ duration: 0.45, ease, delay: delay + 0.18 + i * 0.08 }}
                className="absolute left-1/2 top-full mt-1.5 w-max max-w-[17cqw] -translate-x-1/2 truncate whitespace-nowrap text-center text-[length:var(--text-label)] text-white/80"
              >
                {source.label}
              </motion.p>
            </div>
          </div>
        );
      })}
      {extra > 0 && (
        <div className="relative flex min-w-0 flex-1 justify-center">
          <div
            ref={(el) => {
              nodeRefs.current[shown.length] = el;
            }}
            className="relative"
          >
            <motion.div
              initial={false}
              animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease, delay: delay + 0.1 + shown.length * 0.08 }}
              className="grid aspect-square w-[clamp(2rem,10cqw,2.75rem)] place-items-center rounded-lg border border-white/15 bg-black/30 text-white backdrop-blur-md"
            >
              <p className="whitespace-nowrap text-[length:var(--text-label)] text-white/80">+{extra}</p>
            </motion.div>
          </div>
        </div>
      )}
      <div className="relative flex shrink-0 justify-center">
        <div ref={hubRef} className="relative">
          <HubTile play={play} loop={loop} delay={delay + 0.1 + count * 0.08} className="w-[clamp(2.75rem,14cqw,4rem)]" />
        </div>
      </div>
    </div>
  );
};

const StackConnect = ({ sources, title, play, loop, delay }: Motion & { sources: Source[]; title?: string }) => {
  const { ease } = useKitMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const { shown, extra } = cap(sources);
  const count = shown.length + (extra ? 1 : 0);
  const measure = (base: DOMRect) => {
    const list = rel(base, listRef.current);
    const chips = chipRefs.current.slice(0, count).map((el) => rel(base, el)).filter((b): b is Box => !!b);
    if (!list || !chips.length) return null;
    const mid = (Math.max(...chips.map((c) => c.bottom)) + list.top) / 2;
    const routes = chips.map((c) => `M${n1(c.cx)} ${n1(c.bottom)} V${n1(mid)} H${n1(list.cx)} V${n1(list.top)}`);
    return { routes, lines: routes.join(" ") };
  };
  return (
    <div ref={boxRef} className="relative flex w-full flex-col items-center px-[4cqw]">
      <Wires boxRef={boxRef} measure={measure} play={play} loop={loop} delay={delay} dur={2.6} />
      <div className="relative flex w-full justify-center gap-[clamp(0.5rem,4cqw,1rem)]">
        {Array.from({ length: count }).map((_, i) => {
          const source = shown[i];
          const Icon = source ? (source.icon && ICONS[source.icon]) || Circle : null;
          return (
            <div
              key={source ? `${source.label}-${i}` : "more"}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              className="aspect-square h-[clamp(1.5rem,8cqw,2rem)] shrink-0"
            >
              <motion.div
                initial={false}
                animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease, delay: delay + 0.1 + i * 0.06 }}
                className="grid h-full w-full place-items-center rounded-lg border border-white/15 bg-black/30 text-white backdrop-blur-md"
              >
                {Icon ? (
                  <Icon aria-hidden="true" size={13} strokeWidth={1.75} />
                ) : (
                  <p className="whitespace-nowrap text-[length:var(--text-label)] text-white/80">+{extra}</p>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
      <div aria-hidden="true" className="h-[clamp(0.75rem,5cqw,1.5rem)]" />
      <div ref={listRef} className="relative w-[min(100%,22rem)]">
        <motion.div
          initial={false}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease, delay: delay + 0.2 }}
          className="rounded-[var(--radius)] border border-white/15 bg-black/30 p-[clamp(0.5rem,2.5cqw,0.875rem)] text-white backdrop-blur-md"
        >
          {title && <p className="truncate px-1.5 pb-1.5 text-[length:var(--text-small)] font-medium">{title}</p>}
          {shown.map((source, i) => {
            const Icon = (source.icon && ICONS[source.icon]) || Circle;
            return (
              <div key={`${source.label}-${i}`} className="flex h-[clamp(1.25rem,6cqw,1.5rem)] items-center gap-2.5 px-1.5">
                <Icon aria-hidden="true" size={12} strokeWidth={1.75} className="shrink-0 text-white/80" />
                <p className="min-w-0 flex-1 truncate whitespace-nowrap text-[length:var(--text-label)] leading-tight">{source.label}</p>
                <Check aria-hidden="true" size={12} strokeWidth={2} className="shrink-0 text-white/70" />
              </div>
            );
          })}
          {extra > 0 && (
            <div className="flex h-[clamp(1.25rem,6cqw,1.5rem)] items-center px-1.5">
              <p className="whitespace-nowrap text-[length:var(--text-label)] leading-tight text-white/70">+{extra} more</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const ConnectUi = ({ ui, ...m }: Motion & { ui: ConnectSpec }) => {
  if (ui.variant === "flow") return <FlowConnect sources={ui.sources} {...m} />;
  if (ui.variant === "stack") return <StackConnect sources={ui.sources} title={ui.title} {...m} />;
  return <HubConnect sources={ui.sources} {...m} />;
};

const useRanking = (count: number, active: boolean) => {
  const [state, setState] = useState<{ order: number[]; ticks: number }>({ order: [], ticks: 0 });
  useEffect(() => {
    if (!active || count < 2) return;
    const id = window.setInterval(() => {
      setState((prev) => {
        const order = prev.order.length === count ? [...prev.order] : Array.from({ length: count }, (_, i) => i);
        const at = count - 2 - (prev.ticks % (count - 1));
        [order[at], order[at + 1]] = [order[at + 1], order[at]];
        return { order, ticks: prev.ticks + 1 };
      });
    }, 3100);
    return () => window.clearInterval(id);
  }, [active, count]);
  const order = state.order.length === count ? state.order : Array.from({ length: count }, (_, i) => i);
  const pos: number[] = [];
  order.forEach((row, p) => {
    pos[row] = p;
  });
  return { pos, moved: state.ticks > 0 };
};

const RankedUi = ({ ui, play, loop, delay }: Motion & { ui: RankedSpec }) => {
  const { ease } = useKitMotion();
  const { shown: rows, extra } = cap(ui.rows);
  const { pos, moved } = useRanking(rows.length, loop);
  const values = rows.map((row) => unit(row.value)).sort((a, b) => b - a);
  const variant = ui.variant ?? "list";
  const tiles = rows.length + (extra ? 1 : 0);
  const half = Math.ceil(tiles / 2);
  return (
    <motion.div
      initial={false}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.55, ease, delay }}
      className="w-[min(100%,26rem)] rounded-[var(--radius)] border border-white/15 bg-black/30 p-[clamp(0.5rem,2.5cqw,1rem)] text-white backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-3 px-2 pb-[clamp(0.375rem,2cqw,1rem)]">
        <p className="min-w-0 truncate text-[length:var(--text-small)] font-medium">{ui.title}</p>
        {ui.badge && <Badge text={ui.badge} />}
      </div>
      {variant === "list" && (
        <div className="relative">
          {rows.map((row, i) => (
            <motion.div
              key={`${row.label}-${i}`}
              initial={false}
              animate={{ opacity: play ? 1 : 0, transform: `translateY(${(pos[i] - i) * 100}%)` }}
              transition={{ duration: 0.6, ease: SWAP, opacity: { duration: 0.45, ease, delay: delay + 0.12 + i * 0.06 } }}
              className="relative flex h-[clamp(1.625rem,8cqw,2.25rem)] items-center gap-3 px-2"
            >
              <p className="w-3 shrink-0 text-[length:var(--text-label)] tabular-nums text-white/70">{pos[i] + 1}</p>
              <p className="min-w-0 flex-1 truncate whitespace-nowrap text-[length:var(--text-small)] leading-snug">{row.label}</p>
              <div className="h-1 w-[clamp(2.5rem,12cqw,4rem)] shrink-0 overflow-hidden rounded-full bg-white/20">
                <motion.div
                  className="h-full w-full origin-left rounded-full bg-white"
                  initial={false}
                  animate={{ transform: `scaleX(${play ? values[pos[i]] : 0})` }}
                  transition={{ duration: moved ? 0.6 : 0.8, ease: moved ? SWAP : ease, delay: moved ? 0 : delay + 0.25 + i * 0.06 }}
                />
              </div>
            </motion.div>
          ))}
          {extra > 0 && (
            <div className="flex h-[clamp(1.625rem,8cqw,2.25rem)] items-center px-2">
              <p className="whitespace-nowrap text-[length:var(--text-label)] text-white/70">+{extra} more</p>
            </div>
          )}
        </div>
      )}
      {variant === "bars" && (
        <div className="relative">
          {rows.map((row, i) => (
            <motion.div
              key={`${row.label}-${i}`}
              initial={false}
              animate={{ opacity: play ? 1 : 0, transform: `translateY(${(pos[i] - i) * 100}%)` }}
              transition={{ duration: 0.6, ease: SWAP, opacity: { duration: 0.45, ease, delay: delay + 0.12 + i * 0.06 } }}
              className="relative flex h-[clamp(2rem,9cqw,2.5rem)] flex-col justify-center gap-1 px-2"
            >
              <p className="min-w-0 truncate whitespace-nowrap text-[length:var(--text-small)] leading-snug">{row.label}</p>
              <div className="h-[clamp(0.375rem,1.6cqw,0.5rem)] w-full overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full w-full origin-left rounded-full bg-white"
                  initial={false}
                  animate={{ transform: `scaleX(${play ? values[pos[i]] : 0})` }}
                  transition={{ duration: moved ? 0.6 : 0.8, ease: moved ? SWAP : ease, delay: moved ? 0 : delay + 0.25 + i * 0.06 }}
                />
              </div>
            </motion.div>
          ))}
          {extra > 0 && (
            <div className="flex h-[clamp(1.5rem,6cqw,2rem)] items-center px-2">
              <p className="whitespace-nowrap text-[length:var(--text-label)] text-white/70">+{extra} more</p>
            </div>
          )}
        </div>
      )}
      {variant === "board" && (
        <div className="px-1 [--ch:clamp(2.25rem,12cqw,3rem)] [--g:clamp(0.375rem,2cqw,0.5rem)]">
          {ui.columns && ui.columns.length > 0 && (
            <div className="grid grid-cols-2 gap-[var(--g)] pb-[var(--g)]">
              {ui.columns.slice(0, 2).map((column, i) => (
                <p key={`${column}-${i}`} className="truncate px-1 text-[length:var(--text-label)] text-white/70">{column}</p>
              ))}
            </div>
          )}
          <div className="relative" style={{ height: `calc(${half} * var(--ch) + ${Math.max(0, half - 1)} * var(--g))` }}>
            {extra > 0 && (
              <div
                className="absolute left-0 top-0 flex h-[var(--ch)] w-[calc(50%-var(--g)/2)] items-center rounded-lg border border-white/10 bg-white/5 px-2.5 transition-opacity duration-[600ms]"
                style={{
                  transform: `translate(calc(${rows.length < half ? 0 : 1} * (100% + var(--g))), calc(${rows.length % half} * (100% + var(--g))))`,
                  opacity: play ? 1 : 0,
                  transitionDelay: !play ? "0s" : `${delay + 0.12 + rows.length * 0.06}s`,
                }}
              >
                <p className="whitespace-nowrap text-[length:var(--text-label)] text-white/70">+{extra} more</p>
              </div>
            )}
            {rows.map((row, i) => {
              const col = pos[i] < half ? 0 : 1;
              const line = pos[i] % half;
              return (
                <div
                  key={`${row.label}-${i}`}
                  className="absolute left-0 top-0 flex h-[var(--ch)] w-[calc(50%-var(--g)/2)] flex-col justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                  style={{
                    transform: `translate(calc(${col} * (100% + var(--g))), calc(${line} * (100% + var(--g))))`,
                    opacity: play ? 1 : 0,
                    transitionDelay: moved || !play ? "0s" : `${delay + 0.12 + i * 0.06}s`,
                  }}
                >
                  <p className="min-w-0 truncate text-[length:var(--text-label)]">{row.label}</p>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full w-full origin-left rounded-full bg-white transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                      style={{ transform: `scaleX(${play ? values[pos[i]] : 0})`, transitionDelay: moved || !play ? "0s" : `${delay + 0.25 + i * 0.06}s` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ApproveUi = ({ ui, play, loop, delay }: Motion & { ui: ApproveSpec }) => {
  const { ease } = useKitMotion();
  const lineCount = Math.min(4, Math.max(1, ui.lines ?? 3));
  const variant = ui.variant ?? "card";
  const { shown: tasks, extra } = cap(ui.tasks ?? []);
  const taskCount = tasks.length || lineCount;
  const tickAt = (i: number) => 0.1 + (i * 0.6) / taskCount;
  const progress = [0, ...Array.from({ length: taskCount }).flatMap((_, i) => [i / taskCount, (i + 1) / taskCount]), 1, 0, 0];
  const progressTimes = [0, ...Array.from({ length: taskCount }).flatMap((_, i) => [tickAt(i), tickAt(i) + 0.05]), 0.88, 0.94, 1];
  return (
    <motion.div
      initial={false}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.55, ease, delay }}
      className="w-[min(100%,26rem)] rounded-[var(--radius)] border border-white/15 bg-black/30 p-[clamp(0.625rem,3cqw,1.125rem)] text-white backdrop-blur-md"
    >
      <div className="flex items-center gap-2.5">
        <div className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white text-black">
          <DotCluster className="aspect-square w-3" />
        </div>
        <p className="min-w-0 flex-1 truncate text-[length:var(--text-small)] font-medium">{ui.title}</p>
        {ui.badge && <Badge text={ui.badge} />}
      </div>
      {variant === "card" && (
        <div className="mt-[clamp(0.625rem,3cqw,1rem)] flex flex-col gap-2">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="h-1.5 overflow-hidden rounded-full" style={{ width: SKELETON[i] }}>
              <motion.div
                className="h-full w-full origin-left rounded-full bg-white/30"
                initial={false}
                animate={
                  loop
                    ? { transform: ["scaleX(0)", "scaleX(0)", "scaleX(1)", "scaleX(1)", "scaleX(0)"] }
                    : { transform: play ? "scaleX(1)" : "scaleX(0)" }
                }
                transition={
                  loop
                    ? { duration: 6, repeat: Infinity, ease: SWAP, times: [0, 0.08 + i * 0.12, 0.3 + i * 0.12, 0.88, 1] }
                    : { duration: 0.7, ease, delay: delay + 0.2 + i * 0.08 }
                }
              />
            </div>
          ))}
        </div>
      )}
      {variant === "chat" && (
        <div className="mt-[clamp(0.375rem,2cqw,0.75rem)] flex flex-col gap-[clamp(0.375rem,1.8cqw,0.5rem)]">
          <motion.div
            initial={false}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease, delay: delay + 0.15 }}
            className="max-w-[85%] self-start rounded-lg rounded-bl-sm bg-white/10 px-3 py-1.5"
          >
            {ui.messages?.[0] ? (
              <p className="truncate text-[length:var(--text-small)] leading-snug">{ui.messages[0]}</p>
            ) : (
              <div className="h-1.5 w-[clamp(6rem,36cqw,10rem)] rounded-full bg-white/30" />
            )}
          </motion.div>
          <div className="relative max-w-[85%] self-end">
            <motion.div
              initial={false}
              animate={
                loop
                  ? { opacity: [0, 0, 1, 1, 0], transform: ["translateY(8px)", "translateY(8px)", "translateY(0px)", "translateY(0px)", "translateY(0px)"] }
                  : { opacity: play ? 1 : 0, transform: play ? "translateY(0px)" : "translateY(8px)" }
              }
              transition={
                loop
                  ? { duration: 6, repeat: Infinity, ease: SWAP, times: [0, 0.3, 0.38, 0.9, 1] }
                  : { duration: 0.45, ease, delay: delay + 0.25 }
              }
              className="rounded-lg rounded-br-sm bg-white px-3 py-1.5 text-black"
            >
              {ui.messages?.[1] ? (
                <p className="line-clamp-2 text-[length:var(--text-small)] leading-snug">{ui.messages[1]}</p>
              ) : (
                <div className="flex w-[clamp(8rem,40cqw,12rem)] flex-col gap-1.5 py-0.5">
                  {Array.from({ length: Math.min(3, lineCount) }).map((_, i) => (
                    <div key={i} className="h-1.5 rounded-full bg-black/25" style={{ width: SKELETON[i] }} />
                  ))}
                </div>
              )}
            </motion.div>
            {loop && (
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear", times: [0, 0.05, 0.27, 0.31, 1] }}
                className="absolute bottom-0 right-0 flex gap-1 rounded-lg rounded-br-sm bg-white/10 px-3 py-2.5"
              >
                {[0, 1, 2].map((dot) => (
                  <div key={dot} className="h-1.5 w-1.5 rounded-full bg-white/70" />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      )}
      {variant === "checklist" && (
        <div className="mt-[clamp(0.375rem,2cqw,0.75rem)]">
          <div className="h-1 overflow-hidden rounded-full bg-white/20">
            <motion.div
              className="h-full w-full origin-left rounded-full bg-white"
              initial={false}
              animate={loop ? { transform: progress.map((v) => `scaleX(${v})`) } : { transform: `scaleX(${play ? 1 : 0})` }}
              transition={loop ? { duration: 6, repeat: Infinity, ease: SWAP, times: progressTimes } : { duration: 0.8, ease, delay: delay + 0.2 }}
            />
          </div>
          <div className="mt-[clamp(0.375rem,1.5cqw,0.5rem)] flex flex-col">
            {Array.from({ length: taskCount }).map((_, i) => (
              <div key={i} className="flex h-[clamp(1.25rem,5.5cqw,1.5rem)] items-center gap-2.5">
                <div className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-white/30">
                  <motion.div
                    className="grid h-full w-full place-items-center rounded-full bg-white text-black"
                    initial={false}
                    animate={
                      loop
                        ? { transform: ["scale(0)", "scale(0)", "scale(1)", "scale(1)", "scale(0)", "scale(0)"] }
                        : { transform: play ? "scale(1)" : "scale(0)" }
                    }
                    transition={
                      loop
                        ? { duration: 6, repeat: Infinity, ease: SWAP, times: [0, tickAt(i), tickAt(i) + 0.05, 0.88, 0.94, 1] }
                        : { duration: 0.4, ease, delay: delay + 0.25 + i * 0.08 }
                    }
                  >
                    <Check aria-hidden="true" size={10} strokeWidth={3} />
                  </motion.div>
                </div>
                {tasks[i] ? (
                  <p className="min-w-0 flex-1 truncate whitespace-nowrap text-[length:var(--text-small)] leading-snug">{tasks[i]}</p>
                ) : (
                  <div className="h-1.5 rounded-full bg-white/30" style={{ width: SKELETON[i] }} />
                )}
              </div>
            ))}
            {extra > 0 && (
              <div className="flex h-[clamp(1.25rem,5.5cqw,1.5rem)] items-center pl-[1.625rem]">
                <p className="whitespace-nowrap text-[length:var(--text-label)] leading-snug text-white/70">+{extra} more</p>
              </div>
            )}
          </div>
        </div>
      )}
      <motion.div
        initial={false}
        animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.45, ease, delay: delay + 0.1 }}
        className="mt-[clamp(0.5rem,2.5cqw,1rem)] flex gap-2"
      >
        <div className="flex h-[clamp(2rem,10cqw,2.25rem)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-3 text-black">
          <Check aria-hidden="true" size={14} strokeWidth={2} className="shrink-0" />
          <p className="whitespace-nowrap text-[length:var(--text-small)] font-medium">{ui.primary}</p>
        </div>
        {ui.secondary && (
          <div className="flex h-[clamp(2rem,10cqw,2.25rem)] shrink-0 items-center whitespace-nowrap rounded-lg border border-white/20 bg-black/50 px-3.5">
            <p className="whitespace-nowrap text-[length:var(--text-small)] font-medium">{ui.secondary}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const StepCard = ({ step, index }: { step: Step; index: number }) => {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { ease } = useKitMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const visible = useInView(ref);
  const play = reduce || inView;
  const loop = !reduce && inView && visible;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const counter = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);
  const stagger = (index % 3) * 0.1;
  const uiDelay = stagger + 0.2;

  return (
    <li ref={ref} className="kit-card flex min-w-0 flex-col p-3 [container-type:inline-size]">
      <motion.div
        initial={false}
        animate={{ clipPath: play ? "inset(0% 0% 0% 0% round 14px)" : "inset(48% 0% 48% 0% round 14px)" }}
        transition={{ duration: reduce ? 0 : 0.7, ease, delay: stagger }}
        className="relative aspect-[4/3] overflow-hidden @[24rem]:aspect-[16/10.5] rounded-[var(--radius-image)] [container-type:inline-size]"
      >
        <motion.div style={reduce ? undefined : { y: drift }} className="absolute inset-x-0 -inset-y-[6%] will-change-transform">
          <FluidPanel seed={20 + index} imageSrc={step.imageSrc} imageAlt={step.imageAlt} className="h-full w-full" />
        </motion.div>
        <motion.div style={reduce ? undefined : { y: counter }} className="absolute inset-0 flex items-center justify-center p-[6cqw]">
          <div className="flex w-full justify-center">
            {step.ui.kind === "connect" && <ConnectUi ui={step.ui} play={play} loop={loop} delay={uiDelay} />}
            {step.ui.kind === "ranked" && <RankedUi ui={step.ui} play={play} loop={loop} delay={uiDelay} />}
            {step.ui.kind === "approve" && <ApproveUi ui={step.ui} play={play} loop={loop} delay={uiDelay} />}
          </div>
        </motion.div>
      </motion.div>
      <div className="flex flex-1 flex-col px-3 pb-4 pt-6">
        <p aria-hidden="true" className="text-[length:var(--text-small)] tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-4 text-balance text-[length:var(--text-h3)] font-medium tracking-[-0.02em] [overflow-wrap:anywhere]">{step.title}</h3>
        {step.description && (
          <p className="mt-3 text-balance text-[length:var(--text-body)] leading-[1.55] text-muted-foreground">{step.description}</p>
        )}
      </div>
    </li>
  );
};

export default function ProcessFluidSteps({
  tag = "How it works",
  title = "From scattered to sorted in three steps.",
  mutedTitle = "in three steps.",
  description = "Plugs into the tools your team already uses, learns what matters and turns it into a clear plan for the day.",
  primaryButton,
  items = DEFAULT_ITEMS,
  className,
}: ProcessFluidStepsProps) {
  const reduce = useReducedMotion();
  const { ease, base } = useKitMotion();
  const follow = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -8% 0px" },
    transition: { duration: base, ease, delay },
  });

  return (
    <section aria-label={title} className={cn("py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end lg:gap-12">
          <div className="min-w-0">
            {tag && (
              <motion.div {...follow(0)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-foreground/85">
                <Sparkle aria-hidden="true" size={12} fill="currentColor" />
                <p className="text-[length:var(--text-small)]">{tag}</p>
              </motion.div>
            )}
            <MutedAccentTitle text={title} muted={mutedTitle} as="h2" className="mt-5 max-w-[18ch] text-[length:var(--text-h1)] [overflow-wrap:anywhere]" />
          </div>
          {(description || primaryButton) && (
            <div className="min-w-0">
              {description && (
                <motion.p {...follow(0.12)} className="text-balance text-[length:var(--text-body-lg)] leading-[1.55] text-muted-foreground">
                  {description}
                </motion.p>
              )}
              {primaryButton && (
                <motion.div {...follow(0.18)} className="mt-6">
                  <a href={primaryButton.href} className="btn-primary">
                    {primaryButton.text}
                    <ArrowRight aria-hidden="true" size={14} />
                  </a>
                </motion.div>
              )}
            </div>
          )}
        </div>
        <ul className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-[var(--gap)] lg:grid-cols-2 xl:grid-cols-3">
          {items.map((step, i) => (
            <StepCard key={`${step.title}-${i}`} step={step} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
