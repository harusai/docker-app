const express = require('express');
const { UserController } = require('./user.controller');

const router = express.Router();
const userController = new UserController();

//=======================================================
// User Management
//=======================================================
// 모든 사용자 조회
router.get('/', userController.getAllUsers.bind(userController));

// 특정 사용자 조회
router.get('/:id', userController.getUserById.bind(userController));

// 사용자 생성
router.post('/', userController.createUser.bind(userController));

// 사용자 수정
router.put('/:id', userController.updateUser.bind(userController));

// 사용자 삭제
router.delete('/:id', userController.deleteUser.bind(userController));


//=======================================================
// User-Role Management
//=======================================================

// 사용자에게 역할 할당
router.post('/:id/roles', userController.assignRoles.bind(userController));

// 사용자의 역할 목록 조회
router.get('/:id/roles', userController.getRoles.bind(userController));


//=======================================================
// User-Group Management
//=======================================================

// 그룹 생성
router.post('/groups', userController.createGroup.bind(userController));

// 모든 그룹 조회
router.get('/groups', userController.getAllGroups.bind(userController));

// 특정 그룹 조회 및 업데이트, 삭제
router.route('/groups/:groupId')
    .get(userController.getGroupById.bind(userController))
    .put(userController.updateGroup.bind(userController))
    .delete(userController.deleteGroup.bind(userController));

// --- 그룹 매핑 라우트 ---

// 그룹에 사용자 추가
router.post('/groups/:groupId/users', userController.addUserToGroup.bind(userController));

// 그룹의 모든 사용자 조회
router.get('/groups/:groupId/users', userController.getUsersInGroup.bind(userController));

// 그룹에서 사용자 제거
router.delete('/groups/:groupId/users/:userId', userController.removeUserFromGroup.bind(userController));

//=======================================================
// User-Password Management
//=======================================================

// 비밀번호 업데이트
router.put('/:id/password', userController.updatePassword.bind(userController));

// 비밀번호 실패 횟수 초기화 (관리자용)
router.post('/:id/password/reset-fail-count', userController.resetPasswordFailCount.bind(userController));

// 계정 잠금 (관리자용)
router.post('/:id/lock', userController.lockUserAccount.bind(userController));

// 계정 잠금 해제 (관리자용)
router.post('/:id/unlock', userController.unlockUserAccount.bind(userController));



module.exports = router;