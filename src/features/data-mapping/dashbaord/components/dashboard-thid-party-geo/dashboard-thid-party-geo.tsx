import { Card } from 'antd';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';

import geography from '@/assets/data/geometry-collection.json';
import { GEO_MAP_COLOR_SCHEME } from '@/config/color';
import { FallbackError } from '@utilComponents/fallback-error';

import { useGetDashboardMapThirdPartyLocation } from '../../api/get-dashboard-map-third-party-location';

export const DashboardThirdPartyGeo = () => {
  const { data, isError } =
    useGetDashboardMapThirdPartyLocation();

  const geoData = data?.data ?? [];

  return (
    <FallbackError isError={isError}>
      <Card bordered={false}>
        <ComposableMap
          projectionConfig={{
            scale: 150,
          }}
          height={325}
        >
          <Geographies geography={geography}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoIndex = geoData.findIndex(
                  (s) => s.alpha3 === geo.id
                );

                const fill =
                  GEO_MAP_COLOR_SCHEME?.[geoIndex];

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill ?? '#f5f4f6'}
                    stroke="#e4e5e6"
                    strokeWidth={1.5}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </Card>
    </FallbackError>
  );
};
