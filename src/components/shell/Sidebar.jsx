import { FilesPanel } from './panels/FilesPanel'
import { SearchPanel } from './panels/SearchPanel'
import { BranchPanel } from './panels/BranchPanel'
import { ProfilePanel } from './panels/ProfilePanel'
import { ExtensionsPanel } from './panels/ExtensionsPanel'
import { SidebarResizer } from './SidebarResizer'

const PANELS = {
  files:      FilesPanel,
  search:     SearchPanel,
  branch:     BranchPanel,
  profile:    ProfilePanel,
  extensions: ExtensionsPanel,
}

export function Sidebar({ activePanelId, ...props }) {
  const Panel = activePanelId ? PANELS[activePanelId] : null

  return (
    <aside className="sidebar">
      {Panel && <Panel {...props} />}
      <SidebarResizer onResize={props.onResize} />
    </aside>
  )
}