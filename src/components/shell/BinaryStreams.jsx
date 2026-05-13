import { useMemo } from 'react'
import { SPRITE_COLS, SPRITE_ROWS } from './ServerRack'

const PARTICLE_COUNT = 25
const PARTICLE_OPACITY = 0.42
const SPEED_MUL = 1.0
const PANEL_W = 437
const PANEL_H = 448

function rackRect(pixelSize) {
  const w = SPRITE_COLS * pixelSize
  const h = SPRITE_ROWS * pixelSize
  return {
    w, h,
    left:  (PANEL_W - w) / 2,
    top:   (PANEL_H - h) / 2,
    right: (PANEL_W - w) / 2 + w,
    bot:   (PANEL_H - h) / 2 + h,
  }
}

function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeToken(rng) {
  const len = 1 + Math.floor(rng() * 5)
  let s = ''
  for (let i = 0; i < len; i++) s += rng() < 0.5 ? '0' : '1'
  return s
}

function buildParticles(n, pixelSize, seed = 7) {
  const rng = mulberry32(seed)
  const rect = rackRect(pixelSize)
  const SAFE = 8
  const out = []

  for (let i = 0; i < n; i++) {
    // Side distribution: 30% top, 30% bottom, 20% left, 20% right
    const sideRoll = rng()
    let side
    if      (sideRoll < 0.30) side = 0
    else if (sideRoll < 0.60) side = 1
    else if (sideRoll < 0.80) side = 2
    else                       side = 3

    // 62% flow inward toward rack, 38% flow outward away from rack
    const flowIn = rng() < 0.62
    const gap    = 20 + rng() * 80
    let sx, sy, ex, ey

    if (side === 0) {
      const x = rect.left + rng() * rect.w
      if (flowIn) {
        sx = x; sy = rect.top - gap; ex = x; ey = rect.top - 2
      } else {
        const dist = 45 + rng() * 75
        sx = x; sy = rect.top - 2; ex = x; ey = Math.max(SAFE, rect.top - dist)
      }
    } else if (side === 1) {
      const x = rect.left + rng() * rect.w
      if (flowIn) {
        sx = x; sy = rect.bot + gap; ex = x; ey = rect.bot + 2
      } else {
        const dist = 45 + rng() * 75
        sx = x; sy = rect.bot + 2; ex = x; ey = Math.min(PANEL_H - SAFE, rect.bot + dist)
      }
    } else if (side === 2) {
      const y = rect.top + rng() * rect.h
      if (flowIn) {
        sx = rect.left - gap; sy = y; ex = rect.left + 2; ey = y
      } else {
        const dist = 45 + rng() * 35
        sx = rect.left - 2; sy = y; ex = Math.max(SAFE, rect.left - dist); ey = y
      }
    } else {
      const y = rect.top + rng() * rect.h
      if (flowIn) {
        sx = rect.right + gap; sy = y; ex = rect.right - 2; ey = y
      } else {
        const dist = 45 + rng() * 35
        sx = rect.right + 2; sy = y; ex = Math.min(PANEL_W - SAFE, rect.right + dist); ey = y
      }
    }

    out.push({
      id: i,
      token: makeToken(rng),
      sx, sy, ex, ey,
      durBase: 3.4 + rng() * 4.2,
      delayR: rng(),
      fsR: rng(),
    })
  }
  return out
}

export function BinaryStreams({ pixelSize = 8 }) {
  const particles = useMemo(() => buildParticles(PARTICLE_COUNT, pixelSize, Math.random() * 0xffffffff), [pixelSize])

  return (
    <div className="binary-field">
      {particles.map(p => {
        const dur = p.durBase / SPEED_MUL
        const delay = -p.delayR * dur
        const fs = 17 + Math.floor(p.fsR * 7)

        return (
          <span
            key={p.id}
            className="binary-particle"
            style={{
              '--sx': `${p.sx.toFixed(1)}px`,
              '--sy': `${p.sy.toFixed(1)}px`,
              '--ex': `${p.ex.toFixed(1)}px`,
              '--ey': `${p.ey.toFixed(1)}px`,
              '--maxOp': PARTICLE_OPACITY,
              animationDuration: `${dur.toFixed(3)}s`,
              animationDelay: `${delay.toFixed(3)}s`,
              fontSize: `${fs}px`,
            }}
          >
            {p.token}
          </span>
        )
      })}
    </div>
  )
}
