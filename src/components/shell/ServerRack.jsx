import { useMemo } from 'react'

function makeStorageRowExact(bayCells) {
  let inner = ''
  for (let i = 0; i < 12; i++) inner += bayCells
  return '##' + inner + '##'
}
function makeStorageEdgeRow() {
  return '##' + 'B'.repeat(36) + '##'
}

const SPRITE = [
  'oRRRRRRRoRRRRRRRRRRRRRRRRRRRRRRoRRRRRRRo',
  '########################################',
  '##::::::P:::::::::::::::::::::::::::::##',
  '##::QqQqQqQqQqQqQqQqQqQqQqQqQqQqQqQq::##',
  '##::,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,::##',
  '##::qQqQqQqQqQqQqQqQqQqQqQqQqQqQqQqQ::##',
  '##::,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,::##',
  '##::::::::::::::::::::::::::::::::::::##',
  '########################################',
  '##::::::::::::::::::::::::::::::::::::##',
  '##vVvVvVvVvVvVLLLLLLLLLLLLvVvVvVvVvVvV##',
  '##vVvVvVvVvVvVLLPLLNLLDLLLvVvVvVvVvVvV##',
  '##vVvVvVvVvVvVLLLLLLLLLLLLvVvVvVvVvVvV##',
  '##vVvVvVvVvVvVL,,,,,,,,,,LvVvVvVvVvVvV##',
  '##::::::::::::::::::::::::::::::::::::##',
  '########################################',
  makeStorageEdgeRow(),
  makeStorageRowExact('Bhb'),
  makeStorageRowExact('BbM'),
  makeStorageEdgeRow(),
  makeStorageRowExact('Bhb'),
  makeStorageRowExact('BbM'),
  '########################################',
  'oRRRRRRRoRRRRRRRRRRRRRRRRRRRRRRoRRRRRRRo',
]

const COLS = 40

export function ServerRack({ pixelSize = 8 }) {
  const cells = useMemo(() => {
    const out = []
    for (let y = 0; y < SPRITE.length; y++) {
      const row = SPRITE[y]
      for (let x = 0; x < COLS; x++) {
        out.push({ k: y * COLS + x, c: row[x] })
      }
    }
    return out
  }, [])

  return (
    <div
      className="rack-pixels"
      style={{ '--px': `${pixelSize}px` }}
      role="img"
      aria-label="3U server rack pixel-art"
    >
      {cells.map(({ k, c }) => (
        <div key={k} data-c={c} />
      ))}
    </div>
  )
}

export const SPRITE_COLS = COLS
export const SPRITE_ROWS = SPRITE.length
