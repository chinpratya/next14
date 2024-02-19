import {
  // CheckCircleFilled,
  // CheckCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EnterOutlined,
  MoreOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Divider,
  Dropdown,
  Empty,
  Input,
  Skeleton,
  Spin,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

// import { GREEN_PRIMARY_COLOR } from '@/config/color';
import { useToggle } from '@/hooks';
import { compliancePortalQueryKeys } from '@/lib/queryKeys/compliance-portal';
import { queryClient } from '@/lib/react-query';
import { useAuth } from '@/stores/auth';
import { DeleteModal } from '@components/delete-modal';
import { Flex } from '@components/flex';
import { FallbackError } from '@utilComponents/fallback-error';

import { useAssessmentAutomationStore } from '../../../../share';
import { useCreateAssessmentFormComment } from '../../../api/create-assessment-form-comment';
import { useDeleteAssessmentFormComment } from '../../../api/delete-assessment-form-comment';
// import { useGetPortalFormCommentIssue } from '../../../api/get-portal-form-comment-issue';
import { useListAssessmentFormComment } from '../../../api/list-assessment-form-comment';
import { useReadPortalFormComment } from '../../../api/read-portal-form-comment';
import { useRejectPortalFormCommentIssue } from '../../../api/reject-portal-form-comment-issue';
import { useResolvePortalFormCommentIssue } from '../../../api/resolve-portal-form-comment-issue';
import { useUpdateAssessmentFormComment } from '../../../api/update-assessment-form-comment';
// eslint-disable-next-line import/no-cycle
import { Comment } from '../../../types/comment';

export type FormCommentProps = {
  assessmentId: string;
  onToggleComment: () => void;
};

export type CommentItemProps = Comment & {
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, message: string) => void;
};

export const CommentItem = ({
  ObjectUUID,
  message,
  createdBy,
  createdDt,
  onDelete,
  onEdit,
}: CommentItemProps) => {
  const [isEdited, setEdited] = useState<boolean>(false);
  const [editComment, setEditComment] =
    useState<string>(message);
  const { email } = useAuth();

  return (
    <>
      <div className="pl-3 pr-2 pt-3">
        <Flex
          alignItems="center"
          justifyContent="between"
        >
          <Flex>
            <Avatar icon={<UserOutlined />} />
            <div>
              <Typography.Title
                level={4}
                className="mb-0 ml-2"
                type="secondary"
              >
                {createdBy}
              </Typography.Title>
              <Typography.Text
                className="ml-2"
                type="secondary"
              >
                {dayjs(createdDt).format(
                  'DD/MM/YYYY HH:mm'
                )}
              </Typography.Text>
            </div>
          </Flex>
          <Flex>
            {createdBy === email && (
              <Dropdown
                className={`${
                  ObjectUUID === 'new' && 'd-none'
                }`}
                menu={{
                  items: [
                    {
                      label: 'แก้ไข',
                      key: 'edit',
                      icon: <EditOutlined />,
                      onClick: () => setEdited(true),
                    },
                    {
                      label: 'ลบ',
                      key: 'delete',
                      icon: <DeleteOutlined />,
                      onClick: () => onDelete(ObjectUUID),
                    },
                  ],
                }}
              >
                <MoreOutlined className="cursor-pointer" />
              </Dropdown>
            )}
          </Flex>
        </Flex>
        {isEdited ? (
          <div
            className="mt-3 p-2 mb-3"
            style={{
              backgroundColor: '#F5F5F5',
              borderRadius: 8,
            }}
            onMouseLeave={() => setEdited(false)}
          >
            <Input
              value={editComment}
              onChange={(e) =>
                setEditComment(e.target.value)
              }
              placeholder="แสดงความคิดเห็น"
              suffix={<EnterOutlined />}
              onPressEnter={() => {
                onEdit(ObjectUUID, editComment);
                setEdited(false);
              }}
            />
          </div>
        ) : (
          <Typography.Paragraph
            className="mt-3"
            type="secondary"
          >
            {message}
          </Typography.Paragraph>
        )}
      </div>
      <Divider className="mt-0 mb-0" />
    </>
  );
};

export const FormComment = ({
  assessmentId,
  onToggleComment,
}: FormCommentProps) => {
  const { selectedFormKey } =
    useAssessmentAutomationStore();
  const {
    email,
    // role
  } = useAuth();

  // const commentIssue = useGetPortalFormCommentIssue({
  //   assessmentId,
  //   formId: selectedFormKey,
  // });

  const toggle = useToggle<Record<'commentId', string>>();
  const [comment, setComment] = useState<string>('');
  const { data, isLoading, isError } =
    useListAssessmentFormComment({
      assessmentId,
      formId: selectedFormKey,
    });
  const createComment = useCreateAssessmentFormComment({
    assessmentId,
    formId: selectedFormKey,
  });

  const deleteComment = useDeleteAssessmentFormComment({
    assessmentId,
    formId: selectedFormKey,
    onSuccess: () => {
      toggle.remove();
    },
  });

  const updateComment = useUpdateAssessmentFormComment({
    assessmentId,
    formId: selectedFormKey,
  });

  const { submit: readComment } =
    useReadPortalFormComment({
      assessmentId,
      formId: selectedFormKey,
    });

  const resolveComment = useResolvePortalFormCommentIssue(
    {
      assessmentId,
      formId: selectedFormKey,
    }
  );

  const rejectComment = useRejectPortalFormCommentIssue({
    assessmentId,
    formId: selectedFormKey,
  });

  useEffect(() => {
    if (selectedFormKey) {
      readComment();
    }
  }, [readComment, selectedFormKey]);

  if (isLoading || !selectedFormKey) {
    return <Skeleton className="p-3" active />;
  }

  const issueLoading =
    resolveComment.isLoading || rejectComment.isLoading;

  const onPressEnterUpdate = (
    commentId: string,
    message: string
  ) => {
    updateComment.submit({ commentId, message });
    queryClient.setQueriesData(
      [
        compliancePortalQueryKeys.assessment.comment(
          assessmentId,
          selectedFormKey
        ),
      ],
      (oldData: Comment[] | undefined) => {
        const editedIndex = oldData?.findIndex(
          (item) => item.ObjectUUID === commentId
        );
        if (
          editedIndex !== undefined &&
          editedIndex > -1 &&
          oldData
        ) {
          oldData[editedIndex].message = message;
        }
        return [...(oldData ?? [])];
      }
    );
  };

  const onPressEnterComment = () => {
    createComment.submit(comment);
    queryClient.setQueriesData(
      [
        compliancePortalQueryKeys.assessment.comment(
          assessmentId,
          selectedFormKey
        ),
      ],
      (oldData: Comment[] | undefined) => [
        ...(oldData ?? []),
        {
          ObjectUUID: 'new',
          createdBy: `${email}`,
          createdDt: new Date().toISOString(),
          message: comment,
          isApprove: false,
        },
      ]
    );
    setComment('');
  };

  return (
    <>
      <FallbackError isError={isError} borderLess>
        <div className="pt-3 pb-3 pl-3 pr-2 border-bottom">
          <Flex justifyContent="end" alignItems="center">
            {issueLoading && (
              <Spin className="mr-2 p-0" />
            )}
            {/* {commentIssue?.data?.status === 'approved' &&
              commentIssue?.data?.haveIssue &&
              !issueLoading && (
                <CheckCircleFilled
                  className="font-size-md mr-2"
                  style={{
                    color: GREEN_PRIMARY_COLOR,
                  }}
                  onClick={() => rejectComment.submit()}
                />
              )} */}
            {/* {commentIssue?.data?.status === 'issue' &&
              !issueLoading && (
                <CheckCircleOutlined
                  className="font-size-md mr-2"
                  onClick={() => resolveComment.submit()}
                />
              )} */}
            {/* {role === 'approver' && !issueLoading ? (
              commentIssue?.data?.haveIssue &&
              commentIssue?.data?.status === 'issue' ? (
                <CheckCircleOutlined
                  className="font-size-md mr-2"
                  onClick={() => resolveComment.submit()}
                />
              ) : null
            ) : commentIssue?.data?.haveIssue &&
              commentIssue?.data?.status !== 'approved' &&
              !issueLoading ? (
              <CheckCircleOutlined
                className="font-size-md mr-2"
                onClick={() => resolveComment.submit()}
              />
            ) : null} */}
            <CloseOutlined
              className="font-size-md"
              onClick={() => onToggleComment()}
            />
          </Flex>
        </div>
        {data?.length === 0 && (
          <>
            <Empty
              className="p-3"
              description="ไม่มีความคิดเห็น"
            />
            <Divider className="mb-0" />
          </>
        )}
        <Typography.Title level={3} className="p-2 mb-0">
          แสดงความคิดเห็น ({data?.length})
        </Typography.Title>
        {data?.map((comment) => (
          <CommentItem
            key={comment.ObjectUUID}
            {...comment}
            onDelete={(commentId) =>
              toggle.remove({
                commentId,
              })
            }
            onEdit={(commentId, message) =>
              onPressEnterUpdate(commentId, message)
            }
          />
        ))}
        <div className="pl-3 pr-2 pt-3">
          <Flex alignItems="center">
            <Avatar icon={<UserOutlined />} />
            <Typography.Title
              level={4}
              className="mb-0 ml-2"
              type="secondary"
            >
              {email}
            </Typography.Title>
          </Flex>
          <div
            className="mt-3 p-2"
            style={{
              backgroundColor: '#F5F5F5',
              borderRadius: 8,
            }}
          >
            <Input
              placeholder="แสดงความคิดเห็น"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              suffix={<EnterOutlined />}
              onPressEnter={onPressEnterComment}
            />
          </div>
        </div>
      </FallbackError>
      <DeleteModal
        title="ลบความคิดเห็น"
        content="คุณต้องการลบความคิดเห็นนี้ใช่หรือไม่"
        open={toggle.openRemove}
        loading={deleteComment.isLoading}
        onDelete={() =>
          deleteComment.submit(
            toggle.data?.commentId ?? ''
          )
        }
        onCancel={() => toggle.remove()}
        hasIdentifier={false}
        width={400}
      />
    </>
  );
};
