import { useId } from "react";
import type { CSSProperties } from "react";

export const COCKTAIL_COLORS = {
  amber:    "#c47a18", // 琥珀金　　威士忌、波本
  tawny:    "#a05c14", // 棕褐　　　黑蘭姆
  pale:     "#c8e8ef", // 淡藍清　　琴酒、通寧水
  crystal:  "#ddf4f8", // 近透明　　伏特加、清澈基酒
  ruby:     "#b8103a", // 深紅　　　尼格羅尼、金巴利
  coral:    "#f0a060", // 粉橙　　　葡萄柚、帕洛瑪
  orange:   "#f07820", // 橙紅　　　奧佩羅、Spritz
  crimson:  "#c40b1e", // 鮮紅　　　金巴利
  golden:   "#e8c84a", // 黃金　　　啤酒、香檳
  espresso: "#2a0e00", // 極深棕　　可樂系
  lime:     "#3db82a", // 草綠　　　蜜多麗、黃瓜
  cobalt:   "#1a6fa0", // 藍色　　　藍柑橘
  cream:    "#f0e0c0", // 奶白　　　貝禮詩、奶油系
} as const;

export type CocktailColorKey = keyof typeof COCKTAIL_COLORS;

type GlassType =
  | "rocks"
  | "coupe"
  | "highball"
  | "collins"
  | "martini"
  | "nick_nora"
  | "hurricane";

const GLASS_ALIASES: Record<string, GlassType> = {
  "lowball": "rocks",
  "old_fashioned": "rocks",
  "old fashioned": "rocks",
};

function normalizeGlass(glass: string): GlassType | null {
  const key = glass.toLowerCase();
  if (GLASS_ALIASES[key]) return GLASS_ALIASES[key];
  const known: GlassType[] = [
    "rocks",
    "coupe",
    "highball",
    "collins",
    "martini",
    "nick_nora",
    "hurricane",
  ];
  return known.includes(key as GlassType) ? (key as GlassType) : null;
}

interface Props {
  glass: string;
  liquidColor?: string;
  liquidOpacity?: number;
  className?: string;
  style?: CSSProperties;
}

const S = "#ccc";
const SW = 2;

export default function GlassWithLiquid({
  glass,
  liquidColor,
  liquidOpacity = 0.72,
  className,
  style,
}: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clip = `gc-${uid}`;
  const color =
    liquidColor && liquidColor in COCKTAIL_COLORS
      ? COCKTAIL_COLORS[liquidColor as CocktailColorKey]
      : (liquidColor ?? COCKTAIL_COLORS.amber);
  const glassType = normalizeGlass(glass);
  if (!glassType) return null;

  function Liquid({
    yStart,
    bubbles,
  }: {
    yStart: number;
    bubbles?: { cx: number; cy: number; r: number }[];
  }) {
    return (
      <g clipPath={`url(#${clip})`} opacity={liquidOpacity}>
        <rect x="0" y={yStart} width="120" height="200" fill={color} />
        {/* 液面反光 */}
        <rect
          x="0"
          y={yStart}
          width="120"
          height="5"
          fill="rgba(255,255,255,0.15)"
        />
        {bubbles?.map((b, i) => (
          <circle
            key={i}
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            fill="rgba(255,255,255,0.5)"
          />
        ))}
      </g>
    );
  }

  if (glassType === "rocks") {
    // 杯子 y: 40→120，半滿 y=80
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 160"
        fill="none"
        className={className}
        style={style}
      >
        <defs>
          <clipPath id={clip}>
            <path d="M25 40 L95 40 L92 120 L28 120 Z" />
          </clipPath>
        </defs>
        <Liquid yStart={80} />
        <path
          d="M25 40 L95 40 L92 120 L28 120 Z"
          fill="rgba(170,170,170,0.08)"
        />
        <path
          d="M25 40 L95 40 L92 120 L28 120 Z"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <rect
          x="37.5"
          y="68.5"
          width="45"
          height="45"
          rx="3"
          stroke={S}
          strokeWidth={SW}
          fill="none"
        />
      </svg>
    );
  }

  if (glassType === "coupe") {
    // 碗底 bezier 最低點 t=0.5 → y≈67.5，八分滿 y≈46
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 20 120 150"
        fill="none"
        className={className}
        style={style}
      >
        <defs>
          <clipPath id={clip}>
            <path d="M20 40 Q60 95 100 40 Z" />
          </clipPath>
        </defs>
        <Liquid yStart={46} />
        <path d="M20 40 Q60 95 100 40 Z" fill="rgba(170,170,170,0.08)" />
        <line
          x1="20"
          y1="40"
          x2="100"
          y2="40"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
        />
        <path
          d="M20 40 Q60 95 100 40"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="60"
          y1="70"
          x2="60"
          y2="140"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
        />
        <ellipse
          cx="60"
          cy="144"
          rx="22"
          ry="4"
          stroke={S}
          strokeWidth={SW}
          fill="none"
        />
      </svg>
    );
  }

  if (glassType === "highball") {
    // 杯子 y: 45→145，八分滿 y=65
    const bubbles = [
      { cx: 52, cy: 90, r: 1.5 },
      { cx: 70, cy: 108, r: 2 },
      { cx: 46, cy: 122, r: 1.5 },
      { cx: 64, cy: 75, r: 1.5 },
      { cx: 57, cy: 135, r: 2 },
    ];
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 20 120 150"
        fill="none"
        className={className}
        style={style}
      >
        <defs>
          <clipPath id={clip}>
            <path d="M32.5 45 L87.5 45 L80 145 L40 145 Z" />
          </clipPath>
        </defs>
        <Liquid yStart={65} bubbles={bubbles} />
        <path
          d="M32.5 45 L87.5 45 L80 145 L40 145 Z"
          fill="rgba(170,170,170,0.08)"
        />
        <path
          d="M32.5 45 L87.5 45 L80 145 L40 145 Z"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  if (glassType === "collins") {
    // 杯子 y: 26→148，八分滿 y≈51
    const bubbles = [
      { cx: 54, cy: 70, r: 1.5 },
      { cx: 66, cy: 90, r: 2 },
      { cx: 48, cy: 110, r: 1.5 },
      { cx: 62, cy: 126, r: 2 },
      { cx: 55, cy: 140, r: 1.5 },
    ];
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 10 120 160"
        fill="none"
        className={className}
        style={style}
      >
        <defs>
          <clipPath id={clip}>
            <path d="M38 26 L82 26 L80 148 L40 148 Z" />
          </clipPath>
        </defs>
        <Liquid yStart={51} bubbles={bubbles} />
        <path
          d="M38 26 L82 26 L80 148 L40 148 Z"
          fill="rgba(170,170,170,0.08)"
        />
        <path
          d="M38 26 L82 26 L80 148 L40 148 Z"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  if (glassType === "martini") {
    // 三角形 y: 28(寬口)→78(尖底)，八分滿 y≈38
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 10 120 144"
        fill="none"
        className={className}
        style={style}
      >
        <defs>
          <clipPath id={clip}>
            <path d="M30 28 L60 78 L90 28 Z" />
          </clipPath>
        </defs>
        <Liquid yStart={38} />
        <path d="M30 28 L60 78 L90 28 Z" fill="rgba(170,170,170,0.08)" />
        <path
          d="M30 28 L60 78 L90 28 Z"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="60"
          y1="78"
          x2="60"
          y2="136"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
        />
        <ellipse
          cx="60"
          cy="140"
          rx="22"
          ry="4"
          stroke={S}
          strokeWidth={SW}
          fill="none"
        />
      </svg>
    );
  }

  if (glassType === "nick_nora") {
    // 碗 y: 45→96，八分滿 y≈55
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 20 120 160"
        fill="none"
        className={className}
        style={style}
      >
        <defs>
          <clipPath id={clip}>
            <path d="M32 45 Q32 88 60 96 Q88 88 88 45 Z" />
          </clipPath>
        </defs>
        <Liquid yStart={55} />
        <path
          d="M32 45 Q32 88 60 96 Q88 88 88 45 Z"
          fill="rgba(170,170,170,0.08)"
        />
        <path
          d="M32 45 Q32 88 60 96 Q88 88 88 45 Z"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="60"
          y1="96"
          x2="60"
          y2="150"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
        />
        <ellipse
          cx="60"
          cy="154"
          rx="20"
          ry="4"
          stroke={S}
          strokeWidth={SW}
          fill="none"
        />
      </svg>
    );
  }

  if (glassType === "hurricane") {
    // 杯身 y: 25→107，八分滿 y≈42
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 160"
        fill="none"
        className={className}
        style={style}
      >
        <defs>
          <clipPath id={clip}>
            <path d="M33 25 C29 31 36 48 36 55 L36 100 Q36 107 42 107 L78 107 Q84 107 84 100 L84 55 C84 48 91 31 87 25 Z" />
          </clipPath>
        </defs>
        <Liquid yStart={42} />
        <path
          d="M33 25 C29 31 36 48 36 55 L36 100 Q36 107 42 107 L78 107 Q84 107 84 100 L84 55 C84 48 91 31 87 25 Z"
          fill="rgba(170,170,170,0.08)"
        />
        <path
          d="M33 25 C29 31 36 48 36 55 L36 100 Q36 107 42 107 L78 107 Q84 107 84 100 L84 55 C84 48 91 31 87 25 Z"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M42 107 L56 107 L54 130"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M78 107 L64 107 L66 130"
          stroke={S}
          strokeWidth={SW}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <ellipse
          cx="60"
          cy="134"
          rx="26"
          ry="4"
          stroke={S}
          strokeWidth={SW}
          fill="none"
        />
      </svg>
    );
  }

  return null;
}
