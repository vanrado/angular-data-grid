import {DataAudit} from './data-audit';

const dataAudits: DataAudit[] = [];
for (let i = 1; i <= 20; i++) {
  const dataAudit: DataAudit = {
    id: i,
    user: `User ${i}`,
    timestamp: `2022-03-1${i % 9 + 1} 10:30:${i % 60}`,
    action: `Action ${i}`,
    details: `Details ${i}`,
  };
  dataAudits.push(dataAudit);
}

export const DATA_AUDITS = dataAudits;
