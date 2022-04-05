import { UPDATE_HEAD_TITLE, UPDATE_CURRENT_USER } from '@/utils/constant';

export const updateHeadTitle = (payload) => ({
  type: UPDATE_HEAD_TITLE,
  payload
})


export const updateCurrentUser = (payload) => ({
  type: UPDATE_CURRENT_USER,
  payload
})