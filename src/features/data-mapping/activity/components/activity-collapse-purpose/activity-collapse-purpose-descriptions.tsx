import { Descriptions } from 'antd';

export const ActivityCollapsePurposeDescriptions = () => {
  const data = {
    legal_base: 'ฐานกฎหมาย (Contract)',
    data_categories: 'ข้อมูลสำหรับติดต่อสื่อสาร',
    data_element: 'ชื่อ นามสกุล อายุ ศาสนา',
    data_import_channels: 'ROP member',
    types_data_collected: 'อิเล็กทรอนิกส์',
    time_use_personal_information: '90 วัน',
    time_retention_personal_data: '90 วัน',
    storage_location: 'AWS',
    access_personal_data: '90 วัน',
    source_of_information: 'เจ้าของข้อมูล',
    delete_or_destroy_data: 'เจ้าของข้อมูล',
  };
  return (
    <>
      <Descriptions
        column={3}
        title="Purpose Detail"
        layout="vertical"
      >
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="ฐานกฎหมาย"
        >
          {data?.legal_base}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="Data Categories"
        >
          {data?.data_categories}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="Data Element"
        >
          {data?.data_element}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="ช่องทางการนำเข้าข้อมูล"
        >
          {data?.data_import_channels}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="ประเภทของข้อมูลที่จัดเก็บ"
        >
          {data?.types_data_collected}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="ระยะเวลาการใช้ช้อมูลส่วนบุคคล"
        >
          {data?.time_use_personal_information}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="ระยะเวลาการเก็บรักษาข้อมูลส่วนบุคคล"
        >
          {data?.time_retention_personal_data}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="สถานที่จัดเก็บข้อมูล"
        >
          {data?.storage_location}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="สิทธิและวิธีการเข้าถึงข้อมูลส่วนบุคคล"
        >
          {data?.access_personal_data}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="แหล่งที่ได้มาซึ่งข้อมูล"
        >
          {data?.source_of_information}
        </Descriptions.Item>
        <Descriptions.Item
          labelStyle={{
            fontWeight: 'bold',
          }}
          label="วิธีการลบหรือทำลายข้อมูลส่วนบุคคลเมื่อสิ้นสุดระยะเวลาจัดเก็บ"
        >
          {data?.delete_or_destroy_data}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
