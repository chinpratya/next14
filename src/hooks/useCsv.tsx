import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { RcFile } from 'antd/lib/upload';
import csv from 'csvtojson';
import { CSVLink } from 'react-csv';
import type { LinkProps } from 'react-csv/components/Link';

type ExportCsvProps = Omit<LinkProps, 'filename'> & {
  fileName: string;
  renderType?: 'link' | 'button';
};
export const ExportCsv = ({
  data,
  headers,
  fileName,
  renderType = 'button',
}: ExportCsvProps) => {
  if (renderType === 'link') {
    return (
      <CSVLink
        data={data}
        headers={headers}
        filename={fileName}
      >
        <span style={{ color: '#455560' }}>
          ส่งออกรายงาน
        </span>
      </CSVLink>
    );
  }

  return (
    <Button icon={<DownloadOutlined className="mr-2" />}>
      <CSVLink
        data={data}
        headers={headers}
        filename={fileName}
      >
        <span style={{ color: '#455560' }}>
          ส่งออกรายงาน
        </span>
      </CSVLink>
    </Button>
  );
};

const covertCsvToObject = async <T extends object>(
  file: RcFile
) => {
  const object = await new Promise<string>(
    (resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsText(file);
    }
  );
  return await csv()
    .fromString(object as string)
    .then((jsonObj: T[]) => {
      return jsonObj;
    });
};

export type UseCsv<T extends object> = Pick<
  ExportCsvProps,
  'fileName' | 'renderType'
> & {
  data?: T[];
  columns?: ColumnsType<T>;
};

export const useCsv = <T extends object>({
  data = [],
  columns,
  ...props
}: UseCsv<T>) => {
  const header = columns
    ?.filter((column) => column.title !== undefined)
    ?.map((column) => ({
      label: column.title as string,
      key: column.key as string,
    }));

  return {
    covertCsvToObject,
    ExportCsv: (
      <ExportCsv
        {...props}
        data={data}
        headers={header}
      />
    ),
  };
};
