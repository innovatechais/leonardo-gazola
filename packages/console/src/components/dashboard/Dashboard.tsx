'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import { Database, Bot, GitBranch, Package, Activity, Heart } from 'lucide-react';

interface Metrics {
  totalProjects?: number;
  totalSubstrates?: number;
  totalBlocks?: number;
  totalOutputs?: number;
  routingRequests?: number;
  topSquads?: Array<{ name: string; count: number }>;
  projects?: any[];
}

export function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboard()
      .then(setMetrics)
      .catch(() => setMetrics({}))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Projects', value: metrics.totalProjects ?? '–', icon: Database, color: 'var(--color-accent-blue)' },
    { label: 'Substrates', value: metrics.totalSubstrates ?? '–', icon: Activity, color: 'var(--color-accent-green)' },
    { label: 'Blocks', value: metrics.totalBlocks ?? '–', icon: Package, color: 'var(--color-accent-yellow)' },
    { label: 'Outputs', value: metrics.totalOutputs ?? '–', icon: GitBranch, color: 'var(--color-accent-red)' },
    { label: 'Squads', value: 15, icon: Bot, color: '#9c27b0' },
    { label: 'Requests', value: metrics.routingRequests ?? '–', icon: Heart, color: '#ff6f00' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">NEXUS system overview</p>

      {loading ? (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-[var(--color-bg-surface)] animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wide">{card.label}</span>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.color + '18' }}>
                      <Icon size={16} style={{ color: card.color }} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[var(--color-text-primary)]">{card.value}</p>
                </div>
              );
            })}
          </div>

          {/* Top Squads */}
          {metrics.topSquads && metrics.topSquads.length > 0 && (
            <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] rounded-xl p-5">
              <h3 className="text-sm font-medium mb-4">Most Used Squads</h3>
              <div className="space-y-3">
                {metrics.topSquads.slice(0, 5).map((squad) => (
                  <div key={squad.name} className="flex items-center gap-3">
                    <span className="text-sm flex-1 text-[var(--color-text-secondary)]">{squad.name}</span>
                    <div className="w-32 h-2 bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--color-accent-blue)] rounded-full"
                        style={{ width: `${Math.min(100, (squad.count / (metrics.topSquads![0]?.count || 1)) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--color-text-tertiary)] w-8 text-right">{squad.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-sm font-medium mb-4">Quick Actions</h3>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'New Substrate', cmd: '*substrate create' },
                { label: 'Generate Context', cmd: '*context generate' },
                { label: 'Knowledge Health', cmd: '*knowledge health' },
                { label: 'Run Campaign', cmd: '*campaign run' },
              ].map((action) => (
                <button
                  key={action.cmd}
                  className="px-4 py-2 text-sm bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-lg hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
