import { Skeleton, Timeline } from 'antd';
import dayjs from 'dayjs';
import { Scrollbars } from 'react-custom-scrollbars';

import { FallbackError } from '@utilComponents/fallback-error';

import { useGetRequestVersion } from '../../api/get-request-version';
import { RequestVersionData } from '../../types';

export type RequestHistoryProps = {
  requestId: string;
};

const renderDescription = ({
  type,
  version,
}: {
  type: string;
  version: RequestVersionData;
}) => {
  const time = dayjs(version.time).format(
    'DD/MM/YYYY HH:mm:ss'
  );

  switch (type) {
    case 'create':
      return `คุณ ${version.name} ส่งคำขอเข้ามาใหม่ <br>อีเมล: ${version.email}  <br>รหัสคําขอ: ${version.requestID}  <br>${time}`;
    case 'language':
      return `${version.email}  <br>เปลียนภาษาจาก: ${version.oldLang} เป็น ${version.newLang}  <br>  ${time}`;
    case 'timeline':
      return `${version.email}  <br>เปลียนเวลาสิ้นสุดคำขอจาก: ${version.oldTime} เป็น ${version.newTime} <br>${time}`;
    case 'approved':
      return `${version.email} <br>เปลียนผู้อนุมัติคำขอจาก: ${version.oldApproved} เป็น ${version.newApproved} <br>${time}`;
    case 'status':
      return `${version.email} <br>เปลียนสถานะคำขอจาก: ${version.oldStatus} เป็น ${version.newStatus} <br>${time}`;
    case 'state':
      return `${
        version.email
      } <br>เปลียนขั้นตอนการทำงานคำขอจาก: ${
        version.oldState ?? version.oldstate
      } เป็น ${
        version.newState ?? version.newstate
      } <br>${time}`;
    case 'assigned':
      return `${version.name} ${version.approved} <br>assigned a task approve to ${version.assigned} <br>${time}`;
    case 'status_work':
      return `${version.name} ${version.email} <br>เปลียนสถานะจาก: ${version.oldStatus} เป็น ${version.newStatus} <br>${time}`;
    default:
      break;
  }
};

export const RequestHistory = ({
  requestId,
}: RequestHistoryProps) => {
  const { data, isError, isLoading } =
    useGetRequestVersion(requestId);

  return (
    <FallbackError isError={isError}>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        style={{ minHeight: '25vh', maxHeight: '50vh' }}
      >
        {isLoading ? (
          <Skeleton active />
        ) : (
          <Timeline mode="alternate" className="mt-4">
            {data?.version.map((version, index) => {
              return (
                <Timeline.Item
                  key={`request-version` + index}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderDescription({
                        type: version.type,
                        version: version.data,
                      }) as string,
                    }}
                  />
                </Timeline.Item>
              );
            })}
          </Timeline>
        )}
      </Scrollbars>
    </FallbackError>
  );
};
