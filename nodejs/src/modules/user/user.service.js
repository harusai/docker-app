// user.service.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 모든 사용자 조회
exports.findAll = async () => {
    return prisma.user.findMany();
};

// ID로 사용자 조회
exports.findById = async (id) => {
    return prisma.user.findUnique({
        where: { id: parseInt(id) },
    });
};

// 사용자 생성
exports.create = async (userData) => {
    const { username, email } = userData;
    return prisma.user.create({
        data: { username, email },
    });
};

// 사용자 업데이트
exports.update = async (id, updateData) => {
    const { username, email } = updateData;
    return prisma.user.update({
        where: { id: parseInt(id) },
        data: { username, email },
    });
};

// 사용자 삭제
exports.delete = async (id) => {
    return prisma.user.delete({
        where: { id: parseInt(id) },
    });
};