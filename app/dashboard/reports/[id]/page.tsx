'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/app/components/AppShell';

interface Factor {
  id: string;
  label: string;
  score: number;
  isRedFlag: boolean;
  category: string;
}

interface ReportDetail {
  id: string;
  createdAt: string;
  score: number;
  urgency: string;
  primaryCategory: string;
  recommendation: string;
  factors: string;
  answers: string;
  personName: string;
}

function GaugeChart({ score, max = 30 }: { score: number; max?: number }) {
  const pct = score / max;
  const r = 70;
  const circumference = Math.PI * r;
  const dashOffset = circumference * (1 - pct);
  const color = pct >= 0.67 ? '#B91C1C' : pct >= 0.33 ? '#B45309' : '#15803D';
  const label = pct >= 0.67 ? 'HIGH' : pct >= 0.33 ? 'MEDIUM' : 'LOW';
  const emoji = pct >= 0.67 ? '🔴' : pct >= 0.33 ? '🟡' : '🟢';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="180" height="100" viewBox="0 0 180 100">
        <path d="M 15 90 A 70 70 0 0 1 165 90" fill="none" stroke="var(--border-faint)" strokeWidth="14" strokeLinecap="round" />
        <path d="M 15 90 A 70 70 0 0 1 165 90" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.19, 1, 0.22, 1)' }} />
        <text x="90" y="72" textAnchor="middle" fontSize="32" fontWeight="900" fill={color} style={{ fontFamily: 'var(--font)' }}>{score}</text>
        <text x="90" y="92" textAnchor="middle" fontSize="12" fill="var(--text-4)" style={{ fontFamily: 'var(--font)' }}>/ {max}</text>
      </svg>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px',
        background: pct >= 0.67 ? 'var(--red-light)' : pct >= 0.33 ? '#FFFBEB' : '#F0FDF4',
        border: `1.5px solid ${color}33`, borderRadius: '999px', padding: '6px 20px',
      }}>
        <span style={{ fontSize: '18px' }}>{emoji}</span>
        <span style={{ fontSize: '15px', fontWeight: '800', color }}>{label} RISK</span>
      </div>
    </div>
  );
}

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [report, setReport] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/sessions?sessionId=${id}`)
      .then((r) => r.json())
      .then((data) => setReport(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <AppShell>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text-4)' }}>
          Loading report...
        </div>
      </AppShell>
    );
  }

  if (!report) {
    return (
      <AppShell>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-3)' }}>Report not found.</p>
          <button className="btn btn-primary" onClick={() => router.push('/dashboard/reports')} style={{ marginTop: '16px' }}>
            Back to Reports
          </button>
        </div>
      </AppShell>
    );
  }

  const score = report.score ?? 0;
  const urgency = report.urgency ?? 'Low';
  const factors: Factor[] = (() => { try { return JSON.parse(report.factors || '[]'); } catch { return []; } })();
  const urgencyColor = urgency === 'High' ? '#B91C1C' : urgency === 'Medium' ? '#B45309' : '#15803D';

  const getRecommendation = (s: number) => {
    if (s >= 20) return { title: 'Seek Emergency Care', desc: 'Visit the nearest hospital casualty department immediately.', type: 'urgent' };
    if (s >= 10) return { title: 'Consult Your Doctor', desc: 'Schedule an appointment within the next 24 hours.', type: 'moderate' };
    return { title: 'Home Management', desc: 'Monitor symptoms and rest. Consult a doctor if conditions worsen.', type: 'low' };
  };
  const rec = getRecommendation(score);

  return (
    <AppShell>
      <div className="mobile-padding" style={{ padding: '28px 32px', minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <button
              onClick={() => router.push('/dashboard/reports')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', fontSize: '13px', fontFamily: 'inherit', marginBottom: '8px', padding: 0 }}
            >
              ← Back to Reports
            </button>
            <h1 style={{ fontSize: '22px', fontWeight: '900', color: 'var(--text-1)', letterSpacing: '-0.5px', margin: 0 }}>
              Assessment Result
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-3)', marginTop: '4px' }}>
              {new Date(report.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              {report.personName && report.personName !== 'Myself' && ` · For ${report.personName}`}
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => router.push('/dashboard')} style={{ gap: '8px' }}>
            New Assessment
          </button>
        </div>

        <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Gauge + Recommendation */}
            <div className="card" style={{ padding: '32px' }}>
              <div className="mobile-flex-stack" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                <div style={{ flexShrink: 0 }}>
                  <GaugeChart score={score} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    background: score >= 20 ? 'rgba(185,28,28,0.05)' : score >= 10 ? '#FFFBEB' : '#F0FDF4',
                    borderLeft: `4px solid ${urgencyColor}`,
                    padding: '16px 20px', borderRadius: '10px',
                  }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-1)', marginBottom: '6px' }}>{rec.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: '1.6' }}>{rec.desc}</p>
                  </div>
                  {report.recommendation && (
                    <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '12px', lineHeight: '1.6', fontStyle: 'italic' }}>
                      {report.recommendation}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-1)', marginBottom: '20px' }}>Next Steps</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { icon: '🏥', title: 'Hospital Visit', active: score >= 20 },
                  { icon: '👨‍⚕️', title: 'Call Doctor', active: score >= 10 },
                  { icon: '🩹', title: 'Home Care', active: true },
                  { icon: '💊', title: 'Medication', active: score >= 10 },
                ].map((item) => (
                  <div key={item.title} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '16px', borderRadius: '12px',
                    border: '1.5px solid var(--border)',
                    background: item.active ? 'white' : 'var(--bg)',
                    opacity: item.active ? 1 : 0.4,
                    boxShadow: item.active ? 'var(--shadow-sm)' : 'none',
                  }}>
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-1)' }}>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Risk Factors */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-1)', marginBottom: '16px' }}>
                Risk Factors {factors.length > 0 && <span style={{ fontSize: '12px', color: 'var(--text-4)', fontWeight: '500' }}>({factors.length} detected)</span>}
              </h3>
              {factors.length === 0 ? (
                <p style={{ fontSize: '13px', color: 'var(--text-4)' }}>No specific factors recorded.</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {factors.map((f) => (
                    <span key={f.id} style={{
                      background: f.isRedFlag ? 'var(--red-light)' : 'var(--bg)',
                      color: f.isRedFlag ? 'var(--red)' : 'var(--text-2)',
                      border: `1px solid ${f.isRedFlag ? 'var(--red-border)' : 'var(--border)'}`,
                      padding: '5px 12px', borderRadius: '999px',
                      fontSize: '12px', fontWeight: '600',
                    }}>
                      {f.isRedFlag && '⚠️ '}{f.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Category & Score Breakdown */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-1)', marginBottom: '16px' }}>Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Risk Score', value: `${score} / 30` },
                  { label: 'Urgency Level', value: urgency },
                  { label: 'Primary Category', value: report.primaryCategory || 'General' },
                  { label: 'Date', value: new Date(report.createdAt).toLocaleDateString() },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-faint)' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-3)', fontWeight: '600' }}>{item.label}</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-1)', fontWeight: '700' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: '28px', padding: '16px', background: 'var(--text-1)', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'JetBrains Mono, monospace', margin: 0 }}>
            ⚠️ DISCLAIMER: THIS IS A DECISION SUPPORT TOOL. IN CASE OF EMERGENCY, CONTACT MEDICAL PROFESSIONALS IMMEDIATELY.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
