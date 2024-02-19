import {
  DownloadOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Table,
  Timeline,
  Typography,
  Upload,
  message,
} from 'antd';
import { RcFile } from 'antd/lib/upload';
import { useState } from 'react';

import { Modal } from '@/components/share-components/modal';
import { useCsv } from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import validation from '@/utils/validation';

import { useCreateOrganizationUnitListRespondents } from '../../api/create-organization-unit-list-respondents';
import { OrganizationUnitRespondentCreate } from '../../types';

type OrganizationBasicInfoUnitListRespondentsListImportModalProps =
  {
    organizationId: string;
    instituteId: string;
    open: boolean;
    onCancel: () => void;
  };

export const OrganizationBasicInfoUnitListRespondentsListImportModal =
  ({
    organizationId,
    instituteId,
    open,
    onCancel,
  }: OrganizationBasicInfoUnitListRespondentsListImportModalProps) => {
    const [form] = Form.useForm();
    const { showNotification } = useNotifications();

    const [datafile, setDataFile] = useState<
      OrganizationUnitRespondentCreate[]
    >([]);

    const csvFile = useCsv({
      data: datafile,
      columns: [],
      fileName: 'respondents',
    });

    const { submit, isLoading } =
      useCreateOrganizationUnitListRespondents({
        organizationId,
        instituteId,
        onSuccess: () => {
          showNotification({
            type: 'success',
            message: 'Save successfully',
          });
          onCancel();
        },
      });

    const onSubmit = () => {
      form.validateFields();
      submit(datafile);
    };

    const beforeUpload = async (file: RcFile) => {
      const isCSV = file.type === 'text/csv';
      if (!isCSV) {
        message.error('You can only upload CSV files!');
        return;
      }

      const data =
        await csvFile.covertCsvToObject<OrganizationUnitRespondentCreate>(
          file
        );
      setDataFile(data);

      return false;
    };

    const columns = [
      {
        title: 'ผู้ตอบแบบประเมิน',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'องค์กร',
        dataIndex: 'organizationName',
        key: 'organizationName',
      },
      {
        title: 'แผนก',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: 'ตำแหน่ง',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: 'อีเมลสำหรับใช้ตอบกลับแบบประเมิน',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'เบอร์ติดต่อ',
        dataIndex: 'tel',
        key: 'tel',
      },
    ];

    const dataSource = [
      {
        name: 'นายนพรัตน์ คำทิพย์',
        organizationName:
          'บริษัท ซีเคียวริตี้ พิทช์ จำกัด',
        department: 'ผู้บริหาร',
        position: 'ผู้บริหารระดับสูง',
        email: 'Nopparat.k@gmail.com',
        tel: '098-888-8888',
      },
    ];

    return (
      <Modal
        title="นำเข้าข้อมูล"
        open={open}
        width={1000}
        onCancel={onCancel}
        onOk={form.submit}
        okButtonProps={{
          loading: isLoading,
        }}
      >
        <Timeline>
          <Timeline.Item color="blue">
            <Typography.Title level={4}>
              1. ดาวน์โหลดเทมเพลตไฟล์ CSV
              เพื่อนำเข้าข้อมูล
            </Typography.Title>
            <Button>
              <DownloadOutlined /> ดาวน์โหลดเทมเพลต CSV
            </Button>
            <Divider />
          </Timeline.Item>
          <Timeline.Item color="orange">
            <Typography.Title level={4}>
              2. ตัวอย่างข้อมูล
            </Typography.Title>
            <Table
              dataSource={dataSource}
              columns={columns}
              bordered={true}
              pagination={false}
              rowKey="name"
            />
            <Divider />
          </Timeline.Item>
          <Timeline.Item color="green">
            <Typography.Title level={4}>
              3. อัพโหลดไฟล์ CSV เพื่อนำเข้าข้อมูล
            </Typography.Title>
            <Form onFinish={onSubmit} form={form}>
              <Form.Item
                name={'csv'}
                rules={[validation.required('File CSV')]}
              >
                <Upload beforeUpload={beforeUpload}>
                  <Button>
                    <PaperClipOutlined /> แนบไฟล์
                  </Button>
                </Upload>
              </Form.Item>
            </Form>
          </Timeline.Item>
        </Timeline>
      </Modal>
    );
  };
