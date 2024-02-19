import { primaryKey } from '@mswjs/data';

export const policyManagementAssessments = {
  ObjectUUID: primaryKey(String),
  ObjectID: String,
  ObjectType: String,
  name: String,
  policy: String,
  period: String,
  created_dt: String,
  created_by: String,
  updated_at: String,
  updated_by: String,
};

export const policyManagementAssessmentsQuestionnaire = {
  ObjectUUID: primaryKey(String),
  ObjectID: String,
  ObjectType: String,
  created_dt: String,
  created_by: String,
  updated_at: String,
  updated_by: String,
  name: String,
  email_target: String,
  other_emails: String,
  personalize: {
    form_fields: {
      form: Array,
    },
    content: {
      header_logo: String,
      action: String,
    },
  },
  assessmentId: String,
  assessment_name: String,
  status: String,
  is_send: Boolean,
};

export const policyManagementAssessmentsQuestionnaireVersion =
  {
    ObjectUUID: primaryKey(String),
    ObjectID: String,
    ObjectType: String,
    created_dt: String,
    created_by: String,
    updated_at: String,
    updated_by: String,
    name: String,
    email_target: String,
    other_emails: String,
    personalize: {
      form_fields: {
        form: Array,
      },
      content: {
        header_logo: String,
        action: String,
      },
    },
    assessmentId: String,
    assessment_name: String,
    versions: Number,
  };
