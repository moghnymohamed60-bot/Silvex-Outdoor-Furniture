'use client';

import { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  FileText,
  AlertCircle,
  Building2,
  Package,
  Server,
  ExternalLink,
  Info,
  X,
  Check,
} from 'lucide-react';

export default function AdminEmailStudioPage() {
  const [activeTemplate, setActiveTemplate] = useState<
    'ORDER_CONFIRMATION' | 'ORDER_STATUS_UPDATE' | 'HOSPITALITY_INQUIRY'
  >('ORDER_CONFIRMATION');
  const [testEmail, setTestEmail] = useState('client@silvex-residences.com');
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [providerInfo, setProviderInfo] = useState<any>(null);
  const [isLoadingLogs, setIsLoadingLogs] = useState(true);
  const [selectedLogForModal, setSelectedLogForModal] = useState<any>(null);

  const fetchLogs = async () => {
    try {
      setIsLoadingLogs(true);
      const res = await fetch('/api/admin/emails');
      const json = await res.json();
      if (json.success) {
        setLogs(json.data || []);
        setProviderInfo(json.providerInfo || null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSendTest = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!testEmail) return;
    setIsSending(true);
    setSendResult(null);
    try {
      const res = await fetch('/api/admin/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeTemplate,
          toEmail: testEmail,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSendResult(data);
        fetchLogs();
      } else {
        alert(data.error || 'Failed to dispatch test email.');
      }
    } catch (err: any) {
      alert('Error dispatching email.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-silvex-600 font-bold mb-1">
            <Mail className="w-3.5 h-3.5" />
            Automated Email Dispatch Engine
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
            Email Notification Studio
          </h1>
          <p className="text-xs text-stone-500">
            Real SMTP email dispatch with automated zero-config test inboxes and live web preview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSendTest()}
            disabled={isSending}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold shadow-luxury transition-all"
          >
            {isSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
            1-Click Automated Test Send
          </button>

          <button
            onClick={fetchLogs}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLogs ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Automated Engine Status Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <span>Automated Dispatch Status:</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active & Ready (Zero Manual Config Needed)
              </span>
            </div>
            <div className="text-[11px] text-stone-500">
              Sender: <span className="font-mono text-stone-700 dark:text-stone-300">Silvex Outdoor Concierge</span> &bull; Engine: <span className="font-medium text-forest-800 dark:text-forest-300">Nodemailer Auto-Provisioned SMTP & Live Web Inbox</span>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-stone-500 bg-stone-50 dark:bg-stone-800/60 px-3 py-2 rounded-xl border border-stone-200/60 dark:border-stone-700/60">
          All order checkouts, status updates, and trade forms automatically send real formatted emails.
        </div>
      </div>

      {/* Quick Result Toast */}
      {sendResult && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong>Email Dispatched Successfully!</strong> {sendResult.message}
            </div>
          </div>
          {sendResult.data?.previewUrl && (
            <a
              href={sendResult.data.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-800 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors shadow-sm shrink-0"
            >
              Open Live Inbox Message ↗
            </a>
          )}
        </div>
      )}

      {/* Grid: Preview & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls & Test Sender (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Template Selector Card */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-silvex-600" />
              Select Notification Template
            </h2>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveTemplate('ORDER_CONFIRMATION')}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs flex items-center justify-between ${
                  activeTemplate === 'ORDER_CONFIRMATION'
                    ? 'border-forest-900 bg-forest-900/5 dark:bg-forest-950/40 text-forest-900 dark:text-forest-200 font-bold'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-silvex-600" />
                  <div>
                    <div className="font-semibold">Order Confirmation</div>
                    <div className="text-[10px] text-stone-500 font-normal">Customer checkout confirmation</div>
                  </div>
                </div>
                {activeTemplate === 'ORDER_CONFIRMATION' && <CheckCircle2 className="w-4 h-4 text-forest-800" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveTemplate('ORDER_STATUS_UPDATE')}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs flex items-center justify-between ${
                  activeTemplate === 'ORDER_STATUS_UPDATE'
                    ? 'border-forest-900 bg-forest-900/5 dark:bg-forest-950/40 text-forest-900 dark:text-forest-200 font-bold'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-semibold">Status & Shipping Update</div>
                    <div className="text-[10px] text-stone-500 font-normal">Freight dispatch & tracking alert</div>
                  </div>
                </div>
                {activeTemplate === 'ORDER_STATUS_UPDATE' && <CheckCircle2 className="w-4 h-4 text-forest-800" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveTemplate('HOSPITALITY_INQUIRY')}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs flex items-center justify-between ${
                  activeTemplate === 'HOSPITALITY_INQUIRY'
                    ? 'border-forest-900 bg-forest-900/5 dark:bg-forest-950/40 text-forest-900 dark:text-forest-200 font-bold'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <div>
                    <div className="font-semibold">Hospitality & Trade</div>
                    <div className="text-[10px] text-stone-500 font-normal">VIP trade applicant receipt</div>
                  </div>
                </div>
                {activeTemplate === 'HOSPITALITY_INQUIRY' && <CheckCircle2 className="w-4 h-4 text-forest-800" />}
              </button>
            </div>
          </div>

          {/* Test Dispatch Form */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-silvex-600" />
              Automated Test Dispatch
            </h2>
            <p className="text-xs text-stone-500">
              Dispatches the email via real SMTP and provides a direct live web inbox link.
            </p>

            <form onSubmit={handleSendTest} className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Recipient Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. client@villa.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSending || !testEmail}
                className="w-full py-3 rounded-full bg-forest-900 hover:bg-forest-800 disabled:opacity-50 text-white text-xs uppercase tracking-widest font-bold shadow-luxury transition-all flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Dispatching Email...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Dispatch Notification
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Live Template HTML Preview (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm overflow-hidden flex flex-col h-[640px]">
            {/* Iframe Header */}
            <div className="px-6 py-4 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-950/50">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-silvex-600" />
                <span className="text-xs font-bold text-stone-900 dark:text-white">
                  Live HTML Preview — {activeTemplate.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-stone-500 font-mono">Architectural 600px Viewport</span>
              </div>
            </div>

            {/* Embedded Iframe */}
            <div className="flex-1 bg-stone-100 dark:bg-stone-950 p-4 flex items-center justify-center overflow-auto">
              <iframe
                key={activeTemplate}
                src={`/api/admin/emails?preview=${activeTemplate}`}
                title="Email Preview"
                className="w-full h-full max-w-[620px] rounded-xl shadow-lg border border-stone-300 dark:border-stone-800 bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dispatch History Table with Live Inbox Links */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-silvex-600" />
              Email Dispatch History & Live Web Inboxes
            </h2>
            <p className="text-xs text-stone-500">
              Click "View Live Web Message" on any row to open the received email directly in your browser.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-mono text-stone-600 dark:text-stone-400">
            {logs.length} Total Dispatches
          </span>
        </div>

        {logs.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500">
            No emails recorded yet in this session. Click <strong>"1-Click Automated Test Send"</strong> above to dispatch and view live.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-950/60 border-b border-stone-200 dark:border-stone-800 text-stone-500">
                <tr>
                  <th className="py-3 px-4 font-semibold">Type</th>
                  <th className="py-3 px-4 font-semibold">Recipient</th>
                  <th className="py-3 px-4 font-semibold">Subject</th>
                  <th className="py-3 px-4 font-semibold">Delivery Channel</th>
                  <th className="py-3 px-4 font-semibold">Timestamp</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-700 dark:text-stone-300">
                      {log.type}
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-900 dark:text-white">
                      {log.recipient}
                    </td>
                    <td className="py-3 px-4 text-stone-600 dark:text-stone-400 max-w-xs truncate">
                      {log.subject}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                        {log.status === 'SENT' ? 'Sent (SMTP)' : 'Simulated'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-stone-500 text-[11px]">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      {log.previewUrl ? (
                        <a
                          href={log.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-forest-900 hover:bg-forest-800 text-white font-semibold text-[10px] transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View Live Web Message
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedLogForModal(log)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-800 dark:text-stone-200 font-semibold text-[10px] transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          Inspect HTML
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Raw Inspection */}
      {selectedLogForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                  {selectedLogForModal.subject}
                </h3>
                <div className="text-xs text-stone-500">To: {selectedLogForModal.recipient}</div>
              </div>
              <button
                onClick={() => setSelectedLogForModal(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-4 bg-stone-100 dark:bg-stone-950 overflow-auto">
              {selectedLogForModal.previewHtml ? (
                <div
                  className="bg-white rounded-xl shadow p-4 text-xs overflow-auto"
                  dangerouslySetInnerHTML={{ __html: selectedLogForModal.previewHtml }}
                />
              ) : (
                <div className="text-xs text-stone-500">No HTML payload available.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
