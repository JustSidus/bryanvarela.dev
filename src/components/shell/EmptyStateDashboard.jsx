import { ServerRack } from './ServerRack'
import { BinaryStreams } from './BinaryStreams'
import { ConsolePanel } from './ConsolePanel'

const PIXEL_SIZE = 6.8

export function EmptyStateDashboard() {
  return (
    <div className="empty-state">
      <div className="esd-watermark">
        <div className="esd-terminal">
          <div className="esd-titlebar">
            <span className="esd-dot" />
            <span className="esd-dot" />
            <span className="esd-dot" />
            <span className="esd-title">
              <span className="esd-accent">bv</span>_backend.sys
            </span>
          </div>
          <div className="esd-body">
            <div className="esd-panel-rack">
              <BinaryStreams pixelSize={PIXEL_SIZE} />
              <div className="rack-host">
                <ServerRack pixelSize={PIXEL_SIZE} />
              </div>
            </div>
            <ConsolePanel />
          </div>
        </div>
      </div>
    </div>
  )
}
