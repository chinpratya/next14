import { primaryKey } from '@mswjs/data';

import { uid } from '@/utils/uid';

export const complianceOrganizationList = {
  ObjectUUID: primaryKey(uid),
  name: String,
  agency: String,
  // orgGroup: Array,
  // orgGroupID: Array,
  industryGroup: String,
  industryGroupID: String,
  businessCategory: String,
  businessCategoryID: String,
  description: String,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};

export const complianceOrganizationContact = {
  ObjectUUID: primaryKey(uid),
  name: String,
  department: String,
  position: String,
  tel: String,
  email: String,
  organizationID: String,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
  description: String,
};

export const complianceOrganizationInstitute = {
  ObjectUUID: primaryKey(uid),
  name: String,
  province: String,
  district: String,
  description: String,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};

export const complianceOrganizationInstituteRespondent = {
  ObjectUUID: primaryKey(uid),
  name: String,
  organizationID: String,
  organizationName: String,
  branchID: String,
  branchName: String,
  approverName: String,
  approverEmail: String,
  department: String,
  position: String,
  email: String,
  tel: String,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};

export const complianceOrganizationInstituteApprover = {
  ObjectUUID: primaryKey(uid),
  name: String,
  organization: String,
  department: String,
  position: String,
  email: String,
  tel: String,
  description: String,
  respondent: Array,
  createdDt: String,
  createdBy: String,
  updatedDt: String,
  updatedBy: String,
};

export const complianceOrganizationInstituteApproverRespondent =
  {
    key: primaryKey(uid),
    name: String,
    position: String,
  };

export const complianceOrganizationInstituteAssignment = {
  ObjectUUID: primaryKey(uid),
  assessmentID: String,
  assessmentName: String,
  type: String,
  no: String,
  assignmentDt: String,
  expireDt: String,
  respondentCount: Number,
  respondentTotal: Number,
};

export const complianceOrganizationInstituteAssignmentRespondent =
  {
    ObjectUUID: primaryKey(uid),
    respondentName: String,
    email: String,
    department: String,
    position: String,
    status: String,
    assignmentDt: String,
    complateDt: String,
  };

export const complianceOrganizationInstituteAssignmentGrowth =
  {
    ObjectUUID: primaryKey(uid),
    graph: Array,
    graphMeta: Array,
    sections: Array,
    avgOfOrg: Object,
    maturityModel: Object,
    maturityModelID: String,
  };
