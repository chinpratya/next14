import type { ComputedDatum } from '@nivo/pie';

export const ChartTooltipDefault = ({
  datum,
}: {
  datum: ComputedDatum<{
    id: string;
    label: string;
    value: number;
    color: string;
  }>;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#fff',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          width: '10px',
          height: '10px',
          background: datum.color,
        }}
      />
      {datum.label} : {datum.value}
    </div>
  );
};
