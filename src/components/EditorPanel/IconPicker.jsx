import { useState, useMemo } from 'react'

// 常用 FontAwesome 图标列表
const commonIcons = [
  'fa-check', 'fa-circle', 'fa-star', 'fa-rocket', 'fa-flask', 'fa-code',
  'fa-book-open', 'fa-link', 'fa-circle-exclamation', 'fa-id-card',
  'fa-ticket', 'fa-file-invoice', 'fa-credit-card', 'fa-yen-sign',
  'fa-truck-fast', 'fa-mobile-screen', 'fa-handshake', 'fa-qrcode',
  'fa-tiktok', 'fa-database', 'fa-server', 'fa-info-circle',
  'fa-question-circle', 'fa-arrow-down', 'fa-plus', 'fa-trash',
  'fa-edit', 'fa-save', 'fa-times', 'fa-chevron-up', 'fa-chevron-down'
]

// 图标分类
const iconCategories = {
  '常用': commonIcons,
  '状态': ['fa-check', 'fa-circle', 'fa-exclamation', 'fa-question', 'fa-info'],
  '业务': ['fa-rocket', 'fa-flask', 'fa-code', 'fa-book-open', 'fa-link'],
  '支付': ['fa-credit-card', 'fa-yen-sign', 'fa-wallet', 'fa-money-bill'],
  '系统': ['fa-server', 'fa-database', 'fa-cloud', 'fa-shield'],
  '社交': ['fa-tiktok', 'fa-weixin', 'fa-share', 'fa-comment'],
  '其他': ['fa-ticket', 'fa-file-invoice', 'fa-id-card', 'fa-qrcode']
}

const IconPicker = ({ value, onChange, label = '选择图标' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('常用')

  const filteredIcons = useMemo(() => {
    if (!searchTerm) {
      return iconCategories[selectedCategory] || []
    }
    // 搜索所有图标
    const allIcons = Object.values(iconCategories).flat()
    return allIcons.filter(icon =>
      icon.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, selectedCategory])

  const handleSelect = (icon) => {
    onChange(icon)
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-left flex items-center justify-between hover:bg-slate-50"
      >
        <span className="flex items-center gap-2">
          {value ? (
            <>
              <i className={`fa-solid ${value}`}></i>
              <span className="text-sm">{value}</span>
            </>
          ) : (
            <span className="text-slate-400">点击选择图标</span>
          )}
        </span>
        <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'} text-xs`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-300 rounded-md shadow-lg max-h-64 overflow-hidden">
          <div className="p-2 border-b border-slate-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索图标..."
              className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
              autoFocus
            />
          </div>
          {!searchTerm && (
            <div className="flex border-b border-slate-200 overflow-x-auto">
              {Object.keys(iconCategories).map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-xs whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
          <div className="overflow-y-auto max-h-48 p-2 grid grid-cols-4 gap-2">
            {filteredIcons.map(icon => (
              <button
                key={icon}
                onClick={() => handleSelect(icon)}
                className={`p-2 rounded hover:bg-blue-50 border ${
                  value === icon
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200'
                }`}
                title={icon}
              >
                <i className={`fa-solid ${icon} text-lg`}></i>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default IconPicker
