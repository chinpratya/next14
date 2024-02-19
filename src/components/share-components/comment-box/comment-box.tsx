import { CommentOutlined } from '@ant-design/icons';
import { Typography, Skeleton } from 'antd';
import Scrollbars from 'react-custom-scrollbars';

import { useListComment } from '@/features/shared';
import { tokens } from '@/lang';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  CommentBoxInput,
  CommentBoxInputProps,
} from './comment-box-input';
import { CommentBoxItem } from './comment-box-item';

export type CommentBoxProps = CommentBoxInputProps;

export const CommentBox = ({
  module,
  submodule,
  pageidorname,
  defaultUsertype = 'internal',
  disabledChangeUsertype = false,
  disabled = false,
}: CommentBoxProps) => {
  const { data, isLoading } = useListComment({
    module: module,
    submodule: submodule,
    pageidorname: pageidorname,
    usertype: defaultUsertype,
  });

  const commentLength = data?.length ?? 0;

  return (
    <>
      <Typography.Title level={4} className="mt-3 mb-4">
        <CommentOutlined className="font-size-lg font-weight-bold" />{' '}
        <IntlMessage id={tokens.common.comment} /> (
        {data?.length ?? 0})
      </Typography.Title>
      <Scrollbars
        style={{
          height:
            commentLength < 5 ? commentLength * 110 : 500,
        }}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.map((comment) => (
              <CommentBoxItem
                key={comment.ObjectUUID}
                comment={comment}
              />
            ))}
            {/* <div className="pt-3">
              <CommentBoxInput
                module={module}
                submodule={submodule}
                pageidorname={pageidorname}
                defaultUsertype={defaultUsertype}
                disabledChangeUsertype={
                  disabledChangeUsertype
                }
              />
            </div> */}
          </>
        )}
      </Scrollbars>
      <CommentBoxInput
        module={module}
        submodule={submodule}
        pageidorname={pageidorname}
        defaultUsertype={defaultUsertype}
        disabledChangeUsertype={disabledChangeUsertype}
        disabled={disabled}
      />
    </>
  );
};
