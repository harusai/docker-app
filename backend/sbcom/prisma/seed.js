// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 기존 데이터 삭제 (선택 사항)
  // 시드 스크립트를 여러 번 실행할 때 중복 데이터가 쌓이는 것을 방지합니다.
  console.log('Clearing existing data...');
  await prisma.SBCOM_ALARM_USER_GROUP_MAPPING.deleteMany({});
  await prisma.SBCOM_ALARM_USER_GROUP.deleteMany({});
  await prisma.SBCOM_ALARM.deleteMany({});
  await prisma.SBCOM_ROLE_MENU_MAPPING.deleteMany({});
  await prisma.SBCOM_MENU_MAPPING.deleteMany({});
  await prisma.SBCOM_MENU.deleteMany({});
  await prisma.SBCOM_USER_ROLE_MAPPING.deleteMany({});
  await prisma.SBCOM_PASSWORD.deleteMany({});
  await prisma.SBCOM_USER.deleteMany({});
  await prisma.SBCOM_ROLE.deleteMany({});
  await prisma.SBCOM_COMPANY.deleteMany({});
  await prisma.SBCOM_CODE_DETAIL.deleteMany({});
  await prisma.SBCOM_CODE_MASTER.deleteMany({});
  await prisma.SBCOM_SCREEN.deleteMany({});
  await prisma.SBCOM_NOTICE.deleteMany({});
  await prisma.SBCOM_SYS_ENV.deleteMany({});
  await prisma.SBCOM_USER_GROUP_MAPPING.deleteMany({});
  await prisma.SBCOM_USER_GROUP.deleteMany({});
  
  console.log('Existing data cleared.');

  // Insert initial data based on schema.prisma
  console.log('Starting data seeding...');
  
  // 1. SBCOM_COMPANY
  const company = await prisma.SBCOM_COMPANY.create({
    data: {
      COMPANY_ID: 'COMP001',
      COMPANY_NM: 'Southbottle Co.',
      COMPANY_TYPE: 'HEAD',
      USE_YN: 'Y'
    },
  });
  console.log('Company created:', company.COMPANY_ID);

  // 2. SBCOM_USER
  const admin = await prisma.SBCOM_USER.create({
    data: {
      COMPANY_ID: 'COMP001',
      USER_ID: 'ADMIN',
      USER_NM: 'Administrator',
      USER_TY: '02' // 02: Administrator
    },
  });
  
  const user = await prisma.SBCOM_USER.create({
    data: {
      COMPANY_ID: 'COMP001',
      USER_ID: 'USER01',
      USER_NM: 'General User',
      USER_TY: '01' // 01: General User
    },
  });
  console.log('Users created:', admin.USER_ID, user.USER_ID);

  // 3. SBCOM_PASSWORD
  // In a real application, you'd hash passwords before storing them.
  await prisma.SBCOM_PASSWORD.create({
    data: {
      COMPANY_ID: 'COMP001',
      USER_ID: 'ADMIN',
      PASSWORD: 'hashed_admin_password_123',
    },
  });
  console.log('Password for ADMIN created.');

  // 4. SBCOM_ROLE
  await prisma.SBCOM_ROLE.createMany({
    data: [
      {
        COMPANY_ID: 'COMP001',
        ROLE_CD: 'ROLE_ADMIN',
        ROLE_NM: 'System Administrator',
        ROLE_DESC: 'Role with full system access.'
      },
      {
        COMPANY_ID: 'COMP001',
        ROLE_CD: 'ROLE_USER',
        ROLE_NM: 'Standard User',
        ROLE_DESC: 'Role with limited system access.'
      }
    ],
  });
  console.log('Roles created.');

  // 5. SBCOM_USER_ROLE_MAPPING
  await prisma.SBCOM_USER_ROLE_MAPPING.createMany({
    data: [
      {
        COMPANY_ID: 'COMP001',
        USER_ID: 'ADMIN',
        ROLE_CD: 'ROLE_ADMIN',
        VALID_PERIOD_STA_DT: '20220101',
        VALID_PERIOD_END_DT: '99991231'
      },
      {
        COMPANY_ID: 'COMP001',
        USER_ID: 'USER01',
        ROLE_CD: 'ROLE_USER',
        VALID_PERIOD_STA_DT: '20220101',
        VALID_PERIOD_END_DT: '99991231'
      }
    ]
  });
  console.log('User-role mappings created.');

  // 6. SBCOM_MENU
  await prisma.SBCOM_MENU.createMany({
    data: [
      {
        COMPANY_ID: 'COMP001',
        OWNER_ID: 'ADMIN',
        MENU_ID: 'MNU001',
        MENU_CD: 'DASHBOARD',
        MENU_NM: 'Dashboard',
        DISPLAY_ORDER: 1,
      },
      {
        COMPANY_ID: 'COMP001',
        OWNER_ID: 'ADMIN',
        MENU_ID: 'MNU002',
        MENU_CD: 'USER_MGMT',
        MENU_NM: 'User Management',
        DISPLAY_ORDER: 2,
      },
      {
        COMPANY_ID: 'COMP001',
        OWNER_ID: 'ADMIN',
        MENU_ID: 'MNU003',
        MENU_CD: 'NOTICE',
        MENU_NM: 'Notice Board',
        DISPLAY_ORDER: 3,
      }
    ]
  });
  console.log('Menus created.');
  
  // 7. SBCOM_ROLE_MENU_MAPPING
  await prisma.SBCOM_ROLE_MENU_MAPPING.createMany({
    data: [
      // Admin has full access to all menus
      {
        COMPANY_ID: 'COMP001',
        ROLE_CD: 'ROLE_ADMIN',
        MENU_ID: 'MNU001',
        SEARCH_YN: 'Y',
        CREATE_YN: 'Y',
        UPDATE_YN: 'Y',
        DELETE_YN: 'Y',
      },
      {
        COMPANY_ID: 'COMP001',
        ROLE_CD: 'ROLE_ADMIN',
        MENU_ID: 'MNU002',
        SEARCH_YN: 'Y',
        CREATE_YN: 'Y',
        UPDATE_YN: 'Y',
        DELETE_YN: 'Y',
      },
      {
        COMPANY_ID: 'COMP001',
        ROLE_CD: 'ROLE_ADMIN',
        MENU_ID: 'MNU003',
        SEARCH_YN: 'Y',
        CREATE_YN: 'Y',
        UPDATE_YN: 'Y',
        DELETE_YN: 'Y',
      },
      // Standard user has read-only access to some menus
      {
        COMPANY_ID: 'COMP001',
        ROLE_CD: 'ROLE_USER',
        MENU_ID: 'MNU001',
        SEARCH_YN: 'Y',
      },
      {
        COMPANY_ID: 'COMP001',
        ROLE_CD: 'ROLE_USER',
        MENU_ID: 'MNU003',
        SEARCH_YN: 'Y',
      }
    ]
  });
  console.log('Role-menu mappings created.');

  // 8. SBCOM_CODE_MASTER
  await prisma.SBCOM_CODE_MASTER.createMany({
    data: [
      {
        COMPANY_ID: 'COMP001',
        MASTER_CD: 'USER_TYPE',
        MASTER_NM: 'User Type',
        USE_YN: 'Y',
      },
      {
        COMPANY_ID: 'COMP001',
        MASTER_CD: 'NOTICE_TYPE',
        MASTER_NM: 'Notice Type',
        USE_YN: 'Y',
      }
    ]
  });
  console.log('Code masters created.');

  // 9. SBCOM_CODE_DETAIL
  await prisma.SBCOM_CODE_DETAIL.createMany({
    data: [
      {
        COMPANY_ID: 'COMP001',
        MASTER_CD: 'USER_TYPE',
        CD_VALUE: '01',
        CD_NM: 'General User',
        DISPLAY_ORDER: 1,
      },
      {
        COMPANY_ID: 'COMP001',
        MASTER_CD: 'USER_TYPE',
        CD_VALUE: '02',
        CD_NM: 'Administrator',
        DISPLAY_ORDER: 2,
      },
      {
        COMPANY_ID: 'COMP001',
        MASTER_CD: 'NOTICE_TYPE',
        CD_VALUE: 'ALERT',
        CD_NM: 'Alert',
        DISPLAY_ORDER: 1,
      },
      {
        COMPANY_ID: 'COMP001',
        MASTER_CD: 'NOTICE_TYPE',
        CD_VALUE: 'INFO',
        CD_NM: 'Information',
        DISPLAY_ORDER: 2,
      }
    ]
  });
  console.log('Code details created.');

  // 10. SBCOM_NOTICE
  await prisma.SBCOM_NOTICE.create({
    data: {
      COMPANY_ID: 'COMP001',
      NOTICE_ID: 'NOTI001',
      NOTICE_TITLE: 'System Maintenance Notice',
      NOTICE_CONTENT: 'System will be unavailable on Saturday from 2 AM to 4 AM KST.',
      NOTICE_TYPE: 'ALERT',
      IMPORTANT_YN: 'Y',
      START_DT: '20250915',
      END_DT: '20250917',
    },
  });
  console.log('Notice created.');

  console.log('All initial data seeding completed successfully! 🎉');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });