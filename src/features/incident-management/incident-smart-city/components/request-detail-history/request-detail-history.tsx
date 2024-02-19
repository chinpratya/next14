import { Skeleton, Timeline } from 'antd';

import { FallbackError } from '@utilComponents/fallback-error';

import { useGetRequestVersion } from '../../api/get-request-version';
import { RequestVersionData } from '../../types';

type RequestDetailHistoryProps = {
  requestId: string;
};
type renderDescriptionType = {
  type: string;
  value: RequestVersionData;
};
export const RequestDetailHistory = ({
  requestId,
}: RequestDetailHistoryProps) => {
  const { data, isError, isLoading } =
    useGetRequestVersion(requestId);
  const renderDescription = ({
    type,
    value,
  }: renderDescriptionType) => {
    switch (type) {
      case 'create':
        return `คุณ ${value.name} ส่งคำขอเข้ามาใหม่ <br>อีเมล: ${value.email}  <br>รหัสคําขอ​: ${value.requestID}  <br>${value.time}`;
        break;
      case 'language':
        return `${value.email}  <br>เปลียนภาษาจาก: ${value.oldLang} เป็น ${value.newLang}  <br>  ${value.time}`;
        break;
      case 'timeline':
        return `${value.email}  <br>เปลียนเวลาสิ้นสุดคำขอจาก: ${value.oldTime} เป็น ${value.newTime} <br>${value.time}`;
        break;
      case 'approved':
        return `${value.email} <br>เปลียนผู้อนุมัติคำขอจาก: ${value.oldApproved} เป็น ${value.newApproved} <br>${value.time}`;
        break;
      case 'approved':
        return `${value.email} <br>เปลียนผู้อนุมัติคำขอจาก: ${value.oldApproved} เป็น ${value.newApproved} <br>${value.time}`;
        break;
      case 'status':
        return `${value.email} <br>เปลียนสถานะคำขอจาก: ${value.oldStatus} เป็น ${value.newStatus} <br>${value.time}`;
        break;
      case 'state':
        return `${value.email} <br>เปลียนขั้นตอนการทำงานคำขอจาก: ${value.oldstate} เป็น ${value.newstate} <br>${value.time}`;
        break;
      default:
        break;
    }
  };
  return (
    <FallbackError isError={isError}>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Timeline mode="alternate" className="mt-4">
          {data?.version.map((v) => {
            return (
              <Timeline.Item key={v.type}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderDescription({
                      type: v.type,
                      value: v.data,
                    }) as string,
                  }}
                />
              </Timeline.Item>
            );
          })}
        </Timeline>
      )}
    </FallbackError>
  );
};
