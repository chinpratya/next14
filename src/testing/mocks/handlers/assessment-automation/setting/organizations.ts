import dayjs from 'dayjs';
import _ from 'lodash';
import { rest } from 'msw';

import { API_ENDPOINT_COMPLIANCE_BASE_URL } from '@/config/endpoint';
import { uid } from '@/utils';

import { testData } from '../../../../test-data';
import { db } from '../../../db';

const getComplianceSettingOrganizationListHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization`,
    (req, res, ctx) => {
      const page =
        req.url.searchParams.get('page') || '1';
      const pageSize =
        req.url.searchParams.get('pageSize') || '10';
      const search =
        req.url.searchParams.get('search') || '';

      const data = db.complianceOrganizationList.findMany(
        {
          where: {
            name: {
              contains: search,
            },
          },
          skip: (parseInt(page) - 1) * parseInt(pageSize),
          take: parseInt(pageSize),
          orderBy: {
            createdDt: 'asc',
          },
        }
      );

      const totalRecord =
        db.complianceOrganizationList.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'success',
          data: data,
          currentRecord: data.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

const getComplianceSettingOrganizationMetaHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/meta/organization`,
    (req, res, ctx) => {
      const data =
        testData.compliance.setting.organization.metaOrg;
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'success',
          data: { ...data },
        })
      );
    }
  );

const createComplianceOrganizationSettingHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization`,
    async (req, res, ctx) => {
      const data = await req.json();
      _.map(data, (value) =>
        db.complianceOrganizationList.create({
          ObjectUUID: uid(),
          name: value.name,
          // orgGroup: [
          //   'หน่วยงานของรัฐรูปแบบใหม่',
          //   'หน่วยธุรการขององค์การของรัฐที่เป็นอิสระ',
          // ],
          // orgGroupID: ['x4q3c-4w7fc4', 'a4w3s-4q7kc4'],
          industryGroup: 'เทคโนโลยี',
          businessCategory:
            'เทคโนโลยีสารสนเทศและการสื่อสาร',
          description: 'etc.',
          createdDt: dayjs().format('DD MMM YYYY HH:mm'),
          createdBy: 'admin',
          updatedDt: '2023-03-23 10:00',
          updatedBy: 'admin',
        })
      );

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const deleteComplianceSettingOrganizationHandler =
  rest.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:orgId`,
    async (req, res, ctx) => {
      const orgId = req.params.orgId as string;

      const data = db.complianceOrganizationList.delete({
        where: {
          ObjectUUID: {
            equals: orgId,
          },
        },
      });

      if (!data)
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const getComplianceSettingOrganizationHandler = rest.get(
  `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId`,
  async (req, res, ctx) => {
    const organizationId = req.params
      .organizationId as string;

    const data = db.complianceOrganizationList.findFirst({
      where: {
        ObjectUUID: {
          equals: organizationId,
        },
      },
    });

    if (!data) {
      return res(
        ctx.delay(1000),
        ctx.status(404),
        ctx.json({
          data: organizationId,
          message: 'Not found!',
        })
      );
    }

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        data,
        code: 200,
        message: 'success',
      })
    );
  }
);

const updateComplianceSettingOrganizationHandler =
  rest.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId`,
    async (req, res, ctx) => {
      const organizationId = req.params
        .organizationId as string;
      const data = await req.json();
      const meta =
        testData.compliance.setting.organization.metaOrg;

      const industryGroupData = _.find(
        meta.industryGroup_and_businessCategory,
        {
          ObjectUUID: data.industryGroup,
        }
      );
      const businessCategoryData = _.find(
        industryGroupData?.children,
        {
          ObjectUUID: data.businessCategory,
        }
      );

      let resultObject;

      if (data.orgGroup.length === 1) {
        resultObject = [
          _.find(meta?.orgType, {
            ObjectUUID: data.orgGroup[0],
          })?.label,
        ];
      } else if (data.orgGroup.length === 2) {
        const topLevelObject = _.find(meta?.orgType, {
          ObjectUUID: data.orgGroup[0],
        });

        resultObject = [
          topLevelObject?.label,
          _.find(topLevelObject?.children, {
            ObjectUUID: data.orgGroup[1],
          })?.label,
        ];
      }

      const updatedData =
        db.complianceOrganizationList.update({
          where: {
            ObjectUUID: {
              equals: organizationId,
            },
          },
          data: {
            ...data,
            industryGroupID:
              industryGroupData?.ObjectUUID,
            industryGroup: industryGroupData?.label,
            businessCategory: businessCategoryData?.label,
            businessCategoryID:
              businessCategoryData?.ObjectUUID,
            description: data.description,
            orgGroup: resultObject,
            orgGroupID: data.orgGroup,
          },
        });

      if (!updatedData) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Not found!' })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(updatedData)
      );
    }
  );

const listComplianceSettingOrganizationContactHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/contact`,
    async (req, res, ctx) => {
      const page =
        req.url.searchParams.get('page') || '1';
      const pageSize =
        req.url.searchParams.get('pageSize') || '10';

      const data =
        db.complianceOrganizationContact.findMany({
          skip: (parseInt(page) - 1) * parseInt(pageSize),
          take: parseInt(pageSize),
          orderBy: {
            createdDt: 'desc',
          },
        });

      const totalRecord =
        db.complianceOrganizationContact.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'success',
          data,
          currentRecord: data.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

const getComplianceSettingOrganizationContactHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/contact/:contactId`,
    async (req, res, ctx) => {
      const contactId = req.params.contactId as string;

      const data =
        db.complianceOrganizationContact.findFirst({
          where: {
            ObjectUUID: {
              equals: contactId,
            },
          },
        });

      if (!data) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Not found!' })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          data,
          code: 200,
          message: 'success',
        })
      );
    }
  );

const createComplianceSettingOrganizationContactHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/contact`,
    async (req, res, ctx) => {
      const data = await req.json();

      const createdDt = new Date().toISOString();
      const createdBy = 'John';
      const updatedDt = new Date().toISOString();
      const updatedBy = 'John';

      const newData =
        db.complianceOrganizationContact.create({
          ...data,
          createdDt,
          createdBy,
          updatedBy,
          updatedDt,
        });

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json(newData)
      );
    }
  );

const updateComplianceSettingOrganizationContactHandler =
  rest.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/contact/:contactId`,
    async (req, res, ctx) => {
      const contactId = req.params.contactId as string;
      const data = await req.json();

      const updatedData =
        db.complianceOrganizationContact.update({
          where: {
            ObjectUUID: {
              equals: contactId,
            },
          },
          data: {
            ...data,
          },
        });

      if (!updatedData) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Not found!' })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(updatedData)
      );
    }
  );

const deleteComplianceSettingOrganizationContactHandler =
  rest.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/contact/:contactId`,
    async (req, res, ctx) => {
      const contactId = req.params.contactId as string;

      const data =
        db.complianceOrganizationContact.delete({
          where: {
            ObjectUUID: {
              equals: contactId,
            },
          },
        });

      if (!data)
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const listComplianceSettingOrganizationInstituteHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch`,
    async (req, res, ctx) => {
      const page =
        req.url.searchParams.get('page') || '1';
      const pageSize =
        req.url.searchParams.get('pageSize') || '10';

      const data =
        db.complianceOrganizationInstitute.findMany({
          skip: (parseInt(page) - 1) * parseInt(pageSize),
          take: parseInt(pageSize),
          orderBy: {
            createdDt: 'desc',
          },
        });

      const totalRecord =
        db.complianceOrganizationInstitute.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'success',
          data,
          currentRecord: data.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

const getComplianceSettingOrganizationInstituteHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId`,
    async (req, res, ctx) => {
      const instituteId = req.params
        .instituteId as string;

      const data =
        db.complianceOrganizationInstitute.findFirst({
          where: {
            ObjectUUID: {
              equals: instituteId,
            },
          },
        });
      if (!data) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Not found!' })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          data: {
            ...data,
            province: 10,
            district: 1001,
          },
          code: 200,
          message: 'success',
        })
      );
    }
  );

const createComplianceSettingOrganizationInstituteHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch`,
    async (req, res, ctx) => {
      const data = await req.json();

      const createdDt = new Date().toISOString();
      const createdBy = 'John';
      const updatedDt = new Date().toISOString();
      const updatedBy = 'John';

      const newData =
        db.complianceOrganizationInstitute.create({
          ...data,
          createdDt,
          createdBy,
          updatedBy,
          updatedDt,
        });

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json(newData)
      );
    }
  );

const updateComplianceSettingOrganizationInstituteHandler =
  rest.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId`,
    async (req, res, ctx) => {
      const instituteId = req.params
        .instituteId as string;
      const data = await req.json();

      const updatedData =
        db.complianceOrganizationInstitute.update({
          where: {
            ObjectUUID: {
              equals: instituteId,
            },
          },
          data: {
            ...data,
          },
        });

      if (!updatedData) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Not found!' })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(updatedData)
      );
    }
  );

const deleteComplianceSettingOrganizationInstituteHandler =
  rest.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId`,
    async (req, res, ctx) => {
      const instituteId = req.params
        .instituteId as string;

      const data =
        db.complianceOrganizationInstitute.delete({
          where: {
            ObjectUUID: {
              equals: instituteId,
            },
          },
        });

      if (!data)
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const listComplianceSettingOrganizationInstituteListRespondentsHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/respondent`,
    async (req, res, ctx) => {
      const page =
        req.url.searchParams.get('page') || '1';
      const pageSize =
        req.url.searchParams.get('pageSize') || '10';

      const data =
        db.complianceOrganizationInstituteRespondent.findMany(
          {
            skip:
              (parseInt(page) - 1) * parseInt(pageSize),
            take: parseInt(pageSize),
            orderBy: {
              createdDt: 'desc',
            },
          }
        );

      const totalRecord =
        db.complianceOrganizationInstituteRespondent.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'success',
          data,
          currentRecord: data.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

const getComplianceSettingOrganizationInstituteListRespondentsHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/respondent/:respondentId`,
    async (req, res, ctx) => {
      const respondentId = req.params
        .respondentId as string;

      const data =
        db.complianceOrganizationInstituteRespondent.findFirst(
          {
            where: {
              ObjectUUID: {
                equals: respondentId,
              },
            },
          }
        );

      if (!data) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Not found!' })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          data,
          code: 200,
          message: 'success',
        })
      );
    }
  );

const createComplianceSettingOrganizationInstituteListRespondentsHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/respondent`,
    async (req, res, ctx) => {
      const data = await req.json();

      const createdDt = new Date().toISOString();
      const createdBy = 'John';
      const updatedDt = new Date().toISOString();
      const updatedBy = 'John';

      const newData =
        db.complianceOrganizationInstituteRespondent.create(
          {
            ...data,
            createdDt,
            createdBy,
            updatedBy,
            updatedDt,
          }
        );

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json(newData)
      );
    }
  );

const updateComplianceSettingOrganizationInstituteListRespondentsHandler =
  rest.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/respondent/:respondentId`,
    async (req, res, ctx) => {
      const respondentId = req.params
        .respondentId as string;
      const data = await req.json();

      const updatedData =
        db.complianceOrganizationInstituteRespondent.update(
          {
            where: {
              ObjectUUID: {
                equals: respondentId,
              },
            },
            data: {
              ...data,
            },
          }
        );

      if (!updatedData) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Not found!' })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(updatedData)
      );
    }
  );

const deleteComplianceSettingOrganizationInstituteListRespondentsHandler =
  rest.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/respondent/:respondentId`,
    async (req, res, ctx) => {
      const respondentId = req.params
        .respondentId as string;

      const data =
        db.complianceOrganizationInstituteRespondent.delete(
          {
            where: {
              ObjectUUID: {
                equals: respondentId,
              },
            },
          }
        );

      if (!data)
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const listComplianceSettingOrganizationInstituteAssessmentApproverHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/approver`,
    async (req, res, ctx) => {
      const page =
        req.url.searchParams.get('page') || '1';
      const pageSize =
        req.url.searchParams.get('pageSize') || '10';

      const data =
        db.complianceOrganizationInstituteApprover.findMany(
          {
            skip:
              (parseInt(page) - 1) * parseInt(pageSize),
            take: parseInt(pageSize),
            orderBy: {
              createdDt: 'desc',
            },
          }
        );

      const totalRecord =
        db.complianceOrganizationInstituteApprover.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'success',
          data,
          currentRecord: data.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

const getComplianceSettingOrganizationInstituteAssessmentApproverHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/approver/:approverId`,
    async (req, res, ctx) => {
      const approverId = req.params.approverId as string;

      const data =
        db.complianceOrganizationInstituteApprover.findFirst(
          {
            where: {
              ObjectUUID: {
                equals: approverId,
              },
            },
          }
        );

      if (!data) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Not found!' })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          data,
          code: 200,
          message: 'success',
        })
      );
    }
  );

const createComplianceSettingOrganizationInstituteAssessmentApproverHandler =
  rest.post(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/approver`,
    async (req, res, ctx) => {
      const data = await req.json();

      const createdDt = new Date().toISOString();
      const createdBy = 'John';
      const updatedDt = new Date().toISOString();
      const updatedBy = 'John';

      const newData =
        db.complianceOrganizationInstituteApprover.create(
          {
            ...data,
            createdDt,
            createdBy,
            updatedBy,
            updatedDt,
          }
        );

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json(newData)
      );
    }
  );

const updateComplianceSettingOrganizationInstituteAssessmentApproverHandler =
  rest.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/approver/:approverId`,
    async (req, res, ctx) => {
      const approverId = req.params.approverId as string;
      const data = await req.json();

      const updatedData =
        db.complianceOrganizationInstituteApprover.update(
          {
            where: {
              ObjectUUID: {
                equals: approverId,
              },
            },
            data: {
              ...data,
            },
          }
        );

      if (!updatedData) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Not found!' })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(updatedData)
      );
    }
  );

const deleteComplianceSettingOrganizationInstituteAssessmentApproverHandler =
  rest.delete(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/approver/:approverId`,
    async (req, res, ctx) => {
      const approverId = req.params.approverId as string;

      const data =
        db.complianceOrganizationInstituteApprover.delete(
          {
            where: {
              ObjectUUID: {
                equals: approverId,
              },
            },
          }
        );

      if (!data)
        return res(
          ctx.status(404),
          ctx.delay(3000),
          ctx.json({
            code: 404,
            message: 'Not Found',
          })
        );

      return res(
        ctx.status(200),
        ctx.delay(3000),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const listComplianceSettingOrganizationInstituteAssessmentApproverRespondentHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/approver/:approverId/respondent`,
    async (req, res, ctx) => {
      const approverId = req.params.approverId as string;

      const data =
        db.complianceOrganizationInstituteApprover.findFirst(
          {
            where: {
              ObjectUUID: {
                equals: approverId,
              },
            },
          }
        );

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'success',
          data: data?.respondent,
          currentPage: 1,
          totalPage: data?.respondent.length,
          currentRecord: data?.respondent.length,
          totalRecord: data?.respondent.length,
        })
      );
    }
  );

const updateComplianceSettingOrganizationInstituteAssessmentApproverRespondentHandler =
  rest.put(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/approver/:approverId/respondent`,
    async (req, res, ctx) => {
      const approverId = req.params.approverId as string;
      const data = await req.json();
      const updatedData =
        db.complianceOrganizationInstituteApprover.update(
          {
            where: {
              ObjectUUID: {
                equals: approverId,
              },
            },
            data: {
              respondent: data,
            },
          }
        );

      if (!updatedData) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Not found!' })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'success',
        })
      );
    }
  );

const listComplianceSettingOrganizationInstituteAssessmentListAssignedHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/assignment`,
    async (req, res, ctx) => {
      const page =
        req.url.searchParams.get('page') || '1';
      const pageSize =
        req.url.searchParams.get('pageSize') || '10';

      const data =
        db.complianceOrganizationInstituteAssignment.findMany(
          {
            skip:
              (parseInt(page) - 1) * parseInt(pageSize),
            take: parseInt(pageSize),
            orderBy: {
              assignmentDt: 'desc',
            },
          }
        );

      const totalRecord =
        db.complianceOrganizationInstituteAssignment.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'success',
          data,
          currentRecord: data.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

const getComplianceSettingOrganizationInstituteAssessmentListAssignedHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/assignment/:assignmentId`,
    async (req, res, ctx) => {
      const assignmentId = req.params
        .assignmentId as string;

      const data =
        db.complianceOrganizationInstituteAssignment.findFirst(
          {
            where: {
              ObjectUUID: {
                equals: assignmentId,
              },
            },
          }
        );

      if (!data) {
        return res(
          ctx.delay(1000),
          ctx.status(404),
          ctx.json({ message: 'Not found!' })
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          data,
          code: 200,
          message: 'success',
        })
      );
    }
  );

const listComplianceSettingOrganizationInstituteAssessmentListAssignedListAssessorsHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/assignment/:assignmentId/respondent`,
    async (req, res, ctx) => {
      const page =
        req.url.searchParams.get('page') || '1';
      const pageSize =
        req.url.searchParams.get('pageSize') || '10';

      const data =
        db.complianceOrganizationInstituteAssignmentRespondent.findMany(
          {
            skip:
              (parseInt(page) - 1) * parseInt(pageSize),
            take: parseInt(pageSize),
            orderBy: {
              assignmentDt: 'desc',
            },
          }
        );

      const totalRecord =
        db.complianceOrganizationInstituteAssignmentRespondent.count();
      const totalPage =
        totalRecord > parseInt(pageSize)
          ? Math.floor(totalRecord / parseInt(pageSize))
          : 1;

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'success',
          data,
          currentRecord: data.length,
          totalRecord,
          currentPage: parseInt(page),
          totalPage,
        })
      );
    }
  );

const listComplianceSettingOrganizationInstituteAssessmentListAssignedGrowthOverviewHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/assignment/:assignmentId/growth/overview`,
    async (req, res, ctx) => {
      const data =
        db.complianceOrganizationInstituteAssignmentGrowth.getAll();

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'success',
          data: _.get(data, '[0]') ?? {},
          currentPage: 1,
          totalPage: data.length,
          currentRecord: data.length,
          totalRecord: data.length,
        })
      );
    }
  );

const listComplianceSettingOrganizationInstituteAssessmentListAssignedGrowthSectionHandler =
  rest.get(
    `${API_ENDPOINT_COMPLIANCE_BASE_URL}/setting/organization/:organizationId/branch/:instituteId/assignment/:assignmentId/growth/section`,
    async (req, res, ctx) => {
      const data =
        db.complianceOrganizationInstituteAssignmentGrowth.getAll();

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'success',
          data: _.get(data, '[0]') ?? {},
          currentPage: 1,
          totalPage: data.length,
          currentRecord: data.length,
          totalRecord: data.length,
        })
      );
    }
  );

export const complianceSettingOrganizationHandlers = [
  getComplianceSettingOrganizationListHandler,
  getComplianceSettingOrganizationMetaHandler,
  createComplianceOrganizationSettingHandler,
  deleteComplianceSettingOrganizationHandler,
  getComplianceSettingOrganizationHandler,
  updateComplianceSettingOrganizationHandler,
  listComplianceSettingOrganizationContactHandler,
  getComplianceSettingOrganizationContactHandler,
  createComplianceSettingOrganizationContactHandler,
  updateComplianceSettingOrganizationContactHandler,
  deleteComplianceSettingOrganizationContactHandler,
  listComplianceSettingOrganizationInstituteHandler,
  getComplianceSettingOrganizationInstituteHandler,
  createComplianceSettingOrganizationInstituteHandler,
  updateComplianceSettingOrganizationInstituteHandler,
  deleteComplianceSettingOrganizationInstituteHandler,
  listComplianceSettingOrganizationInstituteListRespondentsHandler,
  getComplianceSettingOrganizationInstituteListRespondentsHandler,
  createComplianceSettingOrganizationInstituteListRespondentsHandler,
  updateComplianceSettingOrganizationInstituteListRespondentsHandler,
  deleteComplianceSettingOrganizationInstituteListRespondentsHandler,
  listComplianceSettingOrganizationInstituteAssessmentApproverHandler,
  getComplianceSettingOrganizationInstituteAssessmentApproverHandler,
  createComplianceSettingOrganizationInstituteAssessmentApproverHandler,
  updateComplianceSettingOrganizationInstituteAssessmentApproverHandler,
  deleteComplianceSettingOrganizationInstituteAssessmentApproverHandler,
  listComplianceSettingOrganizationInstituteAssessmentApproverRespondentHandler,
  updateComplianceSettingOrganizationInstituteAssessmentApproverRespondentHandler,
  listComplianceSettingOrganizationInstituteAssessmentListAssignedHandler,
  getComplianceSettingOrganizationInstituteAssessmentListAssignedHandler,
  listComplianceSettingOrganizationInstituteAssessmentListAssignedListAssessorsHandler,
  listComplianceSettingOrganizationInstituteAssessmentListAssignedGrowthOverviewHandler,
  listComplianceSettingOrganizationInstituteAssessmentListAssignedGrowthSectionHandler,
];
