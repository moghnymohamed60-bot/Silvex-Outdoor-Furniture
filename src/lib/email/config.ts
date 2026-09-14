import fs from 'fs';
import path from 'path';

export interface EmailServerConfig {
  provider: 'gmail' | 'custom_smtp' | 'resend' | 'auto_test';
  smtpService?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  resendApiKey?: string;
  emailFrom?: string;
  isVerified?: boolean;
  lastVerifiedAt?: string;
}

const CONFIG_FILE_PATH = path.join(process.cwd(), '.email-config.json');

let memoryConfig: EmailServerConfig | null = null;

export function getEmailConfig(): EmailServerConfig {
  if (memoryConfig) return memoryConfig;

  // Try reading from file
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const data = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
      memoryConfig = JSON.parse(data);
      return memoryConfig!;
    }
  } catch (e) {
    // Ignore file read errors
  }

  // Fallback to process.env
  const config: EmailServerConfig = {
    provider: process.env.SMTP_SERVICE
      ? (process.env.SMTP_SERVICE as any)
      : process.env.SMTP_HOST
      ? 'custom_smtp'
      : process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('mock')
      ? 'resend'
      : 'auto_test',
    smtpService: process.env.SMTP_SERVICE,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    resendApiKey: process.env.RESEND_API_KEY,
    emailFrom: process.env.EMAIL_FROM || 'Silvex Outdoor Furniture <concierge@silvex-outdoor.com>',
    isVerified: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
  };

  memoryConfig = config;
  return config;
}

export function saveEmailConfig(newConfig: Partial<EmailServerConfig>): EmailServerConfig {
  const current = getEmailConfig();
  const updated: EmailServerConfig = {
    ...current,
    ...newConfig,
  };

  memoryConfig = updated;

  try {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (e) {
    console.error('[EmailConfig] Could not persist .email-config.json:', e);
  }

  return updated;
}
