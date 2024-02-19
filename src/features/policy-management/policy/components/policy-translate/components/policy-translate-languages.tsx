import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Menu, Skeleton, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import { useState, useEffect } from 'react';

import { usePermission, useToggle } from '@/hooks';
import { permissions } from '@/permissions';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useListPolicyLanguage } from '../../../api/list-policy-language';
import { PolicyLanguage } from '../../../types';

import { PolicyTranslateAddLanguageModal } from './policy-translate-add-language-modal';

export type MenuItem = Required<MenuProps>['items'];

export type PolicyTranslateLanguagesProps = {
  policyId: string;
  currentLanguage: string;
  onChangeCurrentLanguage: (key: string) => void;
  onDelete?: (language: PolicyLanguage) => void;
};

export const PolicyTranslateLanguages = ({
  policyId,
  currentLanguage,
  onChangeCurrentLanguage,
  onDelete,
}: PolicyTranslateLanguagesProps) => {
  const toggle = useToggle();
  const { data, isError, isLoading } =
    useListPolicyLanguage(policyId);

  const editPermission = usePermission({
    moduleName: 'policy',
    policies: [
      permissions['pdpakit:policy:document:update'],
    ],
  });

  const alreadyExitingLanguageKeys = data?.data.map(
    (language) =>
      language.languageId || language.languageId === 'th'
  );

  const filteredWithoutDefaultLanguages =
    data?.data?.filter(
      (language) => language.languageId !== 'th'
    );
  const [isHovered, setIsHovered] = useState<
    string | null
  >(null);

  const itemsMenu = filteredWithoutDefaultLanguages?.map(
    (item) => {
      return {
        key: item?.languageId,
        label: (
          <div
            className={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 200px;
            `}
            onMouseEnter={() =>
              setIsHovered(item?.languageId ?? null)
            }
            onMouseLeave={() => setIsHovered(null)}
          >
            <div
              className={css`
                width: 90%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              `}
            >
              <Tooltip title={item?.languageName}>
                {item?.languageName}
              </Tooltip>
            </div>
            {isHovered === item?.languageId &&
              onDelete && (
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete?.(item)}
                />
              )}
          </div>
        ),
      };
    }
  );

  useEffect(() => {
    if (
      !currentLanguage &&
      filteredWithoutDefaultLanguages?.length
    ) {
      onChangeCurrentLanguage(
        filteredWithoutDefaultLanguages?.[0]
          .languageId as string
      );
    }
  }, [
    currentLanguage,
    data,
    filteredWithoutDefaultLanguages,
    onChangeCurrentLanguage,
  ]);

  return (
    <div className="w-100">
      <div className="p-2 border-bottom">
        <Button
          type="link"
          block
          icon={<PlusOutlined />}
          onClick={() => toggle.create()}
          disabled={!editPermission.isAllow}
        >
          <IntlMessage id="policyManagement.policy.detail.translate.add" />
        </Button>
      </div>
      <FallbackError isError={isError}>
        {isLoading ? (
          <Skeleton active className="p-2" />
        ) : (
          <Menu
            mode="inline"
            className="w-100"
            selectedKeys={[currentLanguage ?? '']}
            items={(itemsMenu as MenuItem) ?? []}
            onClick={(e) => {
              onChangeCurrentLanguage(e.key);
            }}
          />
        )}
        <PolicyTranslateAddLanguageModal
          open={toggle.openCreate}
          onClose={() => toggle.create()}
          policyId={policyId}
          keyDisable={
            alreadyExitingLanguageKeys as string[]
          }
        />
      </FallbackError>
    </div>
  );
};
