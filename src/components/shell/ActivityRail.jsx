import { Icon } from '../../icons'

export function ActivityRail({ onOpenPalette }) {
  return (
    <nav className="rail">
      <div className="rail-btn" aria-current="true" title="Explorer"><Icon.files /></div>
      <div className="rail-btn" title="Search · ⌘K" onClick={onOpenPalette}><Icon.search /></div>
      <div className="rail-btn" title="Branch"><Icon.branch /></div>
      <div className="rail-btn" title="Profile"><Icon.user /></div>
      <div className="rail-btn" title="Decisions"><Icon.bolt /></div>
      <div className="rail-spacer"></div>
      <div className="rail-btn" title="Notifications"><Icon.bell /></div>
      <div className="rail-btn" title="Settings"><Icon.cog /></div>
    </nav>
  )
}
