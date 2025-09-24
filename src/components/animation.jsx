import { motion } from "framer-motion"

export default function Animation({
  className,
  loop = false,
  size = 900,
  speed = 1,
  showLabel = true,
  label = "ELEVATE",
}) {
  // Timeline timings (in seconds) - outline first, then fill a bit later
  const mult = 1 / speed
  const tDraw = 2.0 * mult // outline draw time
  const gap = 0.3 * mult
  const tSeed = 1.5 * mult
  const tSweep = 2.5 * mult
  const tFill = tSeed + tSweep
  const tStar = 2.0 * mult
  const tText = 0.8 * mult
  const total = tDraw + gap + tFill + gap + tStar + gap + tText
  const repeatTransition = loop ? { 
    repeat: Number.POSITIVE_INFINITY, 
    repeatDelay: 0.3 * mult 
  } : {}
  const vb = 320
  
  // Improved easing curves for natural motion
  const easeInOut = [0.25, 0.46, 0.45, 0.94]
  const easeOut = [0.16, 1, 0.3, 1]
  const easeIn = [0.7, 0, 0.84, 0]

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
      }}
      aria-label="Elevate logo animation"
      role="img"
    >
      <svg
        viewBox={`0 0 ${vb} ${vb}`}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
        textRendering="optimizeLegibility"
      >
        {/* Enhanced defs with improved gradients */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 1 1 0 0  1 1 1 0 0  1 1 1 0 0  0 0 0 0.3 0"
              result="glowBlur"
            />
            <feMerge>
              <feMergeNode in="glowBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="edgeStroke" x1="56" y1="160" x2="264" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.2" />
          </linearGradient>

          <radialGradient id="starGlow" cx="160" cy="96" r="50" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="0.7" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <clipPath id="clipWedge">
            <path d="M 56 160 L 264 160 Q 160 160 160 300 Q 160 160 56 160 Z" />
          </clipPath>

          <linearGradient id="fillGradient" x1="160" y1="160" x2="160" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width={vb} height={vb} fill="#000000" />

        <g transform="translate(0, 0)">
          {/* 1) Outline: draw top line and arcs to mark boundaries */}
          <motion.path
            d="M 56 160 L 264 160"
            stroke="url(#edgeStroke)"
            strokeWidth={1.8}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{
              delay: 0,
              duration: tDraw * 0.45,
              ease: easeOut,
              ...repeatTransition,
            }}
          />
          <motion.path
            d="M 56 160 Q 160 160 160 300"
            stroke="url(#edgeStroke)"
            strokeWidth={1.8}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, pathOffset: 0.5, opacity: 0 }}
            animate={{ pathLength: 1, pathOffset: 0, opacity: 0.9 }}
            transition={{ 
              delay: tDraw * 0.15,
              duration: tDraw * 0.6,
              ease: easeInOut, 
              ...repeatTransition 
            }}
          />
          
          <motion.path
            d="M 264 160 Q 160 160 160 300"
            stroke="url(#edgeStroke)"
            strokeWidth={1.8}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, pathOffset: 0.5, opacity: 0 }}
            animate={{ pathLength: 1, pathOffset: 0, opacity: 0.9 }}
            transition={{ 
              delay: tDraw * 0.25,
              duration: tDraw * 0.6,
              ease: easeInOut, 
              ...repeatTransition 
            }}
          />

          {/* Progressive fill mask starts a bit later so boundaries are visible */}
          <mask id="revealMask" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={vb} height={vb} fill="black" />
            
            {/* Start with small seed at bottom left */}
            <motion.circle
              cx={80}
              cy={200}
              r={0}
              fill="white"
              initial={{ r: 0, opacity: 1 }}
              animate={{ r: 25, opacity: 1 }}
              transition={{
                delay: tDraw + gap,
                duration: tSeed * 0.4,
                ease: easeOut,
                ...repeatTransition,
              }}
            />
            
            {/* Expand from bottom point */}
            <motion.circle
              cx={160}
              cy={300}
              r={0}
              fill="white"
              initial={{ r: 0, opacity: 1 }}
              animate={{ r: 35, opacity: 1 }}
              transition={{
                delay: tDraw + gap + tSeed * 0.2,
                duration: tSeed * 0.6,
                ease: easeOut,
                ...repeatTransition,
              }}
            />
            
            {/* Progressive horizontal expansion from left */}
            <motion.ellipse
              cx={120}
              cy={180}
              rx={0}
              ry={40}
              fill="white"
              initial={{ rx: 0, opacity: 1 }}
              animate={{ rx: 60, opacity: 1 }}
              transition={{
                delay: tDraw + gap + tSeed * 0.5,
                duration: tSweep * 0.4,
                ease: easeInOut,
                ...repeatTransition,
              }}
            />
            
            {/* Continue expansion to center */}
            <motion.ellipse
              cx={160}
              cy={200}
              rx={0}
              ry={80}
              fill="white"
              initial={{ rx: 0, opacity: 1 }}
              animate={{ rx: 80, opacity: 1 }}
              transition={{
                delay: tDraw + gap + tSeed * 0.7,
                duration: tSweep * 0.5,
                ease: easeInOut,
                ...repeatTransition,
              }}
            />
            
            {/* Final expansion to fill entire shape */}
            <motion.ellipse
              cx={160}
              cy={220}
              rx={0}
              ry={120}
              fill="white"
              initial={{ rx: 0, opacity: 1 }}
              animate={{ rx: 120, opacity: 1 }}
              transition={{
                delay: tDraw + gap + tSeed + tSweep * 0.3,
                duration: tSweep * 0.7,
                ease: easeInOut,
                ...repeatTransition,
              }}
            />

            {/* Diagonal sweep to create a crisp wedge edge (left → right) */}
            <motion.rect
              x={-240}
              y={70}
              width={320}
              height={260}
              rx={6}
              fill="white"
              transform="rotate(18 160 200)"
              initial={{ x: -240, opacity: 1 }}
              animate={{ x: 260, opacity: 1 }}
              transition={{
                delay: tDraw + gap + tSeed * 0.85,
                duration: tSweep * 0.9,
                ease: easeInOut,
                ...repeatTransition,
              }}
            />
          </mask>

          {/* Filled wedge with gradient */}
          <motion.path
            d="M 56 160 L 264 160 Q 160 160 160 300 Q 160 160 56 160 Z"
            fill="url(#fillGradient)"
            filter="url(#glow)"
            mask="url(#revealMask)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: tDraw + gap + tSeed * 0.3,
              duration: 0.1,
              ...repeatTransition,
            }}
          />

          {/* Smoother midline fade (white thin guide) during fill */}
          <motion.path
            d="M 56 160 L 264 160"
            stroke="#FFFFFF"
            strokeWidth={1.5}
            strokeLinecap="round"
            fill="none"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0 }}
            transition={{
              delay: tDraw + gap,
              duration: tSweep,
              ease: easeInOut,
              ...repeatTransition,
            }}
          />

          {/* Enhanced shine effect */}
          <motion.rect
            x={-200}
            y={70}
            width={160}
            height={280}
            fill="#FFFFFF"
            opacity={0.2}
            transform="rotate(18 160 200)"
            clipPath="url(#clipWedge)"
            filter="url(#glow)"
            initial={{ x: -220, opacity: 0 }}
            animate={{ x: 280, opacity: [0, 0.3, 0] }}
            transition={{
              delay: tDraw + gap + tSeed + tSweep * 0.2,
              duration: tSweep * 0.8,
              ease: easeInOut,
              ...repeatTransition,
            }}
          />

          {/* 3) Star after fill finishes */}
          <motion.g
            style={{ transformOrigin: "160px 96px" }}
            initial={{ 
              x: -140, 
              y: 20,
              rotate: -45, 
              scale: 0.3, 
              opacity: 0 
            }}
            animate={{ 
              x: 0, 
              y: 0,
              rotate: 0, 
              scale: 1, 
              opacity: 1 
            }}
            transition={{
              delay: tDraw + gap + tFill + gap * 0.4,
              duration: tStar,
              ease: easeInOut,
              ...repeatTransition,
            }}
          >
            {/* Enhanced glow behind star */}
            <circle 
              cx="160" 
              cy="96" 
              r="45" 
              fill="url(#starGlow)" 
              filter="url(#glow)" 
            />
            
            {/* Improved star shape */}
            <path
              d="M 160 52
                 Q 146 78 120 96
                 Q 146 114 160 140
                 Q 174 114 200 96
                 Q 174 78 160 52 Z"
              fill="#FFFFFF"
              filter="url(#glow)"
            />
          </motion.g>

          {/* 4) Text at the end */}
          {showLabel && (
            <motion.text
              x="160"
              y="314"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="26"
              fontWeight="300"
              style={{ 
                letterSpacing: "8px",
                fontFamily: "system-ui, -apple-system, sans-serif"
              }}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: tDraw + gap + tFill + tStar + gap,
                duration: tText,
                ease: easeOut,
                ...repeatTransition,
              }}
            >
              {label}
            </motion.text>
          )}
        </g>
      </svg>
    </div>
  )
}