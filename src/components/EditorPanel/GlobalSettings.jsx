import { useState } from 'react'

const GlobalSettings = ({ meta, updateMeta }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const themes = [
    { value: 'default', label: '默认主题' },
    { value: 'tech-blue', label: '科技蓝' },
    { value: 'vibrant-orange', label: '活力橙' },
    { value: 'dark-night', label: '暗夜黑' }
  ]

  return (
    <div className="border-b border-slate-200 p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left font-semibold text-slate-800 mb-2"
      >
        <span>全局设置</span>
        <i className={`fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} text-sm`}></i>
      </button>

      {isExpanded && (
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              项目标题
            </label>
            <input
              type="text"
              value={meta.title}
              onChange={(e) => updateMeta({ title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="产品开发路线图"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              副标题
            </label>
            <input
              type="text"
              value={meta.subtitle}
              onChange={(e) => updateMeta({ subtitle: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Development Roadmap 2026 Q1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              主题
            </label>
            <select
              value={meta.theme}
              onChange={(e) => updateMeta({ theme: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {themes.map(theme => (
                <option key={theme.value} value={theme.value}>
                  {theme.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              状态图例
            </label>
            <div className="space-y-2">
              {meta.legend.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const newLegend = [...meta.legend]
                      newLegend[index].label = e.target.value
                      updateMeta({ legend: newLegend })
                    }}
                    className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm"
                    placeholder="图例标签"
                  />
                  <select
                    value={item.color}
                    onChange={(e) => {
                      const newLegend = [...meta.legend]
                      newLegend[index].color = e.target.value
                      updateMeta({ legend: newLegend })
                    }}
                    className="px-2 py-1 border border-slate-300 rounded text-sm"
                  >
                    <option value="amber">琥珀色</option>
                    <option value="emerald">翠绿色</option>
                    <option value="blue">蓝色</option>
                    <option value="rose">玫瑰色</option>
                    <option value="indigo">靛蓝色</option>
                  </select>
                  <button
                    onClick={() => {
                      const newLegend = meta.legend.filter((_, i) => i !== index)
                      updateMeta({ legend: newLegend })
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  updateMeta({
                    legend: [...meta.legend, { label: '', color: 'amber' }]
                  })
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                <i className="fa-solid fa-plus mr-1"></i> 添加图例
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GlobalSettings
