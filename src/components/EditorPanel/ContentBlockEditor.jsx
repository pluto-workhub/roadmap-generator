import { useState } from 'react'
import IconPicker from './IconPicker'

const ContentBlockEditor = ({ milestone, block, roadmapData }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const blockTypes = [
    { value: 'list', label: '标准清单' },
    { value: 'alert', label: '警告/依赖块' },
    { value: 'info', label: '时间跨度/说明块' },
    { value: 'tbd', label: '待定/风险块' },
    { value: 'complex-list', label: '复杂列表项' },
    { value: 'section', label: '分组标题' }
  ]

  const updateBlock = (updates) => {
    roadmapData.updateBlock(milestone.id, block.id, updates)
  }

  const deleteBlock = () => {
    if (window.confirm('确定要删除这个内容块吗？')) {
      roadmapData.deleteBlock(milestone.id, block.id)
    }
  }

  const renderEditor = () => {
    switch (block.type) {
      case 'list':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">标题</label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => updateBlock({ title: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                placeholder="列表标题"
              />
            </div>
            <IconPicker
              value={block.icon || ''}
              onChange={(icon) => updateBlock({ icon })}
              label="标题图标"
            />
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">列表项</label>
              <div className="space-y-2">
                {(block.items || []).map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <IconPicker
                      value={item.icon || ''}
                      onChange={(icon) => {
                        roadmapData.updateListItem(milestone.id, block.id, idx, { icon })
                      }}
                      label=""
                    />
                    <input
                      type="text"
                      value={item.text || ''}
                      onChange={(e) => {
                        roadmapData.updateListItem(milestone.id, block.id, idx, { text: e.target.value })
                      }}
                      className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm"
                      placeholder="列表项文本"
                    />
                    <button
                      onClick={() => roadmapData.deleteListItem(milestone.id, block.id, idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => roadmapData.addListItem(milestone.id, block.id)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  <i className="fa-solid fa-plus mr-1"></i> 添加列表项
                </button>
              </div>
            </div>
          </div>
        )

      case 'alert':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">类型</label>
              <select
                value={block.variant || 'warning'}
                onChange={(e) => updateBlock({ variant: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
              >
                <option value="warning">警告</option>
                <option value="danger">危险/依赖</option>
                <option value="info">信息</option>
              </select>
            </div>
            <IconPicker
              value={block.icon || ''}
              onChange={(icon) => updateBlock({ icon })}
              label="图标"
            />
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">标题</label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => updateBlock({ title: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">内容</label>
              <textarea
                value={block.content || ''}
                onChange={(e) => updateBlock({ content: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                rows="2"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">副标题</label>
              <input
                type="text"
                value={block.subtitle || ''}
                onChange={(e) => updateBlock({ subtitle: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">徽章</label>
              <input
                type="text"
                value={block.badge || ''}
                onChange={(e) => updateBlock({ badge: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                placeholder="如：前置依赖"
              />
            </div>
          </div>
        )

      case 'info':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">颜色变体</label>
              <select
                value={block.variant || 'indigo'}
                onChange={(e) => updateBlock({ variant: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
              >
                <option value="indigo">靛蓝色</option>
                <option value="orange">橙色</option>
              </select>
            </div>
            <IconPicker
              value={block.icon || ''}
              onChange={(icon) => updateBlock({ icon })}
              label="图标"
            />
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">标题</label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => updateBlock({ title: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">徽章</label>
              <input
                type="text"
                value={block.badge || ''}
                onChange={(e) => updateBlock({ badge: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                placeholder="如：6周周期"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">日期</label>
              <input
                type="text"
                value={block.date || ''}
                onChange={(e) => updateBlock({ date: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                placeholder="如：2月10日 - 3月17日"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">描述</label>
              <textarea
                value={block.description || ''}
                onChange={(e) => updateBlock({ description: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                rows="2"
              />
            </div>
          </div>
        )

      case 'tbd':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">颜色变体</label>
              <select
                value={block.variant || 'orange'}
                onChange={(e) => updateBlock({ variant: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
              >
                <option value="orange">橙色</option>
                <option value="amber">琥珀色</option>
              </select>
            </div>
            <IconPicker
              value={block.icon || ''}
              onChange={(icon) => updateBlock({ icon })}
              label="图标"
            />
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">标题</label>
              <input
                type="text"
                value={block.title || ''}
                onChange={(e) => updateBlock({ title: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">内容</label>
              <textarea
                value={block.content || ''}
                onChange={(e) => updateBlock({ content: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                rows="3"
              />
            </div>
          </div>
        )

      case 'complex-list':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">列表项</label>
              <div className="space-y-3">
                {(block.items || []).map((item, idx) => (
                  <div key={idx} className="p-2 border border-slate-200 rounded space-y-2">
                    <div className="flex gap-2">
                      <IconPicker
                        value={item.icon || ''}
                        onChange={(icon) => {
                          roadmapData.updateComplexListItem(milestone.id, block.id, idx, { icon })
                        }}
                        label="图标"
                      />
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-600 mb-1">图标背景色</label>
                        <select
                          value={item.iconBg || 'blue'}
                          onChange={(e) => {
                            roadmapData.updateComplexListItem(milestone.id, block.id, idx, { iconBg: e.target.value })
                          }}
                          className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                        >
                          <option value="blue">蓝色</option>
                          <option value="purple">紫色</option>
                          <option value="orange">橙色</option>
                          <option value="green">绿色</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">标题</label>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => {
                          roadmapData.updateComplexListItem(milestone.id, block.id, idx, { title: e.target.value })
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">描述</label>
                      <textarea
                        value={item.description || ''}
                        onChange={(e) => {
                          roadmapData.updateComplexListItem(milestone.id, block.id, idx, { description: e.target.value })
                        }}
                        className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                        rows="2"
                      />
                    </div>
                    <button
                      onClick={() => roadmapData.deleteComplexListItem(milestone.id, block.id, idx)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      <i className="fa-solid fa-trash mr-1"></i> 删除此项
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => roadmapData.addComplexListItem(milestone.id, block.id)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  <i className="fa-solid fa-plus mr-1"></i> 添加列表项
                </button>
              </div>
            </div>
          </div>
        )

      case 'section':
        return (
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">分组标题</label>
            <input
              type="text"
              value={block.title || ''}
              onChange={(e) => updateBlock({ title: e.target.value })}
              className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
              placeholder="如：商城与交易"
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="border border-slate-200 rounded p-3 bg-slate-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <select
            value={block.type}
            onChange={(e) => {
              const newType = e.target.value
              const newBlock = { ...block, type: newType }
              // 重置为新类型的默认值
              Object.keys(block).forEach(key => {
                if (!['id', 'type'].includes(key)) {
                  delete newBlock[key]
                }
              })
              updateBlock(newBlock)
            }}
            className="text-xs font-medium px-2 py-1 border border-slate-300 rounded"
          >
            {blockTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-500 hover:text-slate-700"
          >
            <i className={`fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} text-xs`}></i>
          </button>
          <button
            onClick={deleteBlock}
            className="text-red-500 hover:text-red-700"
          >
            <i className="fa-solid fa-trash text-xs"></i>
          </button>
        </div>
      </div>
      {isExpanded && renderEditor()}
    </div>
  )
}

export default ContentBlockEditor
