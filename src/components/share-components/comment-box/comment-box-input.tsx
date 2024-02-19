import {
  DownOutlined,
  LoadingOutlined,
  MessageOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import {
  Col,
  Dropdown,
  Input,
  MenuProps,
  Row,
  Space,
  Typography,
} from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateComment } from '@/features/shared';
import { tokens } from '@/lang';
import { useAuth } from '@/stores/auth';
import { getColLayout } from '@/utils';
import { NoneProfile } from '@components/none-profile';
import { IntlMessage } from '@utilComponents/intl-message';

export type CommentBoxInputProps = {
  module: string;
  submodule: string;
  pageidorname: string;
  defaultUsertype?: 'internal' | 'external';
  disabledChangeUsertype?: boolean;
  disabled?: boolean;
};

export const CommentBoxInput = ({
  module,
  submodule,
  pageidorname,
  defaultUsertype = 'internal',
  disabledChangeUsertype = false,
  disabled = false,
}: CommentBoxInputProps) => {
  const { email } = useAuth();
  const { t } = useTranslation();

  const [comment, setComment] = useState('');
  const [usertype, setUsertype] = useState(
    defaultUsertype
  );

  const themeColor =
    usertype === 'internal' ? '#FFC542' : '#0052B4';

  const createComment = useCreateComment({
    module: module,
    submodule: submodule,
    pageidorname: pageidorname,
    onSuccess: () => setComment(''),
  });

  const items: MenuProps['items'] = [
    {
      label: <IntlMessage id={tokens.common.internal} />,
      key: 'Internal',
      onClick: () => setUsertype('internal'),
    },
    {
      label: <IntlMessage id={tokens.common.external} />,
      key: 'External',
      onClick: () => setUsertype('external'),
    },
  ];

  const onSubmit = () => {
    if (!comment) return;
    const payload = {
      comment: comment,
      email: email as string,
      userid: email as string,
      usertype: usertype,
      name: email as string,
      isadmin: true,
    };
    createComment.submit(payload);
  };

  return (
    <div
      className={css`
        .ant-input-affix-wrapper:not(
            .ant-input-affix-wrapper-disabled
          ):hover,
        .ant-input-affix-wrapper-focused,
        .ant-input-affix-wrapper:focus {
          border-color: ${themeColor} !important;
          box-shadow: none !important;
        }
      `}
    >
      <Row
        justify="space-between"
        align={'middle'}
        gutter={[0, 16]}
      >
        <Col {...getColLayout([0, 0, 0, 1, 1, 1])}>
          <NoneProfile color={themeColor} />
        </Col>
        <Col
          {...getColLayout([24, 24, 24, 23, 23, 23])}
          className="pl-1"
        >
          <div
            className="p-2"
            style={{
              backgroundColor: '#F5F5F5',
              borderRadius: 8,
              width: '100%',
            }}
          >
            <Input
              placeholder={
                t(tokens.common.comment) as string
              }
              disabled={disabled}
              onChange={(e) => setComment(e.target.value)}
              onPressEnter={onSubmit}
              value={comment}
              suffix={
                <>
                  <Dropdown
                    menu={{ items }}
                    trigger={['click']}
                    disabled={disabledChangeUsertype}
                  >
                    <Typography.Text
                      onClick={(e) => e.preventDefault()}
                      className={css`
                        cursor: pointer;
                        color: ${themeColor};
                      `}
                    >
                      <Space>
                        <MessageOutlined
                          style={{ fontSize: '17px' }}
                        />
                        {usertype === 'internal'
                          ? 'Internal'
                          : 'External'}
                        <DownOutlined
                          hidden={disabledChangeUsertype}
                        />
                      </Space>
                    </Typography.Text>
                  </Dropdown>
                  {createComment.isLoading ? (
                    <LoadingOutlined />
                  ) : (
                    <SendOutlined
                      className={css`
                        cursor: ${disabled
                          ? 'not-allowed'
                          : 'pointer'} !important;
                        background-color: ${themeColor};
                        padding-top: 4px;
                        padding-left: 3px;
                        width: 23px;
                        height: 23px;
                        border-radius: 50%;
                        color: #ffffff !important;
                      `}
                      onClick={() => onSubmit()}
                    />
                  )}
                </>
              }
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
