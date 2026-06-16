import React from 'react';

const AGENTS = [
  { id: 1, name: "Sarah Jenkins", role: "Principal Broker", phone: "(512) 555-0143", email: "sarah@horizon.com", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400" },
  { id: 2, name: "Marcus Vance", role: "Luxury Specialist", phone: "(512) 555-0188", email: "marcus@horizon.com", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400" }
];

export default function AgentDirectory() {
  return (
    <div className="page-padding">
      <div className="centered-header">
        <h2>Meet Our Advisory Team</h2>
        <p>Committed professionals ready to navigate you through the local market smoothly.</p>
      </div>
      <div className="grid-2-col max-width-900">
        {AGENTS.map(agent => (
          <div key={agent.id} className="agent-profile-card">
            <img src={agent.img} alt={agent.name} />
            <div className="agent-meta">
              <h4>{agent.name}</h4>
              <span className="role-tag">{agent.role}</span>
              <p>📱 {agent.phone}</p>
              <p>✉️ {agent.email}</p>
              <button className="connect-btn">Message Agent</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}