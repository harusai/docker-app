// user.service.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 모든 조회
exports.findAll = async () => {
    return prisma.order.findMany();
};

// ID로 조회
exports.findById = async (id) => {
    return prisma.order.findUnique({
        where: { id: parseInt(id) },
    });
};
