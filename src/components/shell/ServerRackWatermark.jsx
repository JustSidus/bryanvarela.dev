import { useMemo } from 'react'

const STREAM_COUNT = 22

function buildStreams() {
  const streams = []
  for (let i = 0; i < STREAM_COUNT; i++) {
    const len = 2 + Math.floor(Math.random() * 4)
    let text = ''
    for (let j = 0; j < len; j++) text += Math.random() < 0.5 ? '0' : '1'
    streams.push({
      text,
      left: Math.random() * 100,
      delay: -(Math.random() * 7),
      duration: 3.2 + Math.random() * 4,
    })
  }
  return streams
}

function DriveBays({ baseY }) {
  const cells = []
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 8; col++) {
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={4 + col * 14}
          y={baseY + 4 + row * 14}
          width="12"
          height="12"
          className="drive-bay"
        />
      )
    }
  }
  return <g>{cells}</g>
}

export function ServerRackWatermark() {
  const streams = useMemo(buildStreams, [])

  return (
    <div className="server-rack-wm" aria-hidden="true">
      <div className="rack-rain">
        {streams.map((s, i) => (
          <span
            key={i}
            className="rain-bit"
            style={{
              left: `${s.left}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          >
            {s.text}
          </span>
        ))}
      </div>

      <svg
        className="rack-svg"
        viewBox="0 0 120 90"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1U management server */}
        <rect x="0" y="0" width="120" height="22" className="rack-chassis" />
        {/* vent slits */}
        <rect x="4"  y="4" width="1" height="14" className="rack-vent" />
        <rect x="7"  y="4" width="1" height="14" className="rack-vent" />
        <rect x="10" y="4" width="1" height="14" className="rack-vent" />
        <rect x="13" y="4" width="1" height="14" className="rack-vent" />
        {/* badge / branding strip */}
        <rect x="22" y="9" width="38" height="4" className="rack-badge" />
        {/* status LEDs */}
        <rect className="led led-power"   x="100" y="10" width="3" height="3" />
        <rect className="led led-network" x="106" y="10" width="3" height="3" />
        <rect className="led led-disk"    x="112" y="10" width="3" height="3" />

        {/* 2U storage unit A */}
        <rect x="0" y="26" width="120" height="30" className="rack-chassis" />
        <DriveBays baseY={26} />

        {/* 2U storage unit B */}
        <rect x="0" y="60" width="120" height="30" className="rack-chassis" />
        <DriveBays baseY={60} />
      </svg>
    </div>
  )
}
