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
  Key,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
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

  // Outbound SMTP live setup state
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configProvider, setConfigProvider] = useState<'gmail' | 'custom_smtp' | 'resend'>('gmail');
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPass, setSmtpPass] = useState('');
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState(587);
  const [resendApiKey, setResendApiKey] = useState('');
  const [isVerifyingConfig, setIsVerifyingConfig] = useState(false);
  const [configMessage, setConfigMessage] = useState('');
  const [configError, setConfigError] = useState('');

  const fetchLogsAndConfig = async () => {
    try {
      setIsLoadingLogs(true);
      const [logsRes, configRes] = await Promise.all([
        fetch('/api/admin/emails'),
        fetch('/api/admin/emails/config'),
      ]);
      const logsJson = await logsRes.json();
      const configJson = await configRes.json();

      if (logsJson.success) {
        setLogs(logsJson.data || []);
        setProviderInfo(logsJson.providerInfo || null);
      }
      if (configJson.success && configJson.data) {
        if (configJson.data.smtpUser) setSmtpUser(configJson.data.smtpUser);
        if (configJson.data.smtpHost) setSmtpHost(configJson.data.smtpHost);
        if (configJson.data.smtpPort) setSmtpPort(configJson.data.smtpPort);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchLogsAndConfig();
  }, []);

  const handleSaveAndVerifyConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifyingConfig(true);
    setConfigMessage('');
    setConfigError('');

    try {
      const res = await fetch('/api/admin/emails/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: configProvider,
          smtpService: configProvider === 'gmail' ? 'gmail' : undefined,
          smtpHost: configProvider === 'custom_smtp' ? smtpHost : undefined,
          smtpPort: configProvider === 'custom_smtp' ? smtpPort : undefined,
          smtpUser,
          smtpPass,
          resendApiKey,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setConfigMessage(data.message || 'SMTP connected and verified!');
        fetchLogsAndConfig();
        setTimeout(() => setShowConfigModal(false), 2000);
      } else {
        setConfigError(data.error || 'Verification failed. Please check credentials.');
      }
    } catch (err: any) {
      setConfigError(err.message || 'Failed to connect to email server.');
    } finally {
      setIsVerifyingConfig(false);
    }
  };

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
        fetchLogsAndConfig();
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
            Outbound Email Delivery & Dispatch Studio
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
            Email Notification Studio
          </h1>
          <p className="text-xs text-stone-500">
            Real SMTP email dispatch with automated zero-config sandbox and physical inbox delivery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowConfigModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-silvex-600" />
            Connect Personal / SMTP Inbox
          </button>

          <button
            onClick={() => handleSendTest()}
            disabled={isSending}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold shadow-luxury transition-all"
          >
            {isSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
            1-Click Automated Test Send
          </button>

          <button
            onClick={fetchLogsAndConfig}
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
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <span>Active Dispatch Engine:</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {providerInfo?.activeProvider || 'SMTP Ready'}
              </span>
            </div>
            <div className="text-[11px] text-stone-500">
              Sender Address: <span className="font-mono text-stone-700 dark:text-stone-300">{providerInfo?.fromAddress || 'concierge@silvex-outdoor.com'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowConfigModal(true)}
          className="text-[11px] text-forest-800 dark:text-forest-300 font-semibold underline underline-offset-2 hover:text-forest-900 text-left sm:text-right"
        >
          Want emails delivered to your personal inbox? Click here to connect Gmail in 30 seconds &rarr;
        </button>
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
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Recipient Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. client@villa.com or your email"
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
              Email Dispatch History & Live Inboxes
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
                        {log.status === 'SENT' ? 'Delivered (SMTP)' : 'Simulated'}
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

      {/* Outbound SMTP Setup Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-silvex-600" />
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                  Connect Personal / Real Inbox
                </h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-500">
              Connect your Gmail account or custom SMTP server to deliver real emails directly into physical customer and personal inboxes.
            </p>

            <form onSubmit={handleSaveAndVerifyConfig} className="space-y-4 text-xs">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setConfigProvider('gmail')}
                  className={`flex-1 py-2 rounded-xl font-bold border transition-colors ${
                    configProvider === 'gmail'
                      ? 'border-forest-900 bg-forest-900/10 text-forest-900 dark:text-forest-200'
                      : 'border-stone-200 dark:border-stone-700'
                  }`}
                >
                  Gmail
                </button>
                <button
                  type="button"
                  onClick={() => setConfigProvider('custom_smtp')}
                  className={`flex-1 py-2 rounded-xl font-bold border transition-colors ${
                    configProvider === 'custom_smtp'
                      ? 'border-forest-900 bg-forest-900/10 text-forest-900 dark:text-forest-200'
                      : 'border-stone-200 dark:border-stone-700'
                  }`}
                >
                  Custom SMTP
                </button>
                <button
                  type="button"
                  onClick={() => setConfigProvider('resend')}
                  className={`flex-1 py-2 rounded-xl font-bold border transition-colors ${
                    configProvider === 'resend'
                      ? 'border-forest-900 bg-forest-900/10 text-forest-900 dark:text-forest-200'
                      : 'border-stone-200 dark:border-stone-700'
                  }`}
                >
                  Resend API
                </button>
              </div>

              {configProvider === 'gmail' && (
                <div className="space-y-3 bg-stone-50 dark:bg-stone-950 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 dark:text-stone-300">Your Gmail Address</label>
                    <input
                      type="email"
                      required
                      placeholder="your-email@gmail.com"
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 dark:text-stone-300">Google 16-Char App Password</label>
                    <input
                      type="password"
                      required
                      placeholder="xxxx xxxx xxxx xxxx"
                      value={smtpPass}
                      onChange={(e) => setSmtpPass(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                    />
                    <span className="text-[10px] text-stone-500 block">
                      Generated at Google Account &rarr; Security &rarr; App Passwords.
                    </span>
                  </div>
                </div>
              )}

              {configProvider === 'custom_smtp' && (
                <div className="space-y-3 bg-stone-50 dark:bg-stone-950 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 space-y-1">
                      <label className="font-bold">SMTP Host</label>
                      <input
                        type="text"
                        required
                        placeholder="smtp.mailprovider.com"
                        value={smtpHost}
                        onChange={(e) => setSmtpHost(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-stone-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold">Port</label>
                      <input
                        type="number"
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-stone-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">SMTP User / API Key</label>
                    <input
                      type="text"
                      required
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-stone-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">SMTP Password</label>
                    <input
                      type="password"
                      required
                      value={smtpPass}
                      onChange={(e) => setSmtpPass(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-stone-900"
                    />
                  </div>
                </div>
              )}

              {configProvider === 'resend' && (
                <div className="space-y-3 bg-stone-50 dark:bg-stone-950 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
                  <div className="space-y-1">
                    <label className="font-bold">Resend API Key</label>
                    <input
                      type="password"
                      required
                      placeholder="re_xxxxxxxxxxxx"
                      value={resendApiKey}
                      onChange={(e) => setResendApiKey(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-stone-900"
                    />
                  </div>
                </div>
              )}

              {configMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{configMessage}</span>
                </div>
              )}

              {configError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{configError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifyingConfig}
                className="w-full py-3 rounded-full bg-forest-900 hover:bg-forest-800 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                {isVerifyingConfig ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Connecting & Verifying with Mail Server...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Save & Verify Live Outbound Connection
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

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
