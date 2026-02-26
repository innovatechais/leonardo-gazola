'use client';

import { useEffect, useState, useRef } from 'react';
import { api } from '@/lib/api-client';
import { useAppStore } from '@/stores/app-store';
import { Play, Info, Bot, X, Upload, FileText, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export function SquadGrid() {
  const [squads, setSquads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [launching, setLaunching] = useState<string | null>(null);
  const [briefing, setBriefing] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [launchStatus, setLaunchStatus] = useState<'idle' | 'launching' | 'done' | 'error'>('idle');
  const [launchResult, setLaunchResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addArtifact } = useAppStore();

  useEffect(() => {
    api.getSquads()
      .then(setSquads)
      .catch(() => setSquads([]))
      .finally(() => setLoading(false));
  }, []);

  const handleLaunch = async () => {
    if (!launching) return;
    setLaunchStatus('launching');
    try {
      // Upload file first if present
      let uploadPath = '';
      if (uploadedFile) {
        try {
          const uploadResult = await api.uploadFile(uploadedFile);
          uploadPath = uploadResult.path;
        } catch {}
      }

      const result = await api.launchSquad(launching, {
        briefing,
        uploadedFile: uploadPath,
      });
      setLaunchResult(result);
      setLaunchStatus('done');

      // Create artifact with the execution summary
      const summary = result.summary || JSON.stringify(result, null, 2);
      addArtifact({ type: 'data', title: `Squad: ${launching}`, content: summary });
    } catch (err: any) {
      setLaunchResult({ error: err.message });
      setLaunchStatus('error');
    }
  };

  const closeLaunchModal = () => {
    setLaunching(null);
    setBriefing('');
    setUploadedFile(null);
    setLaunchStatus('idle');
    setLaunchResult(null);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-1">Squads</h2>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6">AI agent squads available for execution</p>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-[var(--color-bg-surface)] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {squads.map((squad) => (
            <div
              key={squad.name}
              className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] rounded-xl p-5 hover:shadow-md hover:border-[var(--color-accent-blue)] transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-blue-light)] flex items-center justify-center">
                  <Bot size={20} className="text-[var(--color-accent-blue)]" />
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  squad.registered ? 'bg-[var(--color-state-success-bg)] text-[var(--color-state-success)]' : 'bg-[var(--color-state-warning-bg)] text-[var(--color-state-warning)]'
                }`}>
                  {squad.registered ? 'Registered' : 'Unregistered'}
                </span>
              </div>

              <h3 className="text-sm font-medium mb-1">{squad.name}</h3>
              <p className="text-xs text-[var(--color-text-tertiary)] mb-1">{squad.category || 'Uncategorized'}</p>

              {squad.produces && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {squad.produces.slice(0, 3).map((p: string) => (
                    <span key={p} className="text-[10px] px-2 py-0.5 bg-[var(--color-bg-surface)] rounded-full text-[var(--color-text-tertiary)]">{p}</span>
                  ))}
                </div>
              )}

              <div className="flex gap-2 mt-auto pt-2">
                <button
                  onClick={() => setLaunching(squad.name)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium bg-[var(--color-accent-blue)] text-white rounded-lg hover:bg-[var(--color-accent-blue-dark)] transition-colors"
                >
                  <Play size={12} /> Launch
                </button>
                <button className="px-3 py-2 text-xs border border-[var(--color-border-default)] rounded-lg hover:bg-[var(--color-border-subtle)] text-[var(--color-text-secondary)]">
                  <Info size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Launch Modal */}
      {launching && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={closeLaunchModal}>
          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] rounded-2xl shadow-xl w-[520px] max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border-default)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-blue-light)] flex items-center justify-center">
                  <Bot size={16} className="text-[var(--color-accent-blue)]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Launch Squad</h3>
                  <p className="text-xs text-[var(--color-text-tertiary)]">{launching}</p>
                </div>
              </div>
              <button onClick={closeLaunchModal} className="p-1 rounded hover:bg-[var(--color-border-subtle)]">
                <X size={16} className="text-[var(--color-text-tertiary)]" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              {launchStatus === 'idle' && (
                <>
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 block">Briefing / Instructions</label>
                    <textarea
                      value={briefing}
                      onChange={(e) => setBriefing(e.target.value)}
                      placeholder="Describe what this squad should do..."
                      className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-accent-blue)] resize-none h-24"
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 block">Attach File (optional)</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".md,.txt,.json,.yaml,.yml,.pdf,.png,.jpg,.jpeg,.webp,.svg,.mp3,.wav,.m4a"
                      onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                    />
                    {uploadedFile ? (
                      <div className="flex items-center gap-2 p-2.5 bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-lg">
                        <FileText size={14} className="text-[var(--color-accent-blue)]" />
                        <span className="text-xs flex-1 truncate">{uploadedFile.name}</span>
                        <button onClick={() => setUploadedFile(null)} className="text-[var(--color-text-tertiary)] hover:text-[var(--color-state-error)]">
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-[var(--color-border-default)] rounded-lg text-xs text-[var(--color-text-tertiary)] hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition-colors"
                      >
                        <Upload size={14} /> Drop file or click to upload
                      </button>
                    )}
                  </div>

                  <button
                    onClick={handleLaunch}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-[var(--color-accent-blue)] text-white rounded-lg hover:bg-[var(--color-accent-blue-dark)] transition-colors"
                  >
                    <Play size={14} /> Execute Squad
                  </button>
                </>
              )}

              {launchStatus === 'launching' && (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-2 border-[var(--color-accent-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm font-medium mb-1">Executing {launching}</p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">Preparing context and routing to agents...</p>
                </div>
              )}

              {launchStatus === 'done' && launchResult && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[var(--color-state-success)]">
                    <CheckCircle2 size={16} />
                    <span className="text-sm font-medium">Squad executed successfully</span>
                  </div>

                  {/* Summary */}
                  {launchResult.summary && (
                    <pre className="text-xs bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-lg p-3 whitespace-pre-wrap">
                      {launchResult.summary}
                    </pre>
                  )}

                  {/* Execution Steps */}
                  {launchResult.steps?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">Execution Steps</h4>
                      <div className="space-y-1.5">
                        {launchResult.steps.map((step: any, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-xs p-2 bg-[var(--color-bg-surface)] rounded-lg">
                            <ArrowRight size={12} className="text-[var(--color-accent-blue)] flex-shrink-0" />
                            <span className="font-medium">{step.action}</span>
                            {step.agent && <span className="text-[var(--color-text-tertiary)]">{step.name || step.agent}</span>}
                            {step.error && <span className="text-[var(--color-state-error)]">{step.error}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Warnings */}
                  {launchResult.staleWarnings?.length > 0 && (
                    <div className="p-3 bg-[var(--color-state-warning-bg)] rounded-lg">
                      <p className="text-xs font-medium text-[var(--color-state-warning)] mb-1">Stale Content Warnings</p>
                      {launchResult.staleWarnings.map((w: string, i: number) => (
                        <p key={i} className="text-xs text-[var(--color-text-secondary)]">{w}</p>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={closeLaunchModal}
                    className="w-full py-2 text-sm font-medium border border-[var(--color-border-default)] rounded-lg hover:bg-[var(--color-border-subtle)] transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}

              {launchStatus === 'error' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[var(--color-state-error)]">
                    <AlertCircle size={16} />
                    <span className="text-sm font-medium">Launch failed</span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-state-error-bg)] p-3 rounded-lg">
                    {launchResult?.error || 'Unknown error'}
                  </p>
                  <button
                    onClick={() => { setLaunchStatus('idle'); setLaunchResult(null); }}
                    className="w-full py-2 text-sm font-medium border border-[var(--color-border-default)] rounded-lg hover:bg-[var(--color-border-subtle)] transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
