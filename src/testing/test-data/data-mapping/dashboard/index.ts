import { graph } from './graph';
import { map } from './map';

const count = {
  activityCount: 10,
  dataElementCount: 20,
  purposeCount: 30,
  assetCount: 40,
};

const lawfulBasis = [
  {
    ObjectUUID: 'd024aafe-ac60-4c39-a7bd-4b2c30807fb5',
    name: 'ฐานกฎหมาย1',
    amount: 100,
  },
  {
    ObjectUUID: 'ca4b98fd-bcd9-44e6-bd57-99182f530a3c',
    name: 'ฐานกฎหมาย2',
    amount: 90,
  },
  {
    ObjectUUID: 'b0a9c8fa-4d09-48db-9495-dc5d2a11808a',
    name: 'ฐานกฎหมาย3',
    amount: 98,
  },
];

const rights = [
  {
    ObjectUUID: '12b166db-0fd9-4119-b0d3-3be87b5b2757',
    name: 'สิทธิเจ้าของข้อมูล1',
    amount: 100,
  },
  {
    ObjectUUID: '447da095-974e-417a-a6a3-f360e5a2d685',
    name: 'สิทธิเจ้าของข้อมูล2',
    amount: 90,
  },
  {
    ObjectUUID: 'dd0cf282-124d-46f5-8b3d-def2a0acc962',
    name: 'สิทธิเจ้าของข้อมูล3',
    amount: 98,
  },
];

const consent = [
  {
    ObjectUUID: 'f26f4d95-3a61-4819-9b7d-e78a58a68836',
    name: 'Activity01',
    amount: 100,
  },
  {
    ObjectUUID: '096f4241-411f-4545-80cd-baa2d38c4df8',
    name: 'Activity02',
    amount: 90,
  },
  {
    ObjectUUID: '75a1d8d3-8459-4e41-bbb9-254daaea9321',
    name: 'Activity03',
    amount: 98,
  },
];

const dsar = [
  {
    ObjectUUID: '405da48c-9460-4558-b741-c087283f4bc8',
    name: 'Activity001',
    amount: 100,
  },
  {
    ObjectUUID: 'c1ba6840-9e7f-456b-9a89-5489601b4309',
    name: 'Activity002',
    amount: 90,
  },
  {
    ObjectUUID: 'fd576c21-eb57-4dd8-8bf8-fa29c2ae5418',
    name: 'Activity003',
    amount: 98,
  },
];

const thirdPartyLocation = [
  {
    ObjectUUID: '405da48c-9460-4558-b741-c087283f4bc8',
    name: 'Party1',
    role: 'Dev',
    country: 'TH',
  },
  {
    ObjectUUID: 'c1ba6840-9e7f-456b-9a89-5489601b4309',
    name: 'Party2',
    role: 'Dev',
    country: 'TH',
  },
  {
    ObjectUUID: 'fd576c21-eb57-4dd8-8bf8-fa29c2ae5418',
    name: 'Party3',
    role: 'Dev',
    country: 'TH',
  },
];

export const dashboard = {
  graph,
  map,
  count,
  lawfulBasis,
  rights,
  consent,
  dsar,
  thirdPartyLocation,
};
