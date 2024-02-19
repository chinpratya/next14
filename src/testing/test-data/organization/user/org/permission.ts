export const permission = [
  {
    name: 'pdpakit',
    description: 'pdpakit',
    children: [
      {
        name: 'datamap',
        description: 'datamap',
        children: [
          {
            name: 'access-module',
            description: 'access-module',
            children: {
              access: {
                composite: false,
                attributes: {},
                permissionId:
                  '3e2260ab-1116-457d-9754-8e6d0fb54603',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/access-module/any-access-module',
                description: 'เข้าถึงโมดูล Data Map',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'access-module',
                code_name: 'any-access-module',
                action: 'access',
              },
            },
          },
          {
            name: 'control-measures',
            description: 'control-measures',
            children: {
              create: {
                composite: false,
                attributes: {},
                permissionId:
                  'c298eb78-60ba-4252-81ab-b43fdfe88e58',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/control-measures/create-control-measures',
                description: 'เพิ่มมาตรการควบคุม',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'control-measures',
                code_name: 'create-control-measures',
                action: 'create',
              },
              delete: {
                composite: false,
                attributes: {},
                permissionId:
                  '699cc0d1-164f-40e7-91ac-553d0b4dc0e5',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/control-measures/delete-control-measures',
                description: 'ลบมาตรการควบคุม',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'control-measures',
                code_name: 'delete-control-measures',
                action: 'delete',
              },
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  '45eeabcd-fec9-428c-a860-183eff17f1ea',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/control-measures/read-control-measures',
                description: 'ดูมาตรการควบคุม',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'control-measures',
                code_name: 'read-control-measures',
                action: 'read',
              },
              update: {
                composite: false,
                attributes: {},
                permissionId:
                  'fe61c4e8-498b-4f59-a377-51acea1c3e49',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/control-measures/update-control-measures',
                description: 'แก้ไขมาตรการควบคุม',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'control-measures',
                code_name: 'update-control-measures',
                action: 'update',
              },
            },
          },
          {
            name: 'cross-border',
            description: 'cross-border',
            children: {
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  '48145f39-2c3f-4e09-8b57-9e30dce0fc1c',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/cross-border/read-cross-border',
                description:
                  'ดูการโอนข้อมูลไปยังต่างประเทศ',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'cross-border',
                code_name: 'read-cross-border',
                action: 'read',
              },
            },
          },
          {
            name: 'data-element',
            description: 'data-element',
            children: {
              create: {
                composite: false,
                attributes: {},
                permissionId:
                  '7547d86a-5ba4-46e0-b0b0-0268078af5e4',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-element/create-data-element',
                description: 'เพิ่มข้อมูลพื้นฐาน',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-element',
                code_name: 'create-data-element',
                action: 'create',
              },
              delete: {
                composite: false,
                attributes: {},
                permissionId:
                  'efaa139d-f806-4ece-9cb2-d9ad0ba9ef57',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-element/delete-data-element',
                description: 'ลบข้อมูลพื้นฐาน',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-element',
                code_name: 'delete-data-element',
                action: 'delete',
              },
              export: {
                composite: false,
                attributes: {},
                permissionId:
                  '87bf9d46-e495-4f9b-85f3-00a6aa37108c',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-element/export-data-element',
                description: 'ส่งออกข้อมูลพื้นฐาน',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-element',
                code_name: 'export-data-element',
                action: 'export',
              },
              import: {
                composite: false,
                attributes: {},
                permissionId:
                  '10b7823a-3df9-468a-9e75-ee4dd6d8a074',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-element/import-data-element',
                description: 'นำเข้าข้อมูลพื้นฐาน',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-element',
                code_name: 'import-data-element',
                action: 'import',
              },
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  '16ed0865-a198-4dd3-8c0c-d8fbe637362b',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-element/read-data-element',
                description: 'ดูข้อมูลพื้นฐาน',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-element',
                code_name: 'read-data-element',
                action: 'read',
              },
              update: {
                composite: false,
                attributes: {},
                permissionId:
                  '34171f11-c7fb-4c6e-9bc2-14269fdd1986',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-element/update-data-element',
                description: 'แก้ไขข้อมูลพื้นฐาน',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-element',
                code_name: 'update-data-element',
                action: 'update',
              },
            },
          },
          {
            name: 'data-flow',
            description: 'data-flow',
            children: {
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  '30a8c589-1527-4d12-a8f4-647f3cf2a9c5',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-flow/read-data-flow',
                description: 'ดูกระแสข้อมูล',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-flow',
                code_name: 'read-data-flow',
                action: 'read',
              },
            },
          },
          {
            name: 'data-life-cycle',
            description: 'data-life-cycle',
            children: {
              create: {
                composite: false,
                attributes: {},
                permissionId:
                  '21f11f8d-db4e-4390-b845-e3e5c0712c53',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-life-cycle/create-data-life-cycle',
                description: 'เพิ่มวงจรชีวิตข้อมูล',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-life-cycle',
                code_name: 'create-data-life-cycle',
                action: 'create',
              },
              delete: {
                composite: false,
                attributes: {},
                permissionId:
                  'f3b1cbd0-dea7-44a9-a08b-5826e871c70a',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-life-cycle/delete-data-life-cycle',
                description: 'ลบวงจรชีวิตข้อมูล',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-life-cycle',
                code_name: 'delete-data-life-cycle',
                action: 'delete',
              },
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  '021020a7-4112-4e63-80de-131200802c38',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-life-cycle/read-data-life-cycle',
                description: 'ดูวงจรชีวิตข้อมูล',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-life-cycle',
                code_name: 'read-data-life-cycle',
                action: 'read',
              },
              update: {
                composite: false,
                attributes: {},
                permissionId:
                  'c4b0abbe-77e2-472e-940f-47fd3c619908',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-life-cycle/update-data-life-cycle',
                description: 'แก้ไขวงจรชีวิตข้อมูล',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-life-cycle',
                code_name: 'update-data-life-cycle',
                action: 'update',
              },
            },
          },
          {
            name: 'data-set',
            description: 'data-set',
            children: {
              export: {
                composite: false,
                attributes: {},
                permissionId:
                  'b349febb-68b7-4f0c-a46b-2fa47b229b08',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-set/export-data-set',
                description: 'ส่งออกชุดข้อมูล',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-set',
                code_name: 'export-data-set',
                action: 'export',
              },
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  '637ad9c4-2010-44fc-8dcc-c8953a605460',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/data-set/read-data-set',
                description: 'ดูชุดข้อมูล',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'data-set',
                code_name: 'read-data-set',
                action: 'read',
              },
            },
          },
          {
            name: 'device',
            description: 'device',
            children: {
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  '0239a368-17c2-42c1-afd6-804be99a7952',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/device/read-device',
                description: 'ดูอุปกรณ์',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'device',
                code_name: 'read-device',
                action: 'read',
              },
            },
          },
          {
            name: 'inter-legel',
            description: 'inter-legel',
            children: {
              create: {
                composite: false,
                attributes: {},
                permissionId:
                  '89eb26c3-7892-45f5-a333-98391a6f8760',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/inter-legel/create-inter-legel',
                description: 'เพิ่มกฎหมายระหว่างประเทศ',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'inter-legel',
                code_name: 'create-inter-legel',
                action: 'create',
              },
              delete: {
                composite: false,
                attributes: {},
                permissionId:
                  '663d55b4-2ad9-4483-abbc-e9c13c533071',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/inter-legel/delete-inter-legel',
                description: 'ลบกฎหมายระหว่างประเทศ',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'inter-legel',
                code_name: 'delete-inter-legel',
                action: 'delete',
              },
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  '2b295414-f563-4c63-8542-5a2d67a36bca',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/inter-legel/read-inter-legel',
                description: 'ดูกฎหมายระหว่างประเทศ',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'inter-legel',
                code_name: 'read-inter-legel',
                action: 'read',
              },
              update: {
                composite: false,
                attributes: {},
                permissionId:
                  '55f78b62-c564-4479-81b6-2a4540db6164',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/inter-legel/update-inter-legel',
                description: 'แก้ไขกฎหมายระหว่างประเทศ',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'inter-legel',
                code_name: 'update-inter-legel',
                action: 'update',
              },
            },
          },
          {
            name: 'legel-base',
            description: 'legel-base',
            children: {
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  '17d8cc9d-e061-4f63-a6f3-11764cc7dc95',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/legel-base/read-legel-base',
                description: 'ดูฐานกฎหมาย',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'legel-base',
                code_name: 'read-legel-base',
                action: 'read',
              },
            },
          },
          {
            name: 'org-external',
            description: 'org-external',
            children: {
              create: {
                composite: false,
                attributes: {},
                permissionId:
                  '57706b94-3941-4ddb-9cc3-1fe1820615ab',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/org-external/create-org-external',
                description: 'เพิ่มองค์กรภายนอก',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'org-external',
                code_name: 'create-org-external',
                action: 'create',
              },
              delete: {
                composite: false,
                attributes: {},
                permissionId:
                  '78760b5f-f4da-4a61-ab6c-c34adf1ed795',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/org-external/delete-org-external',
                description: 'ลบองค์กรภายนอก',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'org-external',
                code_name: 'delete-org-external',
                action: 'delete',
              },
              export: {
                composite: false,
                attributes: {},
                permissionId:
                  '3aeaece8-0b86-48d4-b3e6-088c05289644',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/org-external/export-org-external',
                description: 'ส่งออกองค์กรภายนอก',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'org-external',
                code_name: 'export-org-external',
                action: 'export',
              },
              import: {
                composite: false,
                attributes: {},
                permissionId:
                  '8d5c7d6e-cc6d-447b-9b35-c2d8332d32a3',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/org-external/import-org-external',
                description: 'นำเข้าองค์กรภายนอก',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'org-external',
                code_name: 'import-org-external',
                action: 'import',
              },
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  '3ee19106-204c-4f16-aa19-1cc9a802d84d',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/org-external/read-org-external',
                description: 'ดูองค์กรภายนอก',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'org-external',
                code_name: 'read-org-external',
                action: 'read',
              },
              update: {
                composite: false,
                attributes: {},
                permissionId:
                  '8361137a-69ba-4bd3-b552-bb2cc864ea7d',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/org-external/update-org-external',
                description: 'แก้ไของค์กรภายนอก',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'org-external',
                code_name: 'update-org-external',
                action: 'update',
              },
            },
          },
          {
            name: 'purpose',
            description: 'purpose',
            children: {
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  '1c91d56e-52a7-4364-9910-e450db3e7d87',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/purpose/read-purpose',
                description: 'ดูวัตถุประสงค์',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'purpose',
                code_name: 'read-purpose',
                action: 'read',
              },
            },
          },
          {
            name: 'ropa',
            description: 'ropa',
            children: {
              create: {
                composite: false,
                attributes: {},
                permissionId:
                  '8d045ab5-18ec-4db0-bdab-4179eb22f37f',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/ropa/create-ropa',
                description: 'เพิ่มกิจกรรมการประมวลผล',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'ropa',
                code_name: 'create-ropa',
                action: 'create',
              },
              delete: {
                composite: false,
                attributes: {},
                permissionId:
                  'ca10cf5a-6150-441f-84e6-2104fcfbd358',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/ropa/delete-ropa',
                description: 'ลบกิจกรรมการประมวลผล',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'ropa',
                code_name: 'delete-ropa',
                action: 'delete',
              },
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  '4d48d654-64b2-4bed-b921-c98a33725eb9',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/ropa/read-ropa',
                description: 'ดูกิจกรรมการประมวลผล',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'ropa',
                code_name: 'read-ropa',
                action: 'read',
              },
              update: {
                composite: false,
                attributes: {},
                permissionId:
                  '71a7d93a-3de9-4ada-ab6d-c4f8afee8473',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/ropa/update-ropa',
                description: 'แก้ไขกิจกรรมการประมวลผล',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'ropa',
                code_name: 'update-ropa',
                action: 'update',
              },
            },
          },
          {
            name: 'system',
            description: 'system',
            children: {
              create: {
                composite: false,
                attributes: {},
                permissionId:
                  '003ad5fe-5830-4072-880d-9972fa9db238',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/system/create-system',
                description: 'เพิ่มระบบหรือบริการ',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'system',
                code_name: 'create-system',
                action: 'create',
              },
              delete: {
                composite: false,
                attributes: {},
                permissionId:
                  '9fe12b1c-86d4-4aca-8129-e3c4b5ad1576',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/system/delete-system',
                description: 'ลบระบบหรือบริการ',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'system',
                code_name: 'delete-system',
                action: 'delete',
              },
              export: {
                composite: false,
                attributes: {},
                permissionId:
                  'dff722d7-9855-43cc-ac9e-e3f0742ca154',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/system/export-system',
                description: 'ส่งออกระบบหรือบริการ',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'system',
                code_name: 'export-system',
                action: 'export',
              },
              read: {
                composite: false,
                attributes: {},
                permissionId:
                  'ab29fdc8-8c41-415b-9294-cdffc7a532f8',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/system/read-system',
                description: 'ดูระบบหรือบริการ',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'system',
                code_name: 'read-system',
                action: 'read',
              },
              update: {
                composite: false,
                attributes: {},
                permissionId:
                  '764c2b3e-bd68-4333-bd0f-38bed2fa6d82',
                containerId:
                  'fe62d997-0fd9-4507-9562-751787840048',
                name: '__permission/pdpakit/datamap/system/update-system',
                description: 'แก้ไขระบบหรือบริการ',
                prefix: '__permission',
                product: 'pdpakit',
                module: 'datamap',
                page: 'system',
                code_name: 'update-system',
                action: 'update',
              },
            },
          },
        ],
      },
    ],
  },
];
