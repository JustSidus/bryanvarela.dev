import React, { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react'
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
import { MobileGate } from './components/shell/MobileGate'
import { AboutMe } from './components/content/AboutMe'
import { ArelifyPlatform } from './components/content/ArelifyPlatform'
import { VisitorManagement } from './components/content/VisitorManagement'
import { VscodeExtension } from './components/content/VscodeExtension'
import { TechStack } from './components/content/TechStack'
import { ContactSh } from './components/content/ContactSh'
import { Welcome } from './components/content/Welcome'
import { useAccentColor } from './hooks/useAccentColor'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useTheme } from './hooks/useTheme'

const FILE_COMPONENTS = {
  'welcome':               Welcome,
  'about-me.md':           AboutMe,
  'arelify-platform.cs':   ArelifyPlatform,
  'visitor-management.php': VisitorManagement,
  'vscode-extension.ts':   VscodeExtension,
  'tech-stack.json':       TechStack,
  'contact.sh':            ContactSh,
}

export default function App() {
  const [openFiles, setOpenFiles] = useState(['welcome'])
  const [activeId, setActiveId] = useState('welcome')
  const [openFolders, setOpenFolders] = useState(new Set(['projects', 'infrastructure']))
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [activePanelId, setActivePanelId] = useState('files')
  const [sidebarWidth, setSidebarWidth] = useState(260)
  const terminalRef = useRef(null)

  useAccentColor(activeId)
  useTheme()

  useLayoutEffect(() => {
    const el = document.getElementById('app')
    if (!el) return
    el.style.setProperty('--sidebar-w', sidebarWidth + 'px')
    if (activePanelId) el.removeAttribute('data-sidebar')
    else el.setAttribute('data-sidebar', 'hidden')
  }, [sidebarWidth, activePanelId])

  const openFile = useCallback((id) => {
    setOpenFiles((prev) => {
      if (prev.includes(id)) return prev
      // Auto-close welcome tab the first time the user opens any other file.
      // Matches VS Code behavior; the user can reopen welcome via Ctrl+H.
      if (id !== 'welcome' && prev.length === 1 && prev[0] === 'welcome') {
        return [id]
      }
      return [...prev, id]
    })
    setActiveId(id)
  }, [])

  const moveFile = useCallback((fromIndex, toIndex) => {
    setOpenFiles((prev) => {
      if (
        fromIndex === toIndex ||
        fromIndex < 0 || fromIndex >= prev.length ||
        toIndex < 0 || toIndex > prev.length
      ) return prev
      const next = prev.slice()
      const [moved] = next.splice(fromIndex, 1)
      const insertAt = toIndex > fromIndex ? toIndex - 1 : toIndex
      next.splice(insertAt, 0, moved)
      return next
    })
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

  useKeyboardShortcuts({ activeId, closeFile, setPaletteOpen, terminalRef, openFile })

  const ActiveComp = activeId ? FILE_COMPONENTS[activeId] : null

  return (
    <>
      <MobileGate />
      <Caption activeId={activeId} onOpenPalette={() => setPaletteOpen(true)} />
      <ActivityRail
        activePanelId={activePanelId}
        onSetPanel={(id) => setActivePanelId(prev => prev === id ? null : id)}
        onOpenPalette={() => setPaletteOpen(true)}
      />
      <Sidebar
        activePanelId={activePanelId}
        openFolders={openFolders}
        toggleFolder={toggleFolder}
        openFile={openFile}
        activeId={activeId}
        openFiles={openFiles}
        onResize={setSidebarWidth}
      />
      <main className="editor">
        <Tabs
          openFiles={openFiles}
          activeId={activeId}
          setActive={setActiveId}
          closeFile={closeFile}
          moveFile={moveFile}
        />
        <Breadcrumbs activeId={activeId} />
        <div className="content" key={activeId}>
          {ActiveComp ? (
            <div className="content-inner">
              <ActiveComp openFile={openFile} />
            </div>
          ) : (
            <EmptyStateDashboard />
          )}
        </div>
        <BootTerminal ref={terminalRef} />
      </main>
      <StatusBar activeId={activeId} />

      {paletteOpen && (
        <CommandPalette
          onClose={() => setPaletteOpen(false)}
          onOpenFile={openFile}
        />
      )}
    </>
  )
}
