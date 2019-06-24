/**
 * 请求参数封装方法
 */
import Fetch from './fetch'

/** ************************************ 登录接口 ****************************************************/
export const AjaxLogin = (user) => Fetch(`/ajaxLogin?name=${user.name}&password=${user.password}`)
// 登出
export const logout = () => Fetch('/logout')

/** ************************************ 任务接口 ****************************************************/
// 获取所有任务
export const getAllJob = (pageSize, pageIndex) => Fetch(`/job?pageSize=${pageSize}&pageIndex=${pageIndex}`)

// 添加任务
export const addTask = (data) => Fetch(`/job/add/`, 'POST', data)

// 更新任务
export const updateTask = (id, data) => Fetch(`/job/update/${id}`, 'PUT', data)

// 修改任务状态
export const changeTask = (id, status, data) => Fetch(`/job/${status}/${id}`, status === 'delete' ? 'DELETE' : 'PUT', data)

/** ************************************ 触发器接口 ****************************************************/
// 插入获取保存触发器
export const saveCron = (data) => {
  return Fetch(`/cron/save`, 'PUT', data)
}

// 获取所有触发器
export const getAllCron = (pageSize, pageIndex) => Fetch(`/cron?pageSize=${pageSize}&pageIndex=${pageIndex}`)

// 根据id获取触发器
export const getOneCron = (id) => Fetch(`/cron/${id}`)

/** ************************************ 资产接口 ****************************************************/
// 获取资产列表
export const getAssets = (pageSize, pageIndex) => Fetch(`/assets?pageSize=${pageSize}&pageIndex=${pageIndex}`)

// 插入/更新资产列表
export const saveAssets = (data) => Fetch(`/assets/save`, 'PUT', data)

/** ************************************ 通用接口 ****************************************************/
// 获取所有下拉
export const getSelect = (type) => Fetch(`/comm/select/${type}`)

/** ************************************ 权限管理接口 ****************************************************/
// 获取用户列表
export const getUserList = (pageSize, pageIndex) => Fetch(`/user?pageSize=${pageSize}&pageIndex=${pageIndex}`)
// 根据用户ID获取用户信息
export const getUserDetail = (id) => Fetch(`/user/${id}`)
// 修改用户密码
export const changePwa = (data) => Fetch(`/user/changePwa`, 'PUT', data)
// 删除用户（逻辑删除）
export const deleteUser = (ids) => Fetch(`/user/${ids}`, 'DELETE')
// 更新插入用户
export const saveUser = (data) => Fetch(`/user/save`, 'PUT', data)
// 获取角色列表
export const getRoleList = (pageSize, pageIndex) => Fetch(`/role?pageSize=${pageSize}&pageIndex=${pageIndex}`)
// 根据角色ID获取角色信息
export const getRoleDetail = (id) => Fetch(`/role/${id}`)
// 更新插入角色
export const saveRole = (data) => Fetch(`/role/save`, 'PUT', data)
// 删除角色（逻辑删除）
export const deleteRole = (ids) => Fetch(`/role/${ids}`, 'DELETE')
// 获取菜单树
export const getTree = (roleId) => Fetch(`/permiss/tree/${roleId}`)
// 获取角色菜单关联
export const getMenuForRole = (roleId) => Fetch(`/permiss/getMenuForRole/${roleId}`)
// 保存角色菜单关联
export const saveMenuForRole = (roleId, data) => Fetch(`/permiss/saveMenuForRole/${roleId}`, 'PUT', data)
// 根据角色ID获取用户列表
export const getUserRoleList = (roleId, pageSize, pageIndex, isUser) => Fetch(`/role/user/${roleId}?pageSize=${pageSize}&pageIndex=${pageIndex}&isUser=${isUser}`)
// 保存用户角色关联
export const saveUserRole = (users, roleId) => Fetch(`/role/userRole/${roleId}`, 'PUT', users)
// 删除用户角色关联
export const deleteUserRole = (users, roleId) => Fetch(`/role/userRoles/${roleId}`, 'PUT', users)
// 菜单权限接口
export const getMenuPath = (roleId) => Fetch(`/permiss/${roleId}`)
// 菜单权限接口
export const saveMenu = (data) => Fetch(`/permiss/saveMenu`, 'PUT', data)
