import {
  AuditOutlined,
  // DashboardOutlined,
  // DotChartOutlined,
  FileDoneOutlined,
  SettingOutlined,
  // ShareAltOutlined,
} from '@ant-design/icons';

import {
  APP_PATH,
  DATAFENCE_PATH,
  DATAFENCE_DATA_MAPPING_MANAGEMENT_PATH,
} from '@/config/modules';
import { NavigationType } from '@/types';
import { GoalFilled } from '@utilComponents/icon';

const path = `${APP_PATH}${DATAFENCE_PATH}${DATAFENCE_DATA_MAPPING_MANAGEMENT_PATH}`;

export const dataMappingNavigation: NavigationType[] = [
  // {
  //   label: 'dataMapping.dashboard.title',
  //   key: `${path}/dashboard`,
  //   icon: <DashboardOutlined />,
  // },
  {
    label: 'dataMapping.activityProcessing.title',
    key: `${path}/activity-processing`,
    icon: <FileDoneOutlined />,
  },
  // {
  //   label: 'dataMapping.stream.title',
  //   key: `${path}/stream`,
  //   icon: <DotChartOutlined />,
  // },
  {
    label: 'dataMapping.dataLifecycle.title',
    key: `${path}/data-lifecycle`,
    icon: <FileDoneOutlined />,
  },
  // {
  //   label: 'dataMapping.crossBorder.title',
  //   key: `${path}/cross-border`,
  //   icon: <ShareAltOutlined />,
  // },
  {
    label: 'dataMapping.dataList.title',
    key: `${path}/data-list`,
    icon: <SettingOutlined />,
    children: [
      {
        label: 'dataMapping.dataSet.title',
        key: `${path}/data-set`,
      },
      {
        label: 'dataMapping.legalBase.title',
        key: `${path}/base-legal`,
      },
      // {
      //   label: 'dataMapping.devices.title',
      //   key: `${path}/devices`,
      // },
    ],
  },
  {
    label: 'dataMapping.purpose.title',
    key: `${path}/purpose`,
    icon: <GoalFilled />,
  },
  {
    label: 'dataMapping.setup.title',
    key: `${path}/setup`,
    icon: <SettingOutlined />,
    children: [
      {
        label: 'dataMapping.dataElement.title',
        key: `${path}/data-element`,
      },
      // {
      //   label: 'dataMapping.outsideOrganizations.title',
      //   key: `${path}/outside-organization`,
      // },
      {
        label: 'dataMapping.systemAndServices.title',
        key: `${path}/system-and-services`,
      },
      {
        label: 'dataMapping.internationalLaw.title',
        key: `${path}/international-law`,
      },
    ],
  },
  {
    label: 'dataMapping.controlMeasuresStorehouse.title',
    key: `${path}/control-measures-storehouse`,
    icon: <AuditOutlined />,
  },
];
