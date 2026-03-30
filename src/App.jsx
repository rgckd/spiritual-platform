import { useState } from 'react'
import BranchOrchestrator from './BranchOrchestrator'
import SadhakaDashboard from './spiritual-sadhaka-prototype'
import PAdminDashboard from './spiritual-padmin-prototype'

const tabs = [
  { id: 'orchestrator', label: 'Branch Orchestrator' },
  { id: 'sadhaka', label: 'Sadhaka' },
  { id: 'padmin', label: 'P-Admin' },
]

function App() {
  const [active, setActive] = useState('orchestrator')

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{
        display: 'flex', gap: 0, borderBottom: '2px solid #D4B483',
        background: '#FDF6E8', padding: '0 16px',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontWeight: active === tab.id ? '700' : '400',
              color: active === tab.id ? '#C1440E' : '#3D2B10',
              borderBottom: active === tab.id ? '2px solid #C1440E' : '2px solid transparent',
              marginBottom: '-2px',
              fontSize: 14,
              letterSpacing: '0.03em',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {active === 'orchestrator' && <BranchOrchestrator />}
        {active === 'sadhaka' && <SadhakaDashboard />}
        {active === 'padmin' && <PAdminDashboard />}
      </div>
    </div>
  )
}

export default App
