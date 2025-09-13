const { PrismaClient } = require('@prisma/client');

class UserService {
    constructor() {
        this.prisma = new PrismaClient();
    }


    //=======================================================
    // User Management
    //=======================================================
    /**
     * 모든 사용자를 데이터베이스에서 조회합니다.
     */
    async findAllUsers() {
        return this.prisma.sBCOM_USER.findMany();
    }

    /**
     * ID로 특정 사용자를 조회합니다.
     */
    async findUserById(id) {
        return this.prisma.sBCOM_USER.findUnique({
            where: { ID: id },
            include: {
                COMPANY_FK: true,
                USER_ROLE_MAPPING: true,
                USER_GROUP_MAPPING: true,
            },
        });
    }

    /**
     * 새로운 사용자를 생성합니다.
     */
    async createUser(data) {
        return this.prisma.sBCOM_USER.create({ data });
    }

    /**
     * 특정 사용자를 업데이트합니다.
     */
    async updateUser(id, data) {
        return this.prisma.sBCOM_USER.update({
            where: { ID: id },
            data,
        });
    }

    /**
     * 특정 사용자를 삭제합니다.
     */
    async deleteUser(id) {
        return this.prisma.sBCOM_USER.delete({
            where: { ID: id },
        });
    }



    //=======================================================
    // User-Role Management
    //=======================================================
    /**
     * 사용자에게 역할을 부여합니다.
     * @param {number} userId - 역할을 부여할 사용자 ID
     * @param {number[]} roleIds - 부여할 역할 ID 목록
     */
    async assignRolesToUser(userId, roleIds) {
        // 기존 매핑 삭제 (선택적: 전체 교체)
        await this.prisma.sBCOM_USER_ROLE_MAPPING.deleteMany({
            where: { USER_ID: userId },
        });

        // 새로운 매핑 생성
        const userRoleMappings = roleIds.map(roleId => ({
            USER_ID: userId,
            ROLE_ID: roleId,
        }));

        return this.prisma.sBCOM_USER_ROLE_MAPPING.createMany({
            data: userRoleMappings,
        });
    }

    /**
     * 사용자가 가진 역할을 조회합니다.
     * @param {number} userId - 조회할 사용자 ID
     */
    async getUserRoles(userId) {
        return this.prisma.sBCOM_USER_ROLE_MAPPING.findMany({
            where: { USER_ID: userId },
            include: {
                ROLE_FK: true, // ROLE_FK는 Prisma 스키마의 관계명에 따라 달라질 수 있습니다.
            },
        });
    }

    //=======================================================
    // User-Group Management
    //=======================================================
    async createGroup(data) {
        return this.prisma.sBCOM_USER_GROUP.create({ data });
    }

    async findAllGroups() {
        return this.prisma.sBCOM_USER_GROUP.findMany();
    }

    async findGroupById(groupId) {
        return this.prisma.sBCOM_USER_GROUP.findUnique({
            where: { GROUP_ID: groupId },
        });
    }

    async updateGroup(groupId, data) {
        return this.prisma.sBCOM_USER_GROUP.update({
            where: { GROUP_ID: groupId },
            data,
        });
    }

    async deleteGroup(groupId) {
        // 그룹 삭제 시 매핑된 사용자도 함께 삭제
        await this.prisma.sBCOM_USER_GROUP_MAPPING.deleteMany({
            where: { GROUP_ID: groupId },
        });
        return this.prisma.sBCOM_USER_GROUP.delete({
            where: { GROUP_ID: groupId },
        });
    }

    // --- 그룹 매핑 메서드 ---

    async addUserToGroup(groupId, userId) {
        // COMPANY_ID는 USER_ID를 통해 찾을 수 있어야 합니다.
        const user = await this.prisma.sBCOM_USER.findUnique({
            where: { USER_ID: userId },
            select: { COMPANY_ID: true },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return this.prisma.sBCOM_USER_GROUP_MAPPING.create({
            data: {
                COMPANY_ID: user.COMPANY_ID,
                GROUP_ID: groupId,
                USER_ID: userId,
            },
        });
    }

    async removeUserFromGroup(groupId, userId) {
        // COMPANY_ID를 복합 키로 사용
        const user = await this.prisma.sBCOM_USER.findUnique({
            where: { USER_ID: userId },
            select: { COMPANY_ID: true },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return this.prisma.sBCOM_USER_GROUP_MAPPING.delete({
            where: {
                // Prisma에서 복합 키를 사용하는 방식에 따라 달라질 수 있습니다.
                // Prisma는 복합 유니크 키를 `(field1_field2_...)` 형태로 표현합니다.
                COMPANY_ID_GROUP_ID_USER_ID: {
                    COMPANY_ID: user.COMPANY_ID,
                    GROUP_ID: groupId,
                    USER_ID: userId,
                },
            },
        });
    }

    async findUsersInGroup(groupId) {
        return this.prisma.sBCOM_USER_GROUP_MAPPING.findMany({
            where: { GROUP_ID: groupId },
            include: {
                USER_FK: true,
            },
        });
    }
    //=======================================================
    // User-Password Management
    //=======================================================
    /**
     * 사용자의 비밀번호를 업데이트합니다.
     * 비밀번호는 해시 처리됩니다.
     */
    async updateUserPassword(id, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

        // SBCOM_PASSWORD 테이블 업데이트
        return this.prisma.sBCOM_PASSWORD.update({
            where: { ID: id },
            data: {
                PASSWORD: hashedPassword,
                PASSWORD_FAIL_CNT: 0,
                PASSWORD_CHANGE_DT: new Date(),
                LAST_CHANGE_DT: new Date(),
                LOCK_YN: 'N',
            },
        });
    }

    /**
     * 비밀번호 실패 횟수를 증가시키고, 실패 횟수가 특정 횟수를 초과하면 계정을 잠급니다.
     */
    async incrementPasswordFailCount(id) {
        const userPassword = await this.prisma.sBCOM_PASSWORD.findUnique({
            where: { ID: id },
        });

        if (!userPassword) {
            throw new Error('User password data not found');
        }

        const newFailCount = (userPassword.PASSWORD_FAIL_CNT || 0) + 1;

        let updateData = {
            PASSWORD_FAIL_CNT: newFailCount,
        };

        // 예시: 5회 실패 시 계정 잠금
        if (newFailCount >= 5) {
            updateData.LOCK_YN = 'Y';
        }

        return this.prisma.sBCOM_PASSWORD.update({
            where: { ID: id },
            data: updateData,
        });
    }

    /**
     * 비밀번호 실패 횟수를 0으로 초기화하고 계정 잠금을 해제합니다.
     */
    async resetPasswordFailCount(id) {
        return this.prisma.sBCOM_PASSWORD.update({
            where: { ID: id },
            data: {
                PASSWORD_FAIL_CNT: 0,
                LOCK_YN: 'N',
            },
        });
    }

    /**
     * 사용자의 계정을 명시적으로 잠급니다.
     */
    async lockUserAccount(id) {
        return this.prisma.sBCOM_PASSWORD.update({
            where: { ID: id },
            data: { LOCK_YN: 'Y' },
        });
    }

    /**
     * 사용자의 계정을 명시적으로 잠금 해제합니다.
     */
    async unlockUserAccount(id) {
        return this.prisma.sBCOM_PASSWORD.update({
            where: { ID: id },
            data: { LOCK_YN: 'N' },
        });
    }





}

module.exports = { UserService };