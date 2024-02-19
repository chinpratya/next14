import { css } from '@emotion/css';

import {
  SERVERITY_LEVEL,
  SEVERITY_ITEMS,
  SeverityLevel,
} from '../sla-severity-icon/severity-constant';

type SeverityWithColorProps = {
  level?: string;
};
export function SeverityWithColor({
  level = SERVERITY_LEVEL.HIGHEST,
}: SeverityWithColorProps) {
  const severityLevel =
    SEVERITY_ITEMS[level as SeverityLevel];

  return (
    <span
      className={css`
        color: ${severityLevel?.color};
      `}
    >
      {severityLevel?.label}
    </span>
  );
}
