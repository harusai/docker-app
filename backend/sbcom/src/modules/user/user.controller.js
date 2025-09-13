const { UserService } = require('./user.service');

class UserController {
    constructor() {
        this.userService = new UserService();
    }


    //=======================================================
    // User Management
    //=======================================================
    /**
     * 모든 사용자를 조회합니다.
     */
    async getAllUsers(req, res, next) {
        try {
            const users = await this.userService.findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    /**
     * 특정 사용자를 ID로 조회합니다.
     */
    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await this.userService.findUserById(Number(id));
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    /**
     * 새로운 사용자를 생성합니다.
     */
    async createUser(req, res, next) {
        try {
            const userData = req.body;
            const newUser = await this.userService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    /**
     * 특정 사용자를 ID로 업데이트합니다.
     */
    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const userData = req.body;
            const updatedUser = await this.userService.updateUser(Number(id), userData);
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    /**
     * 특정 사용자를 ID로 삭제합니다.
     */
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(Number(id));
            res.status(204).send(); // No Content
        } catch (error) {
            next(error);
        }
    }

    //=======================================================
    // User-Role Management
    //=======================================================
    /**
      * 사용자에게 역할을 할당합니다.
      */
    async assignRoles(req, res, next) {
        try {
            const { id } = req.params;
            const { roleIds } = req.body; // 역할 ID 목록을 요청 본문에서 받음
            const result = await this.userService.assignRolesToUser(Number(id), roleIds);
            res.status(200).json({ message: 'Roles assigned successfully', result });
        } catch (error) {
            next(error);
        }
    }

    /**
     * 사용자의 역할 목록을 조회합니다.
     */
    async getRoles(req, res, next) {
        try {
            const { id } = req.params;
            const roles = await this.userService.getUserRoles(Number(id));
            res.status(200).json(roles);
        } catch (error) {
            next(error);
        }
    }

    //=======================================================
    // User-Group Management
    //=======================================================
    /**
   * 새로운 사용자 그룹을 생성합니다.
   */
    async createGroup(req, res, next) {
        try {
            const groupData = req.body;
            const newGroup = await this.userService.createGroup(groupData);
            res.status(201).json(newGroup);
        } catch (error) {
            next(error);
        }
    }

    /**
     * 모든 사용자 그룹을 조회합니다.
     */
    async getAllGroups(req, res, next) {
        try {
            const groups = await this.userService.findAllGroups();
            res.status(200).json(groups);
        } catch (error) {
            next(error);
        }
    }

    /**
     * 특정 사용자 그룹을 ID로 조회합니다.
     */
    async getGroupById(req, res, next) {
        try {
            const { groupId } = req.params;
            const group = await this.userService.findGroupById(groupId);
            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }
            res.status(200).json(group);
        } catch (error) {
            next(error);
        }
    }

    /**
     * 특정 그룹을 ID로 업데이트합니다.
     */
    async updateGroup(req, res, next) {
        try {
            const { groupId } = req.params;
            const groupData = req.body;
            const updatedGroup = await this.userService.updateGroup(groupId, groupData);
            res.status(200).json(updatedGroup);
        } catch (error) {
            next(error);
        }
    }

    /**
     * 특정 그룹을 ID로 삭제합니다.
     */
    async deleteGroup(req, res, next) {
        try {
            const { groupId } = req.params;
            await this.userService.deleteGroup(groupId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    // --- 그룹 매핑 관련 메서드 ---

    /**
     * 사용자 그룹에 사용자를 추가합니다.
     */
    async addUserToGroup(req, res, next) {
        try {
            const { groupId } = req.params;
            const { userId } = req.body;
            const result = await this.userService.addUserToGroup(groupId, userId);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
     * 사용자 그룹에서 사용자를 제거합니다.
     */
    async removeUserFromGroup(req, res, next) {
        try {
            const { groupId, userId } = req.params;
            await this.userService.removeUserFromGroup(groupId, userId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    /**
     * 특정 그룹의 모든 사용자를 조회합니다.
     */
    async getUsersInGroup(req, res, next) {
        try {
            const { groupId } = req.params;
            const users = await this.userService.findUsersInGroup(groupId);
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    //=======================================================
    // User-Password Management
    //=======================================================
    /**
      * 사용자의 비밀번호를 업데이트합니다.
      */
    async updatePassword(req, res, next) {
        try {
            const { id } = req.params;
            const { newPassword } = req.body;
            await this.userService.updateUserPassword(Number(id), newPassword);
            res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    /**
     * 사용자의 비밀번호 실패 횟수를 초기화합니다.
     */
    async resetPasswordFailCount(req, res, next) {
        try {
            const { id } = req.params;
            await this.userService.resetPasswordFailCount(Number(id));
            res.status(200).json({ message: 'Password fail count reset successfully' });
        } catch (error) {
            next(error);
        }
    }

    /**
     * 사용자의 계정을 잠급니다.
     */
    async lockUserAccount(req, res, next) {
        try {
            const { id } = req.params;
            await this.userService.lockUserAccount(Number(id));
            res.status(200).json({ message: 'User account locked' });
        } catch (error) {
            next(error);
        }
    }

    /**
     * 사용자의 계정을 잠금 해제합니다.
     */
    async unlockUserAccount(req, res, next) {
        try {
            const { id } = req.params;
            await this.userService.unlockUserAccount(Number(id));
            res.status(200).json({ message: 'User account unlocked' });
        } catch (error) {
            next(error);
        }
    }







}

module.exports = { UserController };