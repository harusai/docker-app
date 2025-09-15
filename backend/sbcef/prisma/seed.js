// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
   console.log('Starting CEF data seeding...');
// 기존 데이터 삭제 (선택 사항)
  // 시드 스크립트를 여러 번 실행할 때 중복 데이터가 쌓이는 것을 방지합니다.
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  // 사용자 데이터 upsert
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {
            username: 'admin',
        },
        create: {
            username: 'admin',
            email: 'admin@example.com',
        },
    });
    console.log('User upserted:', admin.username);

    // 게시물 데이터 삭제 후 새로 생성
    await prisma.post.deleteMany({
        where: { userId: admin.id },
    });

    await prisma.post.createMany({
        data: [
            {
                title: '첫 번째 게시물',
                content: '안녕하세요',
                userId: admin.id,
            },
            {
                title: '두 번째 게시물',
                content: 'Node.js는 멋져요',
                userId: admin.id,
            },
        ],
    });
    console.log('CEF Posts created for admin user.');

    console.log('CEF All initial data seeding completed successfully! 🎉');



  // // 초기 사용자 데이터 삽입 (init.sql의 INSERT 문 대체)
  // const admin = await prisma.user.create({
  //   data: {
  //     username: 'admin',
  //     email: 'admin@example.com',
  //   }
  // });

  // // 초기 게시물 데이터 삽입 (init.sql의 INSERT 문 대체)
  // await prisma.post.createMany({
  //   data: [
  //     {
  //       title: '첫 번째 게시물',
  //       content: '안녕하세요',
  //       userId: admin.id,
  //     },
  //     {
  //       title: '두 번째 게시물',
  //       content: 'Node.js는 멋져요',
  //       userId: admin.id,
  //     },
  //   ],
  // });
  console.log('ASL 초기 데이터 삽입 완료');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });