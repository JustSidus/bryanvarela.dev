#!/usr/bin/env node
/**
 * optimize-images.mjs
 *
 * Converts PNG/JPEG images from src/assets/images-raw/ to optimized
 * WebP files in public/images/. Keeps originals untouched.
 *
 * Usage:
 *   node scripts/optimize-images.mjs
 *
 * The script is automatically invoked before `vite build`.
 */
import { promises as fs } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC_DIR = join(ROOT, 'src/assets/images-raw')
const OUT_DIR = join(ROOT, 'public/images')

const SUPPORTED = new Set(['.png', '.jpg', '.jpeg'])

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch (e) {
    if (e.code !== 'EEXIST') throw e
  }
}

async function walk(dir) {
  const entries = []
  async function recurse(current) {
    let items
    try {
      items = await fs.readdir(current, { withFileTypes: true })
    } catch (err) {
      if (err.code === 'ENOENT') return
      throw err
    }
    for (const item of items) {
      const full = join(current, item.name)
      if (item.isDirectory()) {
        await recurse(full)
      } else if (SUPPORTED.has(item.name.slice(item.name.lastIndexOf('.')).toLowerCase())) {
        entries.push(full)
      }
    }
  }
  await recurse(dir)
  return entries
}

async function needsRebuild(srcPath, outPath) {
  try {
    const [srcStat, outStat] = await Promise.all([
      fs.stat(srcPath),
      fs.stat(outPath),
    ])
    return srcStat.mtimeMs > outStat.mtimeMs
  } catch {
    return true
  }
}

async function main() {
  const files = await walk(SRC_DIR)

  if (files.length === 0) {
    console.log('🖼️  No images to optimize.')
    return
  }

  let converted = 0
  let skipped = 0

  for (const srcPath of files) {
    const rel = relative(SRC_DIR, srcPath)
    const name = rel.slice(0, rel.lastIndexOf('.')) + '.webp'
    const outPath = join(OUT_DIR, name)

    await ensureDir(dirname(outPath))

    if (await needsRebuild(srcPath, outPath)) {
      await sharp(srcPath)
        .webp({ quality: 85, effort: 4 }) // quality 85 ≈ best size/quality trade-off
        .toFile(outPath)
      const raw = (await fs.stat(srcPath)).size
      const opt = (await fs.stat(outPath)).size
      const diff = ((1 - opt / raw) * 100).toFixed(1)
      const verb = diff >= 0 ? 'smaller' : 'larger'
      const sign = diff >= 0 ? '' : '+'
      console.log(`  ✅ ${rel} → ${name} (${sign}${Math.abs(diff)}% ${verb})`)
      converted++
    } else {
      skipped++
    }
  }

  console.log(`\nDone: ${converted} converted, ${skipped} already up-to-date.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
