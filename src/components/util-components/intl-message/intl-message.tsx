import { useTranslation } from 'react-i18next';

export type IntlMessageProps = {
  id: string;
  fallback?: string;
  options?: Record<string, unknown>;
  className?: string;
};

export const IntlMessage = ({
  id,
  fallback,
  options,
  className,
}: IntlMessageProps) => {
  const { t } = useTranslation();

  const translation = t(id, {
    defaultValue: fallback,
    ...options,
  });

  return (
    <span id={id} className={className}>
      {translation}
    </span>
  );
};
