import {
  Atom,
  TrendingUp,
  Map,
  Layers,
  Zap,
  Palette,
  Anchor,
  Compass,
  Rocket,
  HelpCircle,
  Wrench,
  Package,
  ClipboardList,
  Sparkles,
  Waves,
  Ruler,
  Square,
  Target,
  Globe,
  AlertCircle,
  Frown,
  Triangle,
  Disc,
  Eye,
  Scale,
  PartyPopper,
  Braces,
  Link,
  Ban,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Recycle,
  Eraser,
  FlaskConical,
  Puzzle,
  Plug,
  RefreshCw,
  CircleDot,
  Radio,
  Timer,
  Volume2,
  Bell,
  Siren,
  Search,
  CheckSquare,
  Hash,
  FileText,
  Smartphone,
  Upload,
  Mail,
  Lock,
  Calendar,
  Tag,
  Mouse,
  Keyboard,
  ArrowRight,
  Brain,
  Calculator,
  BookOpen,
  Star,
  Accessibility,
  Gamepad2,
  GitBranch,
  Code,
  TreeDeciduous,
  CircleArrowUp,
  LayoutTemplate,
  Clock,
  SlidersHorizontal,
  Settings,
  Award,
  User,
} from "lucide-react";

// Map icon names to Lucide components
const iconMap = {
  // React & Tech
  atom: Atom,
  react: Atom,
  code: Code,
  braces: Braces,

  // Navigation & Direction
  compass: Compass,
  map: Map,
  target: Target,
  crosshair: Target,
  rocket: Rocket,
  "arrow-right": ArrowRight,
  "git-branch": GitBranch,

  // UI & Layout
  layers: Layers,
  blocks: Layers,
  package: Package,
  box: Package,
  puzzle: Puzzle,
  template: LayoutTemplate,
  square: Square,

  // Actions & Effects
  zap: Zap,
  lightning: Zap,
  sparkles: Sparkles,
  "party-popper": PartyPopper,
  refresh: RefreshCw,
  recycle: Recycle,

  // Design & Styling
  palette: Palette,
  paintbrush: Palette,
  waves: Waves,
  ruler: Ruler,

  // Data & State
  clipboard: ClipboardList,
  "clipboard-list": ClipboardList,
  scale: Scale,
  calculator: Calculator,
  hash: Hash,
  sliders: SlidersHorizontal,

  // Hooks
  anchor: Anchor,
  hook: Anchor,
  plug: Plug,

  // Help & Info
  "help-circle": HelpCircle,
  question: HelpCircle,
  lightbulb: Lightbulb,
  brain: Brain,

  // Alerts & Status
  "alert-circle": AlertCircle,
  "alert-triangle": AlertTriangle,
  warning: AlertTriangle,
  siren: Siren,
  ban: Ban,
  stop: Ban,
  "check-circle": CheckCircle,
  check: CheckCircle,
  "check-square": CheckSquare,

  // Communication
  globe: Globe,
  world: Globe,
  radio: Radio,
  bell: Bell,
  mail: Mail,
  link: Link,

  // Files & Documents
  "file-text": FileText,
  file: FileText,
  "book-open": BookOpen,
  book: BookOpen,

  // Tools
  wrench: Wrench,
  settings: Settings,
  eraser: Eraser,
  flask: FlaskConical,
  "test-tube": FlaskConical,
  search: Search,

  // Devices & Input
  smartphone: Smartphone,
  phone: Smartphone,
  mouse: Mouse,
  keyboard: Keyboard,
  gamepad: Gamepad2,

  // Time & Scheduling
  timer: Timer,
  clock: Clock,
  calendar: Calendar,

  // Security
  lock: Lock,
  key: Lock,

  // Misc
  eye: Eye,
  "volume-2": Volume2,
  ear: Volume2,
  upload: Upload,
  tag: Tag,
  star: Star,
  award: Award,
  accessibility: Accessibility,
  tree: TreeDeciduous,
  frown: Frown,
  triangle: Triangle,
  disc: Disc,
  "circle-dot": CircleDot,
  "circle-up": CircleArrowUp,
  "trending-up": TrendingUp,
  user: User,
};

export function SlideIcon({ name, size = 48, className = "" }) {
  const IconComponent = iconMap[name?.toLowerCase()];

  if (!IconComponent) {
    // Fallback: render the name as text if no icon found
    return <span className={className}>{name}</span>;
  }

  return <IconComponent size={size} className={className} />;
}

// Export the icon map for reference
export const availableIcons = Object.keys(iconMap);
