import { ReactNode } from 'react';

import {
  CookieIcon,
  PolicyIcon,
  DsarIcon,
  ConsentIcon,
  ComplianceIcon,
  DataMappingIcon,
  DataBreachIcon,
  RiskAssessment,
  LogIcon,
  SiemIcon,
  SoarIcon,
  VulnerabilityIcon,
  SecurityIcon,
  ThreatIcon,
  ComplianceCyberIcon,
  AuditLogCyberIcon,
  IncidentIcon,
  SecurityCameraIcon,
  EmergencyResponseIcon,
  CustomReport,
} from '@utilComponents/icon';

type ModuleIcons = {
  [key: string]: ReactNode;
};

type AllModuleIcons = {
  [key: string]: ModuleIcons;
};
export const DATAFENCE_ICONS: ModuleIcons = {
  cookieConsentManagement: (
    <CookieIcon className="icon-module" />
  ),
  policyManagement: (
    <PolicyIcon className="icon-module" />
  ),
  dsarAutomation: <DsarIcon className="icon-module" />,
  consentManagement: (
    <ConsentIcon className="icon-module" />
  ),
  pdpaComplianceManagement: (
    <ComplianceIcon className="icon-module" />
  ),
  dataMapping: (
    <DataMappingIcon className="icon-module" />
  ),
  dataBreachManagement: (
    <DataBreachIcon className="icon-module" />
  ),
  riskAssessmentAutomation: (
    <RiskAssessment className="icon-module" />
  ),
  incidentManagement: (
    <ComplianceIcon className="icon-module" />
  ),
  riskAssessment: (
    <ComplianceCyberIcon className="icon-module" />
  ),
  customReport: <CustomReport className="icon-module" />,
};

export const CYBERFENCE_ICONS: ModuleIcons = {
  logManagement: <LogIcon className="icon-module" />,
  siem: <SiemIcon className="icon-module" />,
  soar: <SoarIcon className="icon-module" />,
  vulnerabilityManagement: (
    <VulnerabilityIcon className="icon-module" />
  ),
  securityAsset: <SecurityIcon className="icon-module" />,
  threatIntelligence: (
    <ThreatIcon className="icon-module" />
  ),
  cyberComplianceManagement: (
    <ComplianceCyberIcon className="icon-module" />
  ),
  assessmentAutomation: (
    <ComplianceCyberIcon className="icon-module" />
  ),
  auditLog: <AuditLogCyberIcon className="icon-module" />,
};

export const CENTRAL_MANAGEMENT_ICONS: ModuleIcons = {
  incident: <IncidentIcon />,
  assessmentAutomation: <ComplianceCyberIcon />,
};

export const PHYSICAL_MANAGEMENT: ModuleIcons = {
  securityCamera: <SecurityCameraIcon />,
  emergencyResponse: <EmergencyResponseIcon />,
};

export const MODULE_ICONS: AllModuleIcons = {
  datafence: DATAFENCE_ICONS,
  cyberfence: CYBERFENCE_ICONS,
  centralManagement: CENTRAL_MANAGEMENT_ICONS,
  physicalManagement: PHYSICAL_MANAGEMENT,
};
