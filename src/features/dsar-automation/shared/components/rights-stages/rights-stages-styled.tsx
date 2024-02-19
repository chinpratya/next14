import styled from '@emotion/styled';
import { Steps } from 'antd';

export const RightsStagesStyled = styled(Steps)`
  .ant-steps-item-active {
    .rights-stage-item__name,
    .rights-stage-item__action > .anticon {
      color: #3e79f7 !important;
    }

    .ant-steps-icon {
      color: #fff !important;
    }
  }

  .ant-steps-item-container:hover {
    .rights-stage-item__name,
    .rights-stage-item__action > .anticon {
      color: #3e79f7 !important;
    }

    .ant-steps-item-icon {
      border-color: #3e79f7 !important;
      color: #3e79f7 !important;
    }

    .ant-steps-icon {
      color: #3e79f7;
    }
  }

  .ant-steps-item {
    .ant-steps-item-title {
      width: 100%;
    }
  }
`;
