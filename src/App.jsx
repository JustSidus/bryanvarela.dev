import React, { useState, useCallback, useRef } from 'react'
import { FILE_META } from './data/files'
import { Caption } from './components/shell/Caption'
import { ActivityRail } from './components/shell/ActivityRail'
import { Sidebar } from './components/shell/Sidebar'
import { Tabs } from './components/shell/Tabs'
import { Breadcrumbs } from './components/shell/Breadcrumbs'
import { StatusBar } from './components/shell/StatusBar'
import { CommandPalette } from './components/shell/CommandPalette'
import { EmptyStateDashboard } from './components/shell/EmptyStateDashboard'
import { BootTerminal } from './components/shell/BootTerminal'
import { AboutMe } from './components/content/AboutMe'
import { ArelifyPlatform } from './components/content/ArelifyPlatform'
import { VisitorManagement } from './components/content/VisitorManagement'
import { LayeredEcommerce } from './components/content/LayeredEcommerce'
import { TechStack } from './components/content/TechStack'
import { ContactSh } from './components/content/ContactSh'
import { useAccentColor } from './hooks/useAccentColor'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

const FILE_COMPONENTS = {
  'about-me.md':           AboutMe,
  'arelify-platform.ts':   ArelifyPlatform,
  'visitor-management.vue': VisitorManagement,
  'layered-ecommerce.cs':  LayeredEcommerce,
  'tech-stack.json':       TechStack,
  'contact.sh':            ContactSh,
}

export default function App() {
  const [openFiles, setOpenFiles] = useState(['about-me.md'])
  const [activeId, setActiveId] = useState('about-me.md')
  const [openFolders, setOpenFolders] = useState(new Set(['projects', 'infrastructure']))
  const [paletteOpen, setPaletteOpen] = useState(false)
  const terminalRef = useRef(null)

  useAccentColor(activeId)

  const openFile = useCallback((id) => {
    setOpenFiles((prev) => prev.includes(id) ? prev : [...prev, id])
    setActiveId(id)
  }, [])

  const closeFile = useCallback((id) => {
    setOpenFiles((prev) => {
      const idx = prev.indexOf(id)
      const next = prev.filter((x) => x !== id)
      if (id === activeId) {
        const fallback = next[idx] || next[idx - 1] || next[0] || null
        setActiveId(fallback)
      }
      return next
    })
  }, [activeId])

  const toggleFolder = useCallback((id) => {
    setOpenFolders((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id); else n.add(id)
      return n
    })
  }, [])

  useKeyboardShortcuts({ activeId, closeFile, setPaletteOpen, terminalRef })

  const ActiveComp = activeId ? FILE_COMPONENTS[activeId] : null

  return (
    <>
      <Caption activeId={activeId} onOpenPalette={() => setPaletteOpen(true)} />
      <ActivityRail onOpenPalette={() => setPaletteOpen(true)} />
      <Sidebar
        openFolders={openFolders}
        toggleFolder={toggleFolder}
        openFile={openFile}
        activeId={activeId}
        openFiles={openFiles}
      />
      <main className="editor">
        <Tabs
          openFiles={openFiles}
          activeId={activeId}
          setActive={setActiveId}
          closeFile={closeFile}
        />
        <Breadcrumbs activeId={activeId} />
        <div className="content" key={activeId}>
          {ActiveComp ? (
            <div className="content-inner">
              <ActiveComp />
            </div>
          ) : (
            <EmptyStateDashboard />
          )}
        </div>
        <BootTerminal ref={terminalRef} />
      </main>
      <StatusBar activeId={activeId} onOpenPalette={() => setPaletteOpen(true)} />

      {paletteOpen && (
        <CommandPalette
          onClose={() => setPaletteOpen(false)}
          onOpenFile={openFile}
        />
      )}
    </>
  )
}
