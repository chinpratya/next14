import { AppsConfig, ModulesConfig } from '@/types/apps';

export const APP_PATH = '/apps';
export const DATAFENCE_PATH = '/datafence';
export const CYBERFENCE_PATH = '/cyberfence';

export const PHYSICAL_MANAGEMENT_PATH =
  '/physical-management';
export const CENTRAL_MANAGEMENT_PATH =
  '/central-management';

export const PORTAL_PATH = '/portal';

export const ADMIN_PATH = '/admin';
export const DATAFENCE_COOKIE_CONSENT_MANAGEMENT_PATH = `/cookie-management`;
export const DATAFENCE_POLICY_AND_NOTICE_MANAGEMENT_PATH = `/policy-management`;
export const DATAFENCE_DSAR_AUTOMATION_PATH = `/dsar-automation`;
export const DATAFENCE_CONSENT_MANAGEMENT_PATH = `/consent-management`;
export const DATAFENCE_COMPLIANCE_MANAGEMENT_PATH = `/compliance`;
export const DATAFENCE_DATA_MAPPING_MANAGEMENT_PATH = `/data-mapping`;
export const DATAFENCE_DATA_BREACH_MANAGEMENT_PATH = `/data-breach`;
export const DATAFENCE_RISK_ASSESSMENT_AUTOMATION_MANAGEMENT_PATH =
  '/risk-assessment';

export const DATAFENCE_CUSTOM_REPORT_PATH = `/custom-report`;

// CYBERFENCE:
export const CYBERFENCE_LOG_MANAGEMENT_PATH = `/log-management`;
export const CYBERFENCE_SIEM_PATH = '/siem';
export const CYBERFENCE_SOAR_PATH = '/soar';
export const CYBERFENCE_VULNERABILITY_MANAGEMENT_PATH = `/vulnerability-management`;
export const CYBERFENCE_CYBER_SECURITY_ASSET_PATH = `/security-asset`;
export const CYBERFENCE_CYBER_THREAT_INTELLIGENCE_PATH = `/threat-intelligence`;
export const CYBERFENCE_ASSESSMENT_AUTOMATION_PATH = `/assessment-automation`;
export const CYBERFENCE_AUDIT_LOG = `/audit-log`;

//CENTRAL
export const CENTRAL_MANAGEMENT_INCIDENT_PATH = `/incident`;

export const APPS_CONFIG: AppsConfig = [
  {
    title: 'Privacy Management',
    id: 'datafence',
    description:
      'เครื่องมือบริหารจัดการความเป็นส่วนตัวของข้อมูลองค์กรแบบครบวงจร',
    path: `${APP_PATH}${DATAFENCE_PATH}`,
  },
  {
    title: 'Cyber Security',
    id: 'cyberfence',
    description:
      'ระบบจัดการความเสี่ยงทางไซเบอร์ขององค์กรแบบครบวงจร',
    path: `${APP_PATH}${CYBERFENCE_PATH}`,
  },
  // {
  //   title: 'Physical Security',
  //   id: 'physicalManagement',
  //   description: '',
  //   path: `${APP_PATH}${PHYSICAL_MANAGEMENT_PATH}`,
  // },
  {
    title: 'Central Management',
    id: 'centralManagement',
    description: '',
    path: `${APP_PATH}${CENTRAL_MANAGEMENT_PATH}`,
  },
];

export const DATAFENCE_CONFIG: ModulesConfig = [
  {
    title: 'Cookie Consent Management',
    id: 'cookieConsentManagement',
    description:
      'สร้าง ปรับแต่ง และจัดการคุกกี้บนเว็บไซต์คุณได้อย่างง่ายดาย',
    path: `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_COOKIE_CONSENT_MANAGEMENT_PATH}`,
    appId: 'datafence',
    permission: 'pdpakit:cookie:accessmodule:read',
  },
  {
    title: 'Policy & Notice Management',
    id: 'policyManagement',
    description:
      'สร้างและบริหารนโยบายเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคลของคุณ',
    path: `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_POLICY_AND_NOTICE_MANAGEMENT_PATH}`,
    appId: 'datafence',
    permission: 'pdpakit:policy:accessmodule:read',
  },
  {
    title: 'DSAR Automation',
    id: 'dsarAutomation',
    description:
      'บริหารจัดการ สร้างช่องทางรับคำขอใช้สิทธิตาม กฎหมาย',
    path: `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_DSAR_AUTOMATION_PATH}`,
    appId: 'datafence',
    permission: 'pdpakit:dsar:accessmodule:read',
  },
  {
    title: 'Consent Management',
    id: 'consentManagement',
    description:
      'สร้างเว็บฟอร์ม เพื่อจัดการและรวบรวมความยินยอม จากทุกช่องทาง',
    path: `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_CONSENT_MANAGEMENT_PATH}`,
    appId: 'datafence',
    permission: 'pdpakit:consent:accessmodule:read',
  },
  {
    title: 'Compliance Management',
    id: 'pdpaComplianceManagement',
    description:
      'การประเมินความพร้อมและประเมินระดับความสอดคล้อง ของการคุ้มครองข้อมูลส่วนบุคคลตามกฎหมาย',
    path: `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_COMPLIANCE_MANAGEMENT_PATH}`,
    appId: 'datafence',
    permission: 'pdpakit:compliance:accessmodule:read',
  },
  {
    title: 'Data Mapping',
    id: 'dataMapping',
    description:
      'สร้างภาพความเชื่อมโยงของกระแสข้อมูล หรือ Data Flow ที่ไหลภายในองค์กร',
    path: `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_DATA_MAPPING_MANAGEMENT_PATH}`,
    appId: 'datafence',
    permission: 'pdpakit:datamap:accessmodule:read',
  },
  {
    title: 'Data Breach Management',
    id: 'dataBreachManagement',
    description:
      'แจ้งเหตุ กรณีการรั่วไหลหรือละเมิดข้อมูลส่วนบุคคล พร้อมระบบเฝ้าติดตาม',
    path: `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_DATA_BREACH_MANAGEMENT_PATH}`,
    appId: 'datafence',
    permission: 'pdpakit:databreach:accessmodule:read',
  },
  {
    title: 'Assessment Automation',
    id: 'riskAssessmentAutomation',
    description:
      'ประเมินความเสี่ยงองค์กรในมิติต่าง ๆ อย่างเป็นระบบ',
    path: `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_RISK_ASSESSMENT_AUTOMATION_MANAGEMENT_PATH}`,
    appId: 'datafence',
    permission: 'pdpakit:assessment:accessmodule:read',
  },
  {
    title: 'Custom Report',
    id: 'customReport',
    description:
      'สร้างรายงานที่ต้องการ และสร้างกระบวนการทำงานอัตโนมัติ',
    path: `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_CUSTOM_REPORT_PATH}`,
    appId: 'datafence',
    permission:
      'pdpakit:customdashboard:accessmodule:read',
  },
];

export const CYBERFENCE_CONFIG: ModulesConfig = [
  {
    title: 'Log Management',
    id: 'logManagement',
    description:
      'รวบรวม จัดเก็บไฟล์ Log และข้อมูลด้านความปลอดภัย พร้อมหาความสัมพันธ์เกี่ยวกับเหตุภัยคุกคาม',
    path: `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_LOG_MANAGEMENT_PATH}`,
    appId: 'cyberfence',
  },
  {
    title:
      'Security Information and Event Management (SIEM)',
    id: 'siem',
    description:
      'วิเคราะห์หาความสัมพันธ์ แจ้งเตือนเพื่อป้องกัน และตรวจจับภัย คุกคามทางไซเบอร์',
    path: `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_SIEM_PATH}`,
    appId: 'cyberfence',
  },
  {
    title:
      'Security Orchestration, Automation, and Response (SOAR)',
    id: 'soar',
    description:
      'ระบบอัตโนมัติที่ช่วยเพิ่มประสิทธิภาพและลดเวลาของกระบวนการตอบสนองต่อภัยคุกคามทางไซเบอร์',
    path: `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_SOAR_PATH}`,
    appId: 'cyberfence',
  },
  {
    title: 'Vulnerability Management',
    id: 'vulnerabilityManagement',
    description:
      'ตรวจสอบข้อมูลช่องโหว่ของระบบภายในองค์กร จัดระเบียบ พร้อมสร้างกระบวนการแก้ไขเพื่อลดความเสี่ยง',
    path: `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_VULNERABILITY_MANAGEMENT_PATH}`,
    appId: 'cyberfence',
  },
  {
    title: 'Cybersecurity Asset',
    id: 'securityAsset',
    description:
      'จัดทำคลังและบริหารทรัพย์สินทาง IT เพื่อสร้างความมั่นคง ปลอดภัยไซเบอร์ตามแนวทางสากล',
    path: `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_CYBER_SECURITY_ASSET_PATH}`,
    appId: 'cyberfence',
  },
  {
    title: 'Cyber Threat Intelligence',
    id: 'threatIntelligence',
    description:
      'รวบรวม อัปเดตข้อมูลการข่าวเกี่ยวกับภัยคุกคามทางไซเบอร์ เพื่อเพิ่มศักยภาพในการป้องกันภัย',
    path: `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_CYBER_THREAT_INTELLIGENCE_PATH}`,
    appId: 'cyberfence',
  },
  {
    title: ' Audit Log',
    id: 'auditLog',
    description:
      'จัดการประวัติการใช้งานระบบได้อย่างง่ายดาย',
    path: `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_AUDIT_LOG}`,
    appId: 'cyberfence',
  },
];

export const PHYSICAL_MANAGEMENT_CONFIG: ModulesConfig = [
  {
    title: 'Security Camera Management',
    id: 'securityCamera',
    description:
      'บริหารจัดการกล้อง CCTV แบบรวมศูนย์พร้อม ระบบ Video Analytics จาก AI ที่ล้ำสมัย',
    path: 'https://physical.onefence.co/security-camera',
    appId: 'physicalManagement',
  },
  {
    title: 'Emergency Response',
    id: 'emergencyResponse',
    description:
      'เชื่อมและจัดการระบบตรวจจับการบุกรุก และระบบแจ้งเตือนภัยฉุกเฉิน SOS รวมถึงเชื่อมต่อไปยังหน่วยงานรัฐที่มีหน้าที่รับผิดชอบได้',
    path: 'https://physical.onefence.co/emergency-response',
    appId: 'physicalManagement',
  },
];

export const CENTRAL_MANAGEMENT_CONFIG: ModulesConfig = [
  {
    title: 'Incident Management',
    id: 'incident',
    description:
      'ระบบรวบรวมและจัดการรายงานเหตุการณ์ต่าง ๆ จากทั้งภายในและภายนอกองค์กร',
    path: `${APP_PATH}${CENTRAL_MANAGEMENT_PATH}${CENTRAL_MANAGEMENT_INCIDENT_PATH}`,
    appId: 'centralManagement',
  },
  {
    title: 'Assessment Automation',
    id: 'assessmentAutomation',
    description:
      'ประเมินความพร้อมสถานภาพการดำเนินงาน รวมถึงประเมิน ความเสี่ยงและตรวจสอบด้านความมั่นคงปลอดภัยไซเบอร์ตาม กฎหมาย',
    path: `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_ASSESSMENT_AUTOMATION_PATH}`,
    appId: 'centralManagement',
  },
];
