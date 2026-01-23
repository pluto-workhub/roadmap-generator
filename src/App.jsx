import { useState, useEffect, useRef, useCallback } from 'react'
import EditorPanel from './components/EditorPanel/EditorPanel'
import PreviewPanel from './components/PreviewPanel/PreviewPanel'
import { useRoadmapData } from './hooks/useRoadmapData'

function App() {
  const roadmapData = useRoadmapData()
  const [showEditor, setShowEditor] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [leftWidth, setLeftWidth] = useState(50) // 左侧面板宽度百分比
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 处理鼠标按下
  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  // 处理鼠标移动
  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !containerRef.current || isMobile) return

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

    // 限制在 20% 到 80% 之间
    const clampedWidth = Math.max(20, Math.min(80, newLeftWidth))
    setLeftWidth(clampedWidth)
  }, [isDragging, isMobile])

  // 处理鼠标释放
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // 处理双击重置
  const handleDoubleClick = useCallback(() => {
    setLeftWidth(50)
  }, [])

  // 监听全局鼠标事件
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div 
      ref={containerRef}
      className="flex flex-col md:flex-row h-screen overflow-hidden"
    >
      {/* 移动端切换按钮 */}
      {isMobile && (
        <div className="flex border-b border-slate-300 bg-slate-100">
          <button
            onClick={() => setShowEditor(true)}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              showEditor
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <i className="fa-solid fa-edit mr-2"></i>
            编辑器
          </button>
          <button
            onClick={() => setShowEditor(false)}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              !showEditor
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <i className="fa-solid fa-eye mr-2"></i>
            预览
          </button>
        </div>
      )}

      {/* 编辑器面板 */}
      <div
        className={`${
          isMobile ? (showEditor ? 'flex' : 'hidden') : 'flex'
        } border-r border-slate-300 overflow-hidden bg-white flex-col`}
        style={!isMobile ? { width: `${leftWidth}%` } : {}}
      >
        <EditorPanel roadmapData={roadmapData} />
      </div>

      {/* 可拖动分隔条 */}
      {!isMobile && (
        <div
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
          className={`relative bg-slate-200 hover:bg-blue-400 cursor-col-resize transition-colors ${
            isDragging ? 'bg-blue-500' : ''
          }`}
          style={{ width: '4px', minWidth: '4px' }}
          title="拖动调整宽度，双击重置为50/50"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-0.5 h-16 rounded transition-colors ${
              isDragging ? 'bg-blue-600' : 'bg-slate-400'
            }`}></div>
          </div>
        </div>
      )}

      {/* 预览面板 */}
      <div
        className={`${
          isMobile ? (!showEditor ? 'flex' : 'hidden') : 'flex'
        } overflow-hidden bg-slate-50 flex-col`}
        style={!isMobile ? { width: `${100 - leftWidth}%` } : {}}
      >
        <PreviewPanel roadmapData={roadmapData} />
      </div>
    </div>
  )
}

export default App
