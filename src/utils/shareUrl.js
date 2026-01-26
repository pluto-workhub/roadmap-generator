import { validateRoadmapData } from './dataSchema'

const SHARE_HASH_PREFIX = '#share='

/**
 * 将路线图数据编码为可放在 URL 中的字符串（Base64）
 */
export function encodeShareData(data) {
  if (!validateRoadmapData(data)) {
    throw new Error('无效的路线图数据')
  }
  const json = JSON.stringify(data)
  return btoa(encodeURIComponent(json))
}

/**
 * 从编码字符串解析回路线图数据
 */
export function decodeShareData(encoded) {
  if (!encoded || typeof encoded !== 'string') return null
  try {
    const json = decodeURIComponent(atob(encoded))
    const data = JSON.parse(json)
    return validateRoadmapData(data) ? data : null
  } catch {
    return null
  }
}

/**
 * 从当前页面 URL 中读取分享数据（支持 hash #share= 或 search ?share=）
 */
export function getShareDataFromUrl() {
  const hash = window.location.hash
  if (hash.startsWith(SHARE_HASH_PREFIX)) {
    const encoded = hash.slice(SHARE_HASH_PREFIX.length).trim()
    return decodeShareData(encoded)
  }
  const params = new URLSearchParams(window.location.search)
  const shareParam = params.get('share')
  if (shareParam) {
    return decodeShareData(shareParam)
  }
  return null
}

/**
 * 生成当前路线图的分享 URL（不含 origin，便于同站使用）
 */
export function buildShareUrl(data) {
  const encoded = encodeShareData(data)
  const path = window.location.pathname || '/'
  return `${window.location.origin}${path}#share=${encoded}`
}
