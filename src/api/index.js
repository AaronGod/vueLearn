import {
  login,
  getCode
} from './login'
import { user } from './my'
import { getUserChannels, getAllChannels, getChannelArticle, addUserChannels, delateUserChannels } from './home'
import { searchSuggest, searchResult } from './search'

export const loginApi = login
export const getCodeApi = getCode
export const getUserApi = user
export const getUserChannelsApi = getUserChannels
export const getAllChannelsApi = getAllChannels
export const getChannelArticleApi = getChannelArticle
export const addUserChannelsApi = addUserChannels
export const delateUserChannelsApi = delateUserChannels
export const getSearchSuggestApi = searchSuggest
export const getSearchResultApi = searchResult
