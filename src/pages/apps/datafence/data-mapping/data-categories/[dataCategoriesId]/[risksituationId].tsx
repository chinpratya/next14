import {
  BulbOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Button,
  Card,
  Form,
  Input,
  Radio,
  Tooltip,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DataCategoriesRiskAssessmentInfo,
  DataCategoriesRiskAssessmentRelatedInfo,
  useGetDataCategoriesAssessment,
  useUpdateDataCategoriesAssessment,
  DataCategoriesModalRiskAssessmentAdvice,
} from '@/features/data-mapping';
import { PermissionWrapper } from '@/features/shared';
import { useToggle } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions } from '@/permissions';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';
import { Flex } from '@components/flex';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import { TableScore } from '@components/table-score';
import { TableSelection } from '@components/table-selection';
import { IntlMessage } from '@utilComponents/intl-message';

const columnsRiskLevel = [
  {
    title: 'ระดับ',
    dataIndex: 'level',
    width: 50,
  },
  {
    title: 'โอกาสที่จะเกิด',
    dataIndex: 'title',
    width: 100,
  },
  {
    title: 'คำอธิบาย',
    dataIndex: 'description',
    width: 100,
  },
];

const dataSourceRiskLavel = [
  {
    level: 5,
    title: 'เกือบจะแน่นอน (Almost)',
    description:
      'เกือบแน่นอนว่าจะเกิดขึ้น เกิดขึ้นเป็นประจำหรือมีเหตุอันควรเชื่อได้ว่าใกล้จะเกิดขึ้นแล้ว',
  },
  {
    level: 4,
    title: 'น่าจะ (Likely)',
    description:
      'เป็นไปได้มากว่าจะเกิดขึ้น เป็นความเสี่ยงที่ไม่ได้เกิดขึ้นบ่อยครั้งในอดีตหรือในสภาพปัจจุบัน',
  },
  {
    level: 3,
    title: 'เป็นไปได้ (Possible)',
    description:
      'เป็นไปได้ว่าจะเกิดขึ้น มีแนวโน้มที่จะเกิดขึ้นได้',
  },
  {
    level: 2,
    title: 'ไม่น่าจะ (Umlikely)',
    description:
      'เกิดขึ้นได้เป็นครั้งคราว มีความเป็นไปได้ที่จะเกิดขึ้น แต่อาจจะไม่เกิดขึ้น',
  },
  {
    level: 1,
    title: 'ไม่ค่อย (Rare)',
    description:
      'เกิดขึ้นได้ยาก ไม่เคยเกิดขึ้นมาก่อน และไม่มีเหตุผลให้เชื่อว่าจะเกิดขึ้น',
  },
];

const columnsEffect = [
  {
    title: 'ระดับ',
    dataIndex: 'level',
    width: 50,
  },
  {
    title: 'โอกาสที่จะเกิด',
    dataIndex: 'title',
    width: 100,
  },
  {
    title:
      'ผลกระทบที่อาจก่อให้เกิดความเสียหายต่อสิทธิ และเสรีภาพของบุคคลอื่น',
    dataIndex: 'effects_to_people',
    width: 100,
  },
  {
    title: 'ผลกระทบด้านทางด้านกฎหมาย',
    dataIndex: 'legal_impact',
    width: 100,
  },
];

const dataSourceEffect = [
  {
    level: 5,
    title: 'สูงมาก/รุนแรง (Severe)',
    effects_to_people:
      'มีผลกระทบที่อาจก่อให้เกิดความเสียหายต่อสิทธิ และเสรีภาพของบุคคลอื่นหากมีเหตุละเมิด',
    legal_impact: 'ชื่อเสียงถูกทำลายเป็นการถาวร',
  },
  {
    level: 4,
    title: 'สูง/สำคัญ (Major)',
    effects_to_people:
      'มีผลกระทบที่อาจก่อให้เกิดความเสียหายต่อสิทธิของเจ้าของข้อมูลหากเกิดข้อมูลรั่วไหล',
    legal_impact:
      'รุนแรง สร้างความเสียหายต่อชื่อเสียงชั่วคราว',
  },
  {
    level: 3,
    title: 'ปานกลาง (Moderate)',
    effects_to_people:
      'มีผลกระทบสิทธิของเจ้าของข้อมูลบางประการ สามารถแก้ไขได้ แต่ไม่ทันที ต้องใช้เวลาในการแก้ไข',
    legal_impact: 'สร้างความเสียหายต่อชื่อเสียงพอสมควร',
  },
  {
    level: 2,
    title: 'น้อย/สำคัญน้อย (Minor)',
    effects_to_people:
      'มีผลกระทบสิทธิของเจ้าของข้อมูลเล็กน้อยที่สามารถแก้ไขได้ในทันทีที่รับแจ้ง',
    legal_impact: 'สร้างความเสียหายต่อชื่อเสียงเล็กน้อย',
  },
  {
    level: 1,
    title: 'น้อยมาก/ไม่สำคัญ (Negligible)',
    effects_to_people:
      'แทบไม่มีผลกระทบใด ๆ ต่อสิทธิของเจ้าของข้อมูล',
    legal_impact: 'ไม่มีผลกระทบ',
  },
];

export const RiskSituationDetailPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [form] = Form.useForm();
  const { showNotification } = useNotifications();
  const toggle = useToggle();

  const dataCategoriesId = router.query
    .dataCategoriesId as string;
  const assessmentId = router.query
    .risksituationId as string;
  const { data, isLoading } =
    useGetDataCategoriesAssessment({
      dataCategoriesId,
      assessmentId,
    });

  const updateAssessment =
    useUpdateDataCategoriesAssessment({
      dataCategoriesId,
      assessmentId,
      onSuccess: () => {
        showNotification({
          type: 'success',
          message: t(
            'dataMapping.notification.dataCategories.riskAssessment.update'
          ) as string,
        });
      },
    });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        effectLavel:
          !data.effectLavel || data.effectLavel === 0
            ? undefined
            : data.effectLavel,
        riskLavel:
          !data.riskLavel || data.riskLavel === 0
            ? undefined
            : data.riskLavel,
        isAssessment:
          !data.isAssessment || data.isAssessment === ''
            ? undefined
            : data.isAssessment,
      });
    }
  }, [data, form]);

  const onSubmit = async () => {
    await form.validateFields();
    const value = form.getFieldsValue();
    updateAssessment.submit(value);
  };

  if (isLoading) {
    return <Loading cover={'content'} />;
  }
  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="dataMapping.dataCategories.detail.title" />
        }
        onBack={() => router.back()}
        extra={
          <PermissionWrapper
            moduleName={'datamap'}
            policies={[
              permissions[
                'pdpakit:datamap:categories:update'
              ],
            ]}
          >
            <Button
              type="primary"
              loading={updateAssessment.isLoading}
              onClick={onSubmit}
            >
              <IntlMessage id="dataMapping.dataCategories.detail.save" />
            </Button>
          </PermissionWrapper>
        }
      />
      <Card
        title={<IntlMessage id="dataMapping.basicInfo" />}
        extra={
          <Button
            type={'link'}
            onClick={() => toggle.preview()}
          >
            <BulbOutlined />
            <IntlMessage id="dataMapping.dataCategories.detail.advice" />
          </Button>
        }
      >
        <DataCategoriesRiskAssessmentInfo
          assessmentName={data?.assessmentName ?? ''}
          datasubject={data?.datasubject ?? ''}
          datasubjectGroup={data?.datasubjectGroup ?? []}
          policy={data?.policy ?? ''}
          categoryName={data?.categoryName ?? ''}
        />
        <DataCategoriesRiskAssessmentRelatedInfo
          data={data?.dataElement ?? []}
        />
        <Form form={form}>
          <Form.Item
            name="riskLavel"
            rules={[
              validation.required(
                'กรุณาเลือกโอกาสที่จะเกิดความเสี่ยง'
              ),
            ]}
          >
            <TableSelection
              columns={columnsRiskLevel}
              dataSource={dataSourceRiskLavel}
              title={
                <div
                  className={css`
                    display: flex;
                    flex-direction: row;
                    height: 20px;

                    .required {
                      color: red;
                      margin-right: 5px;
                    }
                  `}
                >
                  <p className="required">*</p>
                  <Typography.Title
                    level={4}
                    style={{ fontWeight: 'bold' }}
                  >
                    <IntlMessage id="dataMapping.dataCategories.riskAssessment.risk" />
                  </Typography.Title>
                </div>
              }
            />
          </Form.Item>
          <Card
            title={
              <Flex>
                <Typography.Text>
                  <IntlMessage id="dataMapping.dataCategories.riskAssessment.causesRisk" />
                </Typography.Text>
                <Tooltip
                  title={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `อธิบายเหตุผลในการในคะแนนความเป็นไปได้ของโอกาสที่จะเกิดความเสี่ยง เช่น <br>
1 . ปัจจุบันยังไม่มีการละเมิด <br>
2. เคยพบการเปลี่ยนแปลงข้อมูลที่คล้ายกัน <br>
3. เคยพบการเปลี่ยนแปลงข้อมูลที่คล้ายกัน <br>
4. ขึ้นอยู่กับการกำหนดค่าที่ถูกต้อง ซึ่งอาจมีความซับซ้อน`,
                      }}
                    />
                  }
                >
                  <QuestionCircleOutlined className="mt-1 mx-1 cursor-pointer" />
                </Tooltip>
              </Flex>
            }
            className={css`
              .ant-card-head {
                border-bottom: 1px solid #e8e8e8 !important;
                margin-bottom: 1px;

                .ant-card-head-title {
                  padding: 16px;
                }
              }

              .ant-card-body {
                padding: 0;

                textarea {
                  height: 100px;
                  border: 0;
                  border-radius: 0;
                }
              }
            `}
          >
            <Form.Item name="causesOfRisk">
              <Input.TextArea rows={5} />
            </Form.Item>
          </Card>
          <Form.Item
            name="effectLavel"
            rules={[
              validation.required('กรุณาเลือกผลกระทบ'),
            ]}
          >
            <TableSelection
              columns={columnsEffect}
              dataSource={dataSourceEffect}
              title={
                <div
                  className={css`
                    display: flex;
                    flex-direction: row;
                    height: 20px;

                    .required {
                      color: red;
                      margin-right: 5px;
                    }
                  `}
                >
                  <p className="required">*</p>
                  <Typography.Title
                    level={4}
                    style={{ fontWeight: 'bold' }}
                  >
                    <IntlMessage id="dataMapping.dataCategories.riskAssessment.effect" />
                  </Typography.Title>
                </div>
              }
            />
          </Form.Item>
          <Card
            title={
              <Flex>
                <Typography.Text>
                  <IntlMessage id="dataMapping.dataCategories.riskAssessment.causesEffect" />
                </Typography.Text>
                <Tooltip
                  title={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `อธิบายเหตุผลในการให้คะแนนต่อการเกิดผลกระทบ เช่น<br>
1. โดยทั่วไปแล้วเป็นข้อมูลที่เปิดเผยแก่สาธารณะ<br>
2. อาจส่งผลกระทบด้านภาษีของข้าราชการกรม<br>
3. การล่วงล้ำความเป็นส่วนตัวของข้าราชการกรม<br>
4. อาจส่งผลให้มีการจ่ายเงินเดือนผิดบัญชี`,
                      }}
                    />
                  }
                >
                  <QuestionCircleOutlined className="mt-1 mx-1 cursor-pointer" />
                </Tooltip>
              </Flex>
            }
            className={css`
              .ant-card-head {
                border-bottom: 1px solid #e8e8e8 !important;
                margin-bottom: 1px;

                .ant-card-head-title {
                  padding: 16px;
                }
              }

              .ant-card-body {
                padding: 0;

                textarea {
                  height: 100px;
                  border: 0;
                  border-radius: 0;
                }
              }
            `}
          >
            <Form.Item name="causesOfEffect">
              <Input.TextArea rows={5} />
            </Form.Item>
          </Card>
          <Card
            title={
              <IntlMessage id="dataMapping.dataCategories.riskAssessment.riskLevel" />
            }
          >
            <Form.Item
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.effectLavel ||
                prevValues.riskLavel !==
                  currentValues.effectLavel ||
                prevValues.riskLavel
              }
              noStyle
            >
              {({ getFieldValue }) => {
                const effectLavel =
                  getFieldValue('effectLavel');
                const riskLavel =
                  getFieldValue('riskLavel');
                const rangeScore = [
                  {
                    key: 'high',
                    text: 'สูง',
                    range: [16, 20, 25],
                    color: '#EB3223',
                  },
                  {
                    key: 'quite_high',
                    text: 'ค่อนสูง',
                    range: [13, 14, 15],
                    color: '#F1963F',
                  },
                  {
                    key: 'medium',
                    text: 'ปานกลาง',
                    range: [8, 9, 10, 11, 12],
                    color: '#FADA4A',
                  },
                  {
                    key: 'relatively_low',
                    text: 'ปานกลาง',
                    range: [4, 5, 6, 7],
                    color: '#97C254',
                  },
                  {
                    key: 'low',
                    text: 'ต่ำ',
                    range: [1, 2, 3],
                    color: '#60B257',
                  },
                ];

                const target = {
                  x:
                    !riskLavel || riskLavel === 0
                      ? null
                      : riskLavel,
                  y:
                    !effectLavel || effectLavel === 0
                      ? null
                      : effectLavel,
                  text: 'ก่อนจัดการความเสี่ยง',
                  color: '#5008C9',
                };
                return (
                  <TableScore
                    rangeScore={rangeScore}
                    target={target}
                  />
                );
              }}
            </Form.Item>
          </Card>
          <Card
            title={
              <div
                className={css`
                  display: flex;
                  flex-direction: row;
                  height: 20px;

                  .required {
                    color: red;
                    margin-right: 5px;
                  }
                `}
              >
                <p className="required">*</p>
                <Typography.Title
                  level={4}
                  style={{ fontWeight: 'bold' }}
                >
                  <IntlMessage id="dataMapping.dataCategories.riskAssessment.riskOption" />
                </Typography.Title>
              </div>
            }
          >
            <Form.Item
              name="isAssessment"
              rules={[
                validation.required(
                  'กรุณาเลือกทางเลือกการจัดการความเสี่ยง'
                ),
              ]}
            >
              <Radio.Group
                options={[
                  {
                    label: 'ยอมรับ',
                    value: 'aception',
                  },
                  {
                    label: 'จัดการความเสี่ยง',
                    value: 'manageRisk',
                  },
                  {
                    label: 'ปรับเปลี่ยนวิธีการ',
                    value: 'changeMethod',
                  },
                  {
                    label: 'แบ่งบันความเสี่ยง',
                    value: 'shareRisk',
                  },
                ]}
              />
            </Form.Item>
          </Card>
          <Card
            title={
              <Flex>
                <Typography.Text>
                  <IntlMessage id="dataMapping.dataCategories.riskAssessment.riskPractice" />
                </Typography.Text>
                <Tooltip
                  title={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `อธิบายการดำเนินการเพื่อหลีกเหลี่ยง,แก้ไขหรือแบ่งปันความเสี่ยง
                      เช่น<br>
                      1.ให้ผู้เชี่ยวชาญจากภายนอกดำเนินการกำหนดค่าและทดสอบอย่างละเอียด<br>
                      2.เข้ารหัสด้วยลายนิ้วมือทั้งหมด<br>
                      3.ตั้งรหัสข้อมูลสุขภาพเพิ่มปัจจัยในการเข้าสู่ระบบจัดเก็บข้อมูลสุขภาพ`,
                      }}
                    />
                  }
                >
                  <QuestionCircleOutlined className="mt-1 mx-1 cursor-pointer" />
                </Tooltip>
              </Flex>
            }
            className={css`
              .ant-card-head {
                border-bottom: 1px solid #e8e8e8 !important;
                margin-bottom: 1px;

                .ant-card-head-title {
                  padding: 16px;
                }
              }

              .ant-card-body {
                padding: 0;

                textarea {
                  height: 100px;
                  border: 0;
                  border-radius: 0;
                }
              }
            `}
          >
            <Form.Item name="riskManagement">
              <Input.TextArea rows={5} />
            </Form.Item>
          </Card>
        </Form>
      </Card>
      <DataCategoriesModalRiskAssessmentAdvice
        open={toggle.openPreview}
        onClose={() => toggle.preview()}
      />
    </>
  );
};

RiskSituationDetailPage.getLayout = (
  page: React.ReactNode
) => <AppLayout>{page}</AppLayout>;

export default RiskSituationDetailPage;
