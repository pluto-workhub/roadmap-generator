/**
 * Roadmap 数据 Schema 定义
 */

/**
 * 生成唯一 ID
 */
export const generateId = () => {
  return `m${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 生成内容块 ID
 */
export const generateBlockId = () => {
  return `b${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 验证数据格式
 */
export const validateRoadmapData = (data) => {
  if (!data || typeof data !== 'object') return false
  if (!data.meta || !data.milestones) return false
  if (!Array.isArray(data.milestones)) return false
  return true
}

/**
 * 创建默认里程碑
 */
export const createDefaultMilestone = () => ({
  id: generateId(),
  date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
  title: '新里程碑',
  description: '',
  status: 'planning', // planning, warning, success, danger, info
  icon: 'fa-circle',
  blocks: []
})

/**
 * 创建默认内容块
 */
export const createDefaultBlock = (type = 'list') => {
  const baseBlock = {
    id: generateBlockId(),
    type
  }

  switch (type) {
    case 'list':
      return {
        ...baseBlock,
        title: '',
        icon: 'fa-list',
        items: [{ text: '', icon: 'fa-check' }]
      }
    case 'alert':
      return {
        ...baseBlock,
        variant: 'warning', // warning, danger, info
        icon: 'fa-circle-exclamation',
        title: '',
        content: '',
        subtitle: '',
        badge: ''
      }
    case 'info':
      return {
        ...baseBlock,
        variant: 'indigo',
        icon: 'fa-info-circle',
        title: '',
        badge: '',
        date: '',
        description: ''
      }
    case 'tbd':
      return {
        ...baseBlock,
        variant: 'orange',
        icon: 'fa-question-circle',
        title: '',
        content: ''
      }
    case 'complex-list':
      return {
        ...baseBlock,
        items: [{
          icon: 'fa-star',
          iconBg: 'blue',
          title: '',
          description: ''
        }]
      }
    case 'section':
      return {
        ...baseBlock,
        title: ''
      }
    default:
      return baseBlock
  }
}
