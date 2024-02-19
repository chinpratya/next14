import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';
import _ from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  useConsentBuilderStore,
  ConsentFormSectionType,
} from '@/stores/consent-builder';

export const Header = () => {
  const { formItems, currentFormIndex, onAddSection } =
    useConsentBuilderStore();

  const sections = _.get(
    formItems,
    `[${currentFormIndex}].sections`,
    []
  );

  return (
    <>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMax={480}
      >
        {sections.length === 0 && (
          <Empty className="mb-4" description="" />
        )}
        {sections.map(
          (header: ConsentFormSectionType) => (
            <Button
              key={header.id}
              className="mb-2"
              block
              disabled
            >
              {header.name}
            </Button>
          )
        )}
      </Scrollbars>
      <Button
        icon={<PlusCircleOutlined />}
        block
        type="dashed"
        onClick={() => onAddSection()}
      >
        เพิ่ม
      </Button>
    </>
  );
};
