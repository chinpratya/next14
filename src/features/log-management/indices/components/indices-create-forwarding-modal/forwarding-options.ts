const isCertificate = [
  {
    title: 'logManagement.step',
    description:
      'logManagement.indices.forwarding.configTargetServer',
  },
  {
    title: 'logManagement.step',
    description:
      'logManagement.indices.forwarding.configCertificate',
  },
  {
    title: 'logManagement.step',
    description:
      'logManagement.indices.forwarding.addFilter',
  },
];

const noneCertificate = [
  {
    title: 'logManagement.step',
    description:
      'logManagement.indices.forwarding.configTargetServer',
  },
  {
    title: 'logManagement.step',
    description:
      'logManagement.indices.forwarding.addFilter',
  },
];

export const stepOptions = {
  isCertificate,
  noneCertificate,
};

export const facilityOptions = [
  { value: 0, label: 'kernel messages' },
  { value: 1, label: 'user-level messages' },
  { value: 2, label: 'mail system' },
  { value: 3, label: 'system daemons' },
  {
    value: 4,
    label: '**security/authorization messages',
  },
  {
    value: 5,
    label: 'messages generated internally by Syslog',
  },
  {
    value: 6,
    label: 'line printer subsystem',
  },
  {
    value: 7,
    label: 'network news subsystem',
  },
  { value: 8, label: 'UUCP subsystem' },
  { value: 9, label: 'clock daemon' },
  {
    value: 10,
    label: 'security/authorization messages',
  },
  { value: 11, label: 'FTP daemon' },
  { value: 12, label: 'NTP subsystem' },
  { value: 13, label: 'log audit' },
  { value: 14, label: 'log alert' },
  { value: 15, label: 'clock daemon' },
  { value: 16, label: 'local use 0 (local0)' },
  { value: 17, label: 'local use 1 (local1)' },
  { value: 18, label: 'local use 2 (local2)' },
  { value: 19, label: 'local use 3 (local3)' },
  { value: 20, label: 'local use 4 (local4)' },
  { value: 21, label: 'local use 5 (local5)' },
  { value: 22, label: 'local use 6 (local6)' },
  { value: 23, label: 'local use 7 (local7)' },
];

export const severityOptions = [
  { value: 0, label: 'emergency' },
  { value: 1, label: 'alert' },
  { value: 2, label: 'critical' },
  { value: 3, label: 'error' },
  { value: 4, label: 'warning' },
  { value: 5, label: 'notice' },
  { value: 6, label: 'informational' },
  { value: 7, label: 'debug' },
];
