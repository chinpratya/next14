export const API_ENDPOINT_ONEFENCE_BASE_URL = process.env
  .NEXT_PUBLIC_API_ENDPOINT_ONEFENCE_URL as string;

export const API_ENDPOINT_ORGANIZATION_BASE_URL = `${API_ENDPOINT_ONEFENCE_BASE_URL}/organization`;
export const API_ENDPOINT_COMPLIANCE_BASE_URL = process
  .env
  .NEXT_PUBLIC_API_ENDPOINT_ASSESSMENT_AUTOMATION as string;

export const API_ENDPOINT_FILE_MANAGEMENT_BASE_URL =
  process.env
    .NEXT_PUBLIC_API_ENDPOINT_FILE_MANAGEMENT_BASE_URL;

export const API_ENDPOINT_CYBERFENCE_BASE_URL = process
  .env
  .NEXT_PUBLIC_API_ENDPOINT_CYBERFENCE_BASE_URL as string;

export const API_ENDPOINT_ONEFENCE_LOCAL_BASE_URL =
  process.env
    .NEXT_PUBLIC_API_ENDPOINT_ASSESSMENT_AUTOMATION as string;

export const API_ENDPOINT_COMPLIANCE_PORTAL_BASE_URL =
  process.env
    .NEXT_PUBLIC_API_ENDPOINT_ASSESSMENT_AUTOMATION_PORTAL as string;

export const API_ENDPOINT_ONEFENCE_AUDIT_LOG_BASE_URL = `${API_ENDPOINT_ONEFENCE_BASE_URL}/log`;
export const API_ENDPOINT_ONEFENCE_COMMENT_BASE_URL = `${API_ENDPOINT_ONEFENCE_BASE_URL}/comment_service`;
// datafence endpoint config
export const API_ENDPOINT_DATA_MAPPING_BASE_URL = `${API_ENDPOINT_ONEFENCE_BASE_URL}/data-mapping`;
export const API_ENDPOINT_RISK_ASSESSMENT_BASE_URL = `${API_ENDPOINT_ONEFENCE_BASE_URL}/riskassessment`;
export const API_ENDPOINT_CONSENT_MANAGEMENT_BASE_URL = `${API_ENDPOINT_ONEFENCE_BASE_URL}/consentv2`;
export const API_ENDPOINT_DATA_BREACH_BASE_URL = `${API_ENDPOINT_ONEFENCE_BASE_URL}/data-breach`;
export const API_ENDPOINT_DSAR_AUTOMATION_BASE_URL = `${API_ENDPOINT_ONEFENCE_BASE_URL}/dsar-management`;
export const API_ENDPOINT_INCIDENT_MANAGEMENT_BASE_URL = `${API_ENDPOINT_ONEFENCE_BASE_URL}/incident-management`;
export const API_ENDPOINT_POLICY_AND_NOTICE_MANAGEMENT_BASE_URL = `${API_ENDPOINT_ONEFENCE_BASE_URL}/onefence-policy-and-notice-management`;

export const API_ENDPOINT_COOKIE_MANAGEMENT_BASE_URL = `${API_ENDPOINT_ONEFENCE_BASE_URL}/cookiev2`;
export const API_ENDPOINT_MANAGEME_FILE_BASE_URL = ` https://r2ou3v3v9g.execute-api.ap-southeast-1.amazonaws.com/Prod`;
