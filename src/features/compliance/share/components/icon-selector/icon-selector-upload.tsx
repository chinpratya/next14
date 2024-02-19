import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';
import { useState } from 'react';

import { Loading } from '@components/loading';

import { useUploadFile } from '../../../../shared';
import { useCreateIcon } from '../../api/create-icon';

export const IconSelectorUpload = () => {
  const [loading, setLoading] = useState(false);

  const createIcon = useCreateIcon({
    onSuccess: () => {
      setLoading(false);
    },
  });

  const upload = useUploadFile({
    module: 'assessment-automation',
    group: 'maturity-model',
    onSuccess: (presigned) => {
      createIcon.submit({
        fileID: presigned.key,
        fileName: presigned.file_name,
      });
    },
    onError: () => {
      setLoading(false);
    },
  });
  const onChange: UploadProps['onChange'] = ({
    file,
  }) => {
    setLoading(true);
    if (file?.originFileObj) {
      upload.submit(file.originFileObj as RcFile);
    }
  };

  return (
    <Upload
      listType="picture-card"
      fileList={[]}
      onChange={onChange}
      disabled={loading}
    >
      <div>
        {loading ? <Loading /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>อัพโหลดไอคอน</div>
      </div>
    </Upload>
  );
};
