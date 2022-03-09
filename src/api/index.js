import {
  login,
  getCode
} from './login'
import { user } from './my'
import { getUserChannels, getChannelArticle } from './home'

export const loginApi = login
export const getCodeApi = getCode
export const getUserApi = user
export const getUserChannelsApi = getUserChannels
export const getChannelArticleApi = getChannelArticle
