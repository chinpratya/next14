import {
  SendOutlined,
  SettingOutlined,
  DashboardOutlined,
  ApartmentOutlined,
  FolderOpenOutlined,
  ProjectOutlined,
  BgColorsOutlined,
  ClusterOutlined,
} from '@ant-design/icons';

import {
  APP_PATH,
  CYBERFENCE_PATH,
  CYBERFENCE_ASSESSMENT_AUTOMATION_PATH,
} from '@/config/modules';
import { NavigationType } from '@/types';

const path = `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_ASSESSMENT_AUTOMATION_PATH}`;

export const assessmentAutomationNavigation: NavigationType[] =
  [
    {
      key: `${path}/assessment-dashboard`,
      label: 'แดชบอร์ด',
      icon: <DashboardOutlined />,
    },
    {
      key: `${path}/assessment-submission`,
      label: 'รายการส่งแบบประเมิน',
      icon: <SendOutlined />,
    },
    {
      key: `${path}/setup`,
      label: 'ตั้งค่าเริ่มใช้งาน',
      icon: <SettingOutlined />,
      children: [
        {
          key: `${path}/organization`,
          label: 'องค์กร',
          icon: <ApartmentOutlined />,
        },
        {
          key: `${path}/department`,
          label: 'สาขาทั้งหมด',
          icon: <ClusterOutlined />,
        },
        {
          key: `${path}/maturity-model`,
          label: 'Maturity Model',
          icon: <ProjectOutlined />,
        },
        {
          key: `${path}/assessment-inventory`,
          label: 'คลังแบบประเมิน',
          icon: <FolderOpenOutlined />,
        },
        {
          key: `${path}/template`,
          label: 'เทมเพลต',
          icon: <BgColorsOutlined />,
        },
      ],
    },
  ];
