import {ConfigAudit} from './config-audit';

const configAudits: ConfigAudit[] = [];
for (let i = 1; i <= 20; i++) {
  const dataAudit: ConfigAudit = {
    id: i,
    user: `User ${i}`,
    timestamp: `2022-03-1${i % 9 + 1} 10:30:${i % 60}`,
    action: `Action ${i}`,
    details: `Details ${i}`,
  };
  configAudits.push(dataAudit);
}

export const CONFIG_AUDITS = configAudits;
