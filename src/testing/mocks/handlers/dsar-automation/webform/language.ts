import { rest } from 'msw';
import { v4 as uid } from 'uuid';

import { API_ENDPOINT_DSAR_AUTOMATION_BASE_URL } from '@/config/endpoint';

import { testData } from '../../../../test-data';
import { db } from '../../../db';

const getDsarAutomationWebformLanguageHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/form/language/:webformId/:languageId`,
  (req, res, ctx) => {
    const webformId = req.params.webformId as string;
    const languageId = req.params.languageId as string;

    const webformData =
      db.dsarAutomationWebform.findFirst({
        where: {
          webfromID: {
            equals: webformId,
          },
        },
      });

    if (!webformData) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'Not Found',
        })
      );
    }

    const language =
      db.dsarAutomationWebformLanguage.findFirst({
        where: {
          webfromID: {
            equals: webformId,
          },
          LanguageID: {
            equals: languageId,
          },
        },
      });

    if (!language) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'Not Found',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: {
          ...language,
          form: JSON.parse(language.form),
          webfromID: undefined,
          id: undefined,
        },
      })
    );
  }
);

const updateDsarAutomationWebformLanguageHandler =
  rest.put(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/form/language/:webformId/:languageId`,
    async (req, res, ctx) => {
      const webformId = req.params.webformId as string;
      const languageId = req.params.languageId as string;
      const requestBody = await req.json();

      const data = db.dsarAutomationWebform.findFirst({
        where: {
          webfromID: {
            equals: webformId,
          },
        },
      });

      if (!data) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            status: 404,
            statusCode: 404,
            message: 'Not Found',
          })
        );
      }

      db.dsarAutomationWebformLanguage.update({
        where: {
          webfromID: {
            equals: webformId,
          },
          LanguageID: {
            equals: languageId,
          },
        },
        data: {
          form: JSON.stringify(requestBody?.form),
        },
      });

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
        })
      );
    }
  );

const listDsarAutomationWebformLanguageHandler = rest.get(
  `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/language/:webformId`,
  (req, res, ctx) => {
    const webformId = req.params.webformId as string;

    const data = db.dsarAutomationWebform.findFirst({
      where: {
        webfromID: {
          equals: webformId,
        },
      },
    });

    if (!data) {
      return res(
        ctx.status(404),
        ctx.delay(1000),
        ctx.json({
          status: 404,
          statusCode: 404,
          message: 'Not Found',
        })
      );
    }

    const languages =
      db.dsarAutomationWebformLanguage.findMany({
        where: {
          webfromID: {
            equals: webformId,
          },
        },
      });

    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        status: 200,
        statusCode: 200,
        message: 'success',
        data: languages?.map((language) => ({
          ...language,
          form: undefined,
          id: undefined,
        })),
      })
    );
  }
);

const createDsarAutomationWebformLanguageHandler =
  rest.put(
    `${API_ENDPOINT_DSAR_AUTOMATION_BASE_URL}/webfrom/language/:webformId`,
    async (req, res, ctx) => {
      const webformId = req.params.webformId as string;
      const requestBody = await req.json();

      if (!requestBody.LanguageID) {
        return res(
          ctx.status(400),
          ctx.delay(1000),
          ctx.json({
            status: 400,
            statusCode: 400,
            message: 'LanguageID is required',
          })
        );
      }

      const data = db.dsarAutomationWebform.findFirst({
        where: {
          webfromID: {
            equals: webformId,
          },
        },
      });

      if (!data) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            status: 404,
            statusCode: 404,
            message: 'Not Found',
          })
        );
      }

      const language =
        testData?.dsarAutomation.webform.meta.Language.find(
          (language) =>
            language.ObjectUUID === requestBody.LanguageID
        );

      if (!language) {
        return res(
          ctx.status(404),
          ctx.delay(1000),
          ctx.json({
            status: 404,
            statusCode: 404,
            message: 'Not Found',
          })
        );
      }

      db.dsarAutomationWebformLanguage.create({
        id: uid(),
        webfromID: webformId,
        LanguageID: language.ObjectUUID,
        LanguageName: language.name,
        form: JSON.stringify(
          testData.dsarAutomation.webform.template
        ),
      });

      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          status: 200,
          statusCode: 200,
          message: 'success',
        })
      );
    }
  );

export const dsarAutomationWebformLanguageHandlers = [
  getDsarAutomationWebformLanguageHandler,
  updateDsarAutomationWebformLanguageHandler,
  listDsarAutomationWebformLanguageHandler,
  createDsarAutomationWebformLanguageHandler,
];
