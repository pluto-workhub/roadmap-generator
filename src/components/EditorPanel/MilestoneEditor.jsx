import { useState } from 'react'
import IconPicker from './IconPicker'
import ContentBlockEditor from './ContentBlockEditor'

const MilestoneEditor = ({ milestone, roadmapData, index }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0)

  const statusOptions = [
    { value: 'planning', label: '规划中 (蓝色)' },
    { value: 'warning', label: '进行中 (琥珀色)' },
    { value: 'success', label: '已上线 (绿色)' },
    { value: 'danger', label: '关键路径 (红色)' },
    { value: 'info', label: '迭代开发 (蓝色)' }
  ]

  const updateMilestone = (updates) => {
    roadmapData.updateMilestone(milestone.id, updates)
  }

  const deleteMilestone = () => {
    if (window.confirm('确定要删除这个里程碑吗？')) {
      roadmapData.deleteMilestone(milestone.id)
    }
  }

  const addBlock = (type) => {
    roadmapData.addBlock(milestone.id, type)
  }

  const blockTypes = [
    { value: 'list', label: '标准清单', icon: 'fa-list' },
    { value: 'alert', label: '警告块', icon: 'fa-exclamation-triangle' },
    { value: 'info', label: '信息块', icon: 'fa-info-circle' },
    { value: 'tbd', label: '待定块', icon: 'fa-question' },
    { value: 'complex-list', label: '复杂列表', icon: 'fa-list-ul' },
    { value: 'section', label: '分组标题', icon: 'fa-heading' }
  ]

  return (
    <div className="border-b border-slate-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 font-semibold text-slate-800"
          >
            <i className={`fa-solid fa-chevron-${isExpanded ? 'down' : 'right'} text-xs`}></i>
            <span>里程碑 {index + 1}: {milestone.title || '未命名'}</span>
          </button>
          <button
            onClick={deleteMilestone}
            className="text-red-500 hover:text-red-700"
          >
            <i className="fa-solid fa-trash text-sm"></i>
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">日期</label>
                <input
                  type="text"
                  value={milestone.date}
                  onChange={(e) => updateMilestone({ date: e.target.value })}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                  placeholder="2026.01.28"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">状态</label>
                <select
                  value={milestone.status}
                  onChange={(e) => updateMilestone({ status: e.target.value })}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                >
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">标题</label>
              <input
                type="text"
                value={milestone.title}
                onChange={(e) => updateMilestone({ title: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                placeholder="用户内测开启"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">描述</label>
              <input
                type="text"
                value={milestone.description}
                onChange={(e) => updateMilestone({ description: e.target.value })}
                className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                placeholder="Internal Beta Testing"
              />
            </div>

            <IconPicker
              value={milestone.icon}
              onChange={(icon) => updateMilestone({ icon })}
              label="图标"
            />

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">内容块</label>
              <div className="space-y-3 mb-3">
                {milestone.blocks.map((block) => (
                  <ContentBlockEditor
                    key={block.id}
                    milestone={milestone}
                    block={block}
                    roadmapData={roadmapData}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {blockTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => addBlock(type.value)}
                    className="px-3 py-1 text-xs border border-slate-300 rounded hover:bg-slate-50 flex items-center gap-1"
                  >
                    <i className={`fa-solid ${type.icon}`}></i>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MilestoneEditor
