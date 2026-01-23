import { useState, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { defaultRoadmapData } from '../data/defaultData'
import { createDefaultMilestone, createDefaultBlock, generateId, generateBlockId } from '../utils/dataSchema'

const STORAGE_KEY = 'roadmap-generator-data'

/**
 * Roadmap 数据管理 Hook
 */
export const useRoadmapData = () => {
  const [data, setData] = useLocalStorage(STORAGE_KEY, defaultRoadmapData)

  // 更新元数据
  const updateMeta = useCallback((updates) => {
    setData(prev => ({
      ...prev,
      meta: { ...prev.meta, ...updates }
    }))
  }, [setData])

  // 添加里程碑
  const addMilestone = useCallback(() => {
    const newMilestone = createDefaultMilestone()
    setData(prev => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone]
    }))
    return newMilestone.id
  }, [setData])

  // 更新里程碑
  const updateMilestone = useCallback((id, updates) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m =>
        m.id === id ? { ...m, ...updates } : m
      )
    }))
  }, [setData])

  // 删除里程碑
  const deleteMilestone = useCallback((id) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== id)
    }))
  }, [setData])

  // 重新排序里程碑
  const reorderMilestones = useCallback((startIndex, endIndex) => {
    setData(prev => {
      const newMilestones = Array.from(prev.milestones)
      const [removed] = newMilestones.splice(startIndex, 1)
      newMilestones.splice(endIndex, 0, removed)
      return {
        ...prev,
        milestones: newMilestones
      }
    })
  }, [setData])

  // 添加内容块
  const addBlock = useCallback((milestoneId, blockType = 'list') => {
    const newBlock = createDefaultBlock(blockType)
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m =>
        m.id === milestoneId
          ? { ...m, blocks: [...m.blocks, newBlock] }
          : m
      )
    }))
    return newBlock.id
  }, [setData])

  // 更新内容块
  const updateBlock = useCallback((milestoneId, blockId, updates) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m =>
        m.id === milestoneId
          ? {
              ...m,
              blocks: m.blocks.map(b =>
                b.id === blockId ? { ...b, ...updates } : b
              )
            }
          : m
      )
    }))
  }, [setData])

  // 删除内容块
  const deleteBlock = useCallback((milestoneId, blockId) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m =>
        m.id === milestoneId
          ? { ...m, blocks: m.blocks.filter(b => b.id !== blockId) }
          : m
      )
    }))
  }, [setData])

  // 重新排序内容块
  const reorderBlocks = useCallback((milestoneId, startIndex, endIndex) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => {
        if (m.id !== milestoneId) return m
        const newBlocks = Array.from(m.blocks)
        const [removed] = newBlocks.splice(startIndex, 1)
        newBlocks.splice(endIndex, 0, removed)
        return { ...m, blocks: newBlocks }
      })
    }))
  }, [setData])

  // 添加列表项
  const addListItem = useCallback((milestoneId, blockId) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => {
        if (m.id !== milestoneId) return m
        return {
          ...m,
          blocks: m.blocks.map(b => {
            if (b.id !== blockId || b.type !== 'list') return b
            return {
              ...b,
              items: [...(b.items || []), { text: '', icon: 'fa-check' }]
            }
          })
        }
      })
    }))
  }, [setData])

  // 更新列表项
  const updateListItem = useCallback((milestoneId, blockId, itemIndex, updates) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => {
        if (m.id !== milestoneId) return m
        return {
          ...m,
          blocks: m.blocks.map(b => {
            if (b.id !== blockId || b.type !== 'list') return b
            const newItems = [...(b.items || [])]
            newItems[itemIndex] = { ...newItems[itemIndex], ...updates }
            return { ...b, items: newItems }
          })
        }
      })
    }))
  }, [setData])

  // 删除列表项
  const deleteListItem = useCallback((milestoneId, blockId, itemIndex) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => {
        if (m.id !== milestoneId) return m
        return {
          ...m,
          blocks: m.blocks.map(b => {
            if (b.id !== blockId || b.type !== 'list') return b
            return {
              ...b,
              items: (b.items || []).filter((_, i) => i !== itemIndex)
            }
          })
        }
      })
    }))
  }, [setData])

  // 添加复杂列表项
  const addComplexListItem = useCallback((milestoneId, blockId) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => {
        if (m.id !== milestoneId) return m
        return {
          ...m,
          blocks: m.blocks.map(b => {
            if (b.id !== blockId || b.type !== 'complex-list') return b
            return {
              ...b,
              items: [...(b.items || []), {
                icon: 'fa-star',
                iconBg: 'blue',
                title: '',
                description: ''
              }]
            }
          })
        }
      })
    }))
  }, [setData])

  // 更新复杂列表项
  const updateComplexListItem = useCallback((milestoneId, blockId, itemIndex, updates) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => {
        if (m.id !== milestoneId) return m
        return {
          ...m,
          blocks: m.blocks.map(b => {
            if (b.id !== blockId || b.type !== 'complex-list') return b
            const newItems = [...(b.items || [])]
            newItems[itemIndex] = { ...newItems[itemIndex], ...updates }
            return { ...b, items: newItems }
          })
        }
      })
    }))
  }, [setData])

  // 删除复杂列表项
  const deleteComplexListItem = useCallback((milestoneId, blockId, itemIndex) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => {
        if (m.id !== milestoneId) return m
        return {
          ...m,
          blocks: m.blocks.map(b => {
            if (b.id !== blockId || b.type !== 'complex-list') return b
            return {
              ...b,
              items: (b.items || []).filter((_, i) => i !== itemIndex)
            }
          })
        }
      })
    }))
  }, [setData])

  // 导入数据
  const importData = useCallback((newData) => {
    setData(newData)
  }, [setData])

  // 重置数据
  const resetData = useCallback(() => {
    setData(defaultRoadmapData)
  }, [setData])

  return {
    data,
    updateMeta,
    addMilestone,
    updateMilestone,
    deleteMilestone,
    reorderMilestones,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
    addListItem,
    updateListItem,
    deleteListItem,
    addComplexListItem,
    updateComplexListItem,
    deleteComplexListItem,
    importData,
    resetData
  }
}
