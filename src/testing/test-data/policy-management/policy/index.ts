const list = [
  {
    ObjectID: '',
    ObjectType: '',
    ObjectUUID: '19de8741-aabd-4fe1-b985-253c713fcd65',
    name: 'creation',
    description: 'นโยบายใช้สำหรับ',
    language: 'ไทย',
    organization: 'test',
    review_period: 'six-month',
    days_earlier: 30,
    system_or_service: '',
    processing_activities: 'test',
    attach_file: '',
    personalize: {
      form_fields: {
        form: [
          {
            name: '',
            section: [
              {
                section_name: '',
                component: [],
              },
            ],
          },
        ],
      },
      content: {
        header_logo: '',
        action: '',
      },
    },
    action: 'creation',
    policy_type: '',
    template: {
      template_id: '',
      template_name: '',
    },
    website: 'www.google.com',
    status: 'draft',
    signing_date: '',
    effective_date: '',
    preview_document: [
      {
        signature: {
          attach_sugnature: '',
          pagr_signature: false,
          signer_name: '',
          position: '',
        },
        form_fields: [],
      },
    ],
    workflow: [
      {
        approval_process: {
          check: {
            master_reviewer: 'Admin Review',
            end_date: '0',
            secondary_reviewer: 'Admin2 Review',
          },
          approve: {
            approver: 'Admin Approver',
            end_date: '0',
          },
        },
        stages: [
          {
            stage_name: 'create',
            order: 0,
          },
        ],
      },
    ],
    created_dt: '2023-10-01T00:00:00Z',
    created_by: 'Admin',
    updated_at: '2023-10-01T00:00:00Z',
    updated_by: 'Admin',
    policy_created_form: 'policy',
    version: '1',
  },
  {
    ObjectID: '',
    ObjectType: '',
    ObjectUUID: '57394d52-c422-434f-8a6b-6bb8749dbc4d',
    name: 'existing policy',
    description: 'นโยบายใช้สำหรับ',
    language: 'ไทย',
    organization: 'test',
    review_period: 'six-month',
    days_earlier: 30,
    system_or_service: 'test',
    processing_activities: 'test',
    attach_file: 'file.pdf',
    action: 'existing policy',
    policy_type: 'นโยบายความเป็นส่วนตัว',
    template: {
      template_id: 'TEM01',
      template_name: 'ค่าเริ่มต้น',
    },
    website: '',
    status: 'draft',
    signing_date: '',
    effective_date: '',
    preview_document: [
      {
        signature: {
          attach_sugnature: '',
          pagr_signature: false,
          signer_name: '',
          position: '',
        },
        form_fields: [],
      },
    ],
    workflow: [
      {
        approval_process: {
          check: {
            master_reviewer: '',
            end_date: '',
            secondary_reviewer: '',
          },
          approve: {
            approver: '',
            end_date: '',
          },
        },
        stages: [
          {
            stage_name: '',
            order: 1,
          },
        ],
      },
    ],
    created_dt: '2023-10-01T00:00:00Z',
    created_by: 'Admin',
    updated_at: '2023-10-01T00:00:00Z',
    updated_by: 'Admin',
    policy_created_form: 'policy',
    version: '1',
  },
];

const version = [
  {
    ObjectID: '',
    ObjectType: '',
    ObjectUUID: '57394d52-c422-434f-8a6b-6bb8749dbc4d',
    name: 'ข้อตกลงการประมวลผล',
    description: 'นโยบายใช้สำหรับ',
    language: 'ไทย',
    organization: '',
    review_period: 'six-month',
    days_earlier: 30,
    system_or_service: '',
    processing_activities: '',
    attach_file: '',
    personalize: {
      form_fields: {
        form: [
          {
            name: '',
            section: [
              {
                section_name: '',
                component: [],
              },
            ],
          },
        ],
      },
      content: {
        header_logo: '',
        action: '',
      },
    },
    action: 'existing',
    policy_type: 'นโยบายความเป็นส่วนตัว',
    template: {
      template_id: 'TEM01',
      template_name: 'ค่าเริ่มต้น',
    },
    website: 'www.google.com',
    status: 'draft',
    signing_date: '',
    effective_date: '',
    preview_document: [
      {
        signature: {
          attach_sugnature: '',
          pagr_signature: false,
          signer_name: '',
          position: '',
        },
        form_fields: [],
      },
    ],
    workflow: [
      {
        approval_process: {
          check: {
            master_reviewer: '',
            end_date: '',
            secondary_reviewer: '',
          },
          approve: {
            approver: '',
            end_date: '',
          },
        },
        stages: [
          {
            stage_name: '',
            order: 1,
          },
        ],
      },
    ],
    created_dt: '2023-10-01T00:00:00Z',
    created_by: 'Admin',
    updated_at: '2023-10-01T00:00:00Z',
    updated_by: 'Admin',
    policy_created_form: 'policy',
    version: '1',
    versionId: '1',
  },
];

export const policy = {
  list,
  version,
};
