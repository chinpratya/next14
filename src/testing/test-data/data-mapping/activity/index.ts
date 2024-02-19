import { actor } from './actor';
import { basis } from './basis';
import { collect } from './collect';
import { dataCategory } from './data-category';
import { disclosure } from './disclosure';
import { dpia } from './dpia';
import { lawfulBasis } from './lawful-basis';
import { meta } from './meta';
import { preview } from './preview';
import { listPurpose } from './purpose';
import { usage } from './usage';

const list = [
  {
    ObjectUUID: '3aacc747-04f5-43aa-933e-43ece2ce3b38',
    name: 'เพื่อการปฏิบัติตามสัญญาคู่ค้า',
    activityType: 'data-processor',
    group: 'GOV Service',
    groupID: '213124',
    status: 'inactive',
    owner: 'นางสาวมัลลิกา สถิตายุธ',
    ownerID: '15f88d18-f36d-412e-804b-a29cf98227c5',
    organization: 'สภาคณาจารย์และข้าราชการ',
    organizationID:
      '627ec4e9-9a2a-4a94-8a39-ce7dae10256e',
    created_by: 'Frontend Dev',
    created_dt: '2023-07-01T00:00:00.000Z',
    updated_by: 'Frontend Dev',
    updated_dt: '2023-07-01T00:00:00.000Z',
  },
  {
    ObjectUUID: '98f0ae4c-8c3b-4786-ad7d-ac07f60fdbf6',
    name: 'การรับสมัครพนักงาน',
    activityType: 'data-processor',
    group: 'GOV Service',
    groupID: '213124',
    status: 'active',
    owner: 'นางสาวมัลลิกา สถิตายุธ',
    ownerID: '15f88d18-f36d-412e-804b-a29cf98227c5',
    organization: 'สภาคณาจารย์และข้าราชการ',
    organizationID:
      '627ec4e9-9a2a-4a94-8a39-ce7dae10256e',
    isDisclosure: true,
    created_by: 'Frontend Dev',
    created_dt: '2023-07-01T00:00:00.000Z',
    updated_by: 'Frontend Dev',
    updated_dt: '2023-07-01T00:00:00.000Z',
  },
  {
    ObjectUUID: 'c7f4f0b3-ead8-428c-baf8-a666beca26e2',
    name: 'การส่งข้อมูลสุขภาพไปยังหน่อยงานรัฐ',
    activityType: 'data-processor',
    group: 'GOV Service',
    groupID: '213124',
    status: 'active',
    owner: 'นางสาวมัลลิกา สถิตายุธ',
    ownerID: '15f88d18-f36d-412e-804b-a29cf98227c5',
    organization: 'สภาคณาจารย์และข้าราชการ',
    organizationID:
      '627ec4e9-9a2a-4a94-8a39-ce7dae10256e',
    created_by: 'Frontend Dev',
    created_dt: '2023-07-01T00:00:00.000Z',
    updated_by: 'Frontend Dev',
    updated_dt: '2023-07-01T00:00:00.000Z',
  },
  {
    ObjectUUID: '2e1ff790-405b-4ca0-91db-4664b5d2477f',
    name: 'กิจกรรมทางการตลาด',
    activityType: 'data-processor',
    group: 'GOV Service',
    groupID: '213124',
    status: 'active',
    owner: 'นางสาวมัลลิกา สถิตายุธ',
    ownerID: '15f88d18-f36d-412e-804b-a29cf98227c5',
    organization: 'สภาคณาจารย์และข้าราชการ',
    organizationID:
      '627ec4e9-9a2a-4a94-8a39-ce7dae10256e',
    created_by: 'Frontend Dev',
    created_dt: '2023-07-01T00:00:00.000Z',
    updated_by: 'Frontend Dev',
    updated_dt: '2023-07-01T00:00:00.000Z',
  },
  {
    ObjectUUID: '1b7a2ffe-7966-43a4-b1ab-1f4407fbc126',
    name: 'การให้บริการผ่านเว็บไซต์',
    activityType: 'data-processor',
    group: 'GOV Service',
    groupID: '213124',
    status: 'inactive',
    owner: 'นางสาวมัลลิกา สถิตายุธ',
    ownerID: '15f88d18-f36d-412e-804b-a29cf98227c5',
    organization: 'สภาคณาจารย์และข้าราชการ',
    organizationID:
      '627ec4e9-9a2a-4a94-8a39-ce7dae10256e',
    created_by: 'Frontend Dev',
    created_dt: '2023-07-01T00:00:00.000Z',
    updated_by: 'Frontend Dev',
    updated_dt: '2023-07-01T00:00:00.000Z',
  },
];

export const activity = {
  list,
  meta,
  collect,
  dataCategory,
  preview,
  actor,
  disclosure,
  dpia,
  basis,
  lawfulBasis,
  listPurpose,
  usage,
};
