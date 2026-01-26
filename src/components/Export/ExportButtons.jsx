import { useRef, useState } from 'react'
import { exportToHTML, exportToJPG, exportToJSON, importFromJSON } from '../../utils/exportHelpers'
import { buildShareUrl } from '../../utils/shareUrl'

const ExportButtons = ({ roadmapData }) => {
  const fileInputRef = useRef(null)
  const [shareHint, setShareHint] = useState(false)

  const handleCopyShareLink = async () => {
    try {
      const url = buildShareUrl(roadmapData.data)
      await navigator.clipboard.writeText(url)
      setShareHint(true)
      setTimeout(() => setShareHint(false), 2000)
    } catch (e) {
      alert('复制失败：' + (e.message || '请手动复制链接'))
    }
  }

  const handleImport = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      await importFromJSON(file, roadmapData)
      alert('导入成功！')
      // 重置文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      alert('导入失败：' + error.message)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCopyShareLink}
          className={`flex-1 px-3 py-2 rounded text-sm flex items-center justify-center gap-2 ${
            shareHint
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-500 text-white hover:bg-slate-600'
          }`}
        >
          <i className="fa-solid fa-share-nodes"></i>
          {shareHint ? '已复制到剪贴板' : '复制分享链接'}
        </button>
        <button
          onClick={() => exportToHTML(roadmapData)}
          className="flex-1 px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-file-code"></i>
          导出 HTML
        </button>
        <button
          onClick={exportToJPG}
          className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-image"></i>
          导出 JPG
        </button>
        <button
          onClick={() => exportToJSON(roadmapData)}
          className="flex-1 px-3 py-2 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-download"></i>
          导出 JSON
        </button>
      </div>
      <div className="flex gap-2">
        <label className="flex-1 px-3 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 flex items-center justify-center gap-2 cursor-pointer">
          <i className="fa-solid fa-upload"></i>
          导入 JSON
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
        <button
          onClick={() => {
            if (window.confirm('确定要重置所有数据吗？此操作不可撤销。')) {
              roadmapData.resetData()
            }
          }}
          className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-refresh"></i>
          重置
        </button>
      </div>
    </div>
  )
}

export default ExportButtons
