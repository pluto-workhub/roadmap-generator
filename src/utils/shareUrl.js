import LZString from 'lz-string'
import { validateRoadmapData } from './dataSchema'

const SHARE_HASH_PREFIX = '#share='

/** Base64 → Base64URL（可放 URL 且更短）：+ → -，/ → _，去掉 = */
function toBase64URL(base64) {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** Base64URL → Base64，用于 atob / decompressFromBase64 */
function fromBase64URL(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const pad = (4 - (base64.length % 4)) % 4
  return base64 + '='.repeat(pad)
}

/**
 * 将路线图数据编码为可放在 URL 中的字符串（LZ 压缩 + Base64URL，尽量短）
 */
export function encodeShareData(data) {
  if (!validateRoadmapData(data)) {
    throw new Error('无效的路线图数据')
  }
  const json = JSON.stringify(data)
  const base64 = LZString.compressToBase64(json)
  return toBase64URL(base64)
}

/**
 * 从编码字符串解析回路线图数据（兼容 LZ-EncodedURI、旧 Base64 链接）
 */
export function decodeShareData(encoded) {
  if (!encoded || typeof encoded !== 'string') return null
  try {
    // 1) 新格式：LZ compressToBase64 + Base64URL
    const base64 = fromBase64URL(encoded)
    let json = LZString.decompressFromBase64(base64)
    if (json == null) {
      // 2) 旧格式：LZ compressToEncodedURIComponent
      json = LZString.decompressFromEncodedURIComponent(encoded)
    }
    if (json == null) {
      // 3) 最旧：纯 Base64 未压缩
      json = decodeURIComponent(atob(encoded))
    }
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
