/**
 * 导出工具函数
 */


/**
 * 导出为 HTML
 */
export const exportToHTML = (roadmapData) => {
  const data = roadmapData.data
  const theme = data.meta.theme

  // 生成里程碑 HTML
  const milestonesHTML = data.milestones.map((milestone, index) => {
    const isEven = index % 2 === 1
    const statusColors = getStatusColorsForExport(milestone.status, theme)
    
    const blocksHTML = milestone.blocks.map(block => {
      return renderBlockForExport(block, theme)
    }).join('\n')

    return `
      <div class="relative z-10 mb-12 md:flex md:justify-between items-start w-full card-enter delay-${(index % 3) + 1}00 ${isEven ? 'flex-row-reverse' : ''}">
        <div class="absolute left-[4px] md:left-1/2 md:-translate-x-1/2 w-8 h-8 ${statusColors.bg} border-4 ${statusColors.border} rounded-full flex items-center justify-center shadow-md z-20 ${isEven ? 'mt-1' : ''}">
          <i class="fa-solid ${milestone.icon || 'fa-circle'} ${statusColors.icon} text-xs"></i>
        </div>
        <div class="ml-12 md:ml-0 md:w-[45%] ${isEven ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'} mb-2 md:mb-0 order-1">
          <span class="inline-block px-3 py-1 ${statusColors.bg} ${statusColors.text} rounded-full text-sm font-semibold border ${statusColors.border.replace('500', '200')}">
            ${milestone.date}
          </span>
          <h3 class="text-xl font-bold mt-2 text-slate-800">${milestone.title}</h3>
          ${milestone.description ? `<p class="text-sm text-slate-500">${milestone.description}</p>` : ''}
        </div>
        <div class="ml-12 md:ml-0 md:w-[45%] order-2 ${isEven ? 'md:pr-8' : 'md:pl-8'}">
          <div class="bg-white p-6 rounded-xl shadow-md border-l-4 ${statusColors.border} hover:shadow-lg transition-shadow duration-300">
            ${blocksHTML}
          </div>
        </div>
      </div>
    `
  }).join('\n')

  // 生成图例 HTML
  const legendHTML = data.meta.legend && data.meta.legend.length > 0
    ? `<div class="mt-6 flex flex-wrap justify-center gap-4 text-sm">
        ${data.meta.legend.map(item => {
          const colorMap = {
            amber: 'bg-amber-500',
            emerald: 'bg-emerald-500',
            blue: 'bg-blue-500',
            rose: 'bg-rose-500',
            indigo: 'bg-indigo-500'
          }
          return `<span class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full ${colorMap[item.color] || 'bg-slate-500'}"></div>
            ${item.label}
          </span>`
        }).join('\n')}
      </div>`
    : ''

  // 生成完整 HTML
  const headerColors = getHeaderColorsForExport(theme)
  
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.meta.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');
        
        body {
            font-family: 'Noto Sans SC', sans-serif;
            background-color: #f3f4f6;
        }

        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8; 
        }

        .timeline-line {
            position: absolute;
            left: 20px;
            top: 0;
            bottom: 0;
            width: 4px;
            background: #e5e7eb;
            z-index: 0;
        }

        @media (min-width: 768px) {
            .timeline-line {
                left: 50%;
                transform: translateX(-50%);
            }
        }

        .card-enter {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
    </style>
</head>
<body class="text-slate-800">
    <div class="${headerColors.bg} ${headerColors.text} py-12 px-4 shadow-lg">
        <div class="max-w-5xl mx-auto text-center">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">${data.meta.title}</h1>
            <p class="text-slate-300 text-lg">${data.meta.subtitle}</p>
            ${legendHTML}
        </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 py-12 relative">
        <div class="timeline-line rounded-full"></div>
        ${milestonesHTML}
        <div class="text-center mt-12 relative z-10 opacity-50">
            <div class="inline-block p-2 bg-slate-200 rounded-full text-slate-500 text-sm">
                <i class="fa-solid fa-arrow-down"></i> 后续规划
            </div>
        </div>
    </div>

    <footer class="bg-white border-t border-slate-200 mt-12 py-6 text-center text-slate-400 text-sm">
        &copy; ${new Date().getFullYear()} Product Team. Internal Use Only.
    </footer>
</body>
</html>`

  // 下载文件
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${data.meta.title.replace(/\s+/g, '_')}_roadmap.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * 导出为 JPG - 使用 html-to-image 库
 */
export const exportToJPG = async () => {
  const { toJpeg } = await import('html-to-image')
  const element = document.getElementById('roadmap-preview')
  
  if (!element) {
    alert('无法找到预览区域')
    return
  }

  // 显示加载提示
  const loadingMsg = document.createElement('div')
  loadingMsg.textContent = '正在生成图片，请稍候...'
  loadingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.8);color:white;padding:20px;border-radius:8px;z-index:99999;font-family:system-ui;'
  document.body.appendChild(loadingMsg)

  // 保存原始样式
  const savedStyles = new Map()
  const saveAndModifyStyles = (el, styles) => {
    const original = {}
    for (const [prop, value] of Object.entries(styles)) {
      original[prop] = el.style[prop]
      el.style[prop] = value
    }
    savedStyles.set(el, original)
  }

  // 恢复所有样式
  const restoreAllStyles = () => {
    savedStyles.forEach((original, el) => {
      for (const [prop, value] of Object.entries(original)) {
        el.style[prop] = value || ''
      }
    })
    savedStyles.clear()
  }

  try {
    // 修改元素样式以显示完整内容
    saveAndModifyStyles(element, {
      height: 'auto',
      maxHeight: 'none',
      minHeight: 'auto',
      overflow: 'visible',
      position: 'relative'
    })

    // 修改父元素样式
    let parent = element.parentElement
    while (parent && parent !== document.body) {
      saveAndModifyStyles(parent, {
        height: 'auto',
        maxHeight: 'none',
        overflow: 'visible'
      })
      parent = parent.parentElement
    }

    // 滚动到顶部
    element.scrollTop = 0
    window.scrollTo(0, 0)

    // 等待布局更新和字体加载
    await new Promise(resolve => setTimeout(resolve, 100))
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready
    }
    await new Promise(resolve => setTimeout(resolve, 300))

    // 获取实际尺寸 - 使用实际内容宽度，不设置最小宽度
    const rect = element.getBoundingClientRect()
    const width = Math.ceil(rect.width) || element.offsetWidth
    const height = Math.max(element.scrollHeight, element.offsetHeight, Math.ceil(rect.height))

    // 使用 html-to-image 生成图片
    const dataUrl = await toJpeg(element, {
      quality: 0.95,
      backgroundColor: '#f3f4f6',
      width: width,
      height: height,
      pixelRatio: 2,
      skipAutoScale: false,
      cacheBust: true,
      // 内联所有样式，确保颜色正确
      style: {
        height: 'auto',
        maxHeight: 'none',
        overflow: 'visible',
        width: width + 'px'
      },
      // 过滤掉不需要的元素
      filter: (node) => {
        // 排除脚本标签
        if (node.tagName === 'SCRIPT') return false
        // 排除隐藏元素
        if (node.style && node.style.display === 'none') return false
        return true
      },
      // 获取字体时使用 CORS
      fontEmbedCSS: '',
      // 在克隆时处理元素
      onclone: (clonedDoc, clonedElement) => {
        // 确保所有元素可见
        clonedElement.style.height = 'auto'
        clonedElement.style.maxHeight = 'none'
        clonedElement.style.overflow = 'visible'
        clonedElement.style.backgroundColor = '#f3f4f6'
        
        // 遍历所有元素，内联计算样式中的关键属性
        const allElements = clonedElement.querySelectorAll('*')
        const originalElements = element.querySelectorAll('*')
        
        allElements.forEach((clonedEl, index) => {
          const originalEl = originalElements[index]
          if (!originalEl) return
          
          try {
            const computed = window.getComputedStyle(originalEl)
            
            // 内联背景色
            const bgColor = computed.backgroundColor
            if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
              clonedEl.style.backgroundColor = bgColor
            }
            
            // 内联背景图片（渐变）
            const bgImage = computed.backgroundImage
            if (bgImage && bgImage !== 'none') {
              clonedEl.style.backgroundImage = bgImage
            }
            
            // 内联文字颜色
            const color = computed.color
            if (color) {
              clonedEl.style.color = color
            }
            
            // 内联边框
            if (computed.borderTopWidth !== '0px') {
              clonedEl.style.borderTopColor = computed.borderTopColor
              clonedEl.style.borderTopWidth = computed.borderTopWidth
              clonedEl.style.borderTopStyle = computed.borderTopStyle
            }
            if (computed.borderRightWidth !== '0px') {
              clonedEl.style.borderRightColor = computed.borderRightColor
              clonedEl.style.borderRightWidth = computed.borderRightWidth
              clonedEl.style.borderRightStyle = computed.borderRightStyle
            }
            if (computed.borderBottomWidth !== '0px') {
              clonedEl.style.borderBottomColor = computed.borderBottomColor
              clonedEl.style.borderBottomWidth = computed.borderBottomWidth
              clonedEl.style.borderBottomStyle = computed.borderBottomStyle
            }
            if (computed.borderLeftWidth !== '0px') {
              clonedEl.style.borderLeftColor = computed.borderLeftColor
              clonedEl.style.borderLeftWidth = computed.borderLeftWidth
              clonedEl.style.borderLeftStyle = computed.borderLeftStyle
            }
            
            // 内联阴影
            if (computed.boxShadow && computed.boxShadow !== 'none') {
              clonedEl.style.boxShadow = computed.boxShadow
            }
            
            // 内联圆角
            if (computed.borderRadius && computed.borderRadius !== '0px') {
              clonedEl.style.borderRadius = computed.borderRadius
            }
          } catch (e) {
            // 忽略错误
          }
        })
      }
    })

    if (!dataUrl || dataUrl === 'data:,') {
      throw new Error('生成图片失败')
    }

    // 下载图片
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `roadmap_${new Date().getTime()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 恢复样式
    restoreAllStyles()

  } catch (error) {
    restoreAllStyles()
    console.error('导出 JPG 失败:', error)
    alert('导出 JPG 失败：' + (error.message || '未知错误'))
  } finally {
    if (document.body.contains(loadingMsg)) {
      document.body.removeChild(loadingMsg)
    }
  }
}

/**
 * 导出为 JSON
 */
export const exportToJSON = (roadmapData) => {
  const dataStr = JSON.stringify(roadmapData.data, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `roadmap_${new Date().getTime()}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * 从 JSON 导入
 */
export const importFromJSON = (file, roadmapData) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        roadmapData.importData(data)
        resolve(data)
      } catch (error) {
        reject(new Error('无效的 JSON 文件'))
      }
    }
    reader.onerror = () => reject(new Error('读取文件失败'))
    reader.readAsText(file)
  })
}

// 辅助函数：获取状态颜色（用于导出）
function getStatusColorsForExport(status, themeName) {
  const colorMap = {
    default: {
      planning: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800', icon: 'text-blue-600' },
      warning: { bg: 'bg-amber-100', border: 'border-amber-500', text: 'text-amber-800', icon: 'text-amber-600' },
      success: { bg: 'bg-emerald-100', border: 'border-emerald-500', text: 'text-emerald-800', icon: 'text-emerald-600' },
      danger: { bg: 'bg-rose-100', border: 'border-rose-500', text: 'text-rose-800', icon: 'text-rose-600' },
      info: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800', icon: 'text-blue-600' }
    }
  }
  const theme = colorMap[themeName] || colorMap.default
  return theme[status] || theme.planning
}

// 辅助函数：获取头部颜色（用于导出）
function getHeaderColorsForExport(themeName) {
  const colorMap = {
    default: { bg: 'bg-gradient-to-r from-slate-800 to-slate-900', text: 'text-white' },
    'tech-blue': { bg: 'bg-gradient-to-r from-blue-700 to-cyan-600', text: 'text-white' },
    'vibrant-orange': { bg: 'bg-gradient-to-r from-orange-600 to-amber-500', text: 'text-white' },
    'dark-night': { bg: 'bg-gradient-to-r from-gray-900 to-black', text: 'text-white' }
  }
  return colorMap[themeName] || colorMap.default
}

// 辅助函数：渲染内容块（用于导出）
function renderBlockForExport(block, themeName) {
  switch (block.type) {
    case 'list':
      const itemsHTML = (block.items || []).map(item => 
        `<li class="flex items-start">
          ${item.icon ? `<i class="fa-solid ${item.icon} text-green-500 mt-1 mr-2"></i>` : ''}
          ${item.text}
        </li>`
      ).join('\n')
      return `
        ${block.title ? `<h4 class="font-bold text-lg mb-3 flex items-center">
          ${block.icon ? `<i class="fa-solid ${block.icon} mr-2 text-slate-500"></i>` : ''}
          ${block.title}
        </h4>` : ''}
        <ul class="space-y-2 text-sm text-slate-600 mb-4">
          ${itemsHTML}
        </ul>
      `

    case 'alert':
      const alertColors = getAlertColorsForExport(block.variant || 'warning', themeName)
      return `
        <div class="${alertColors.bg} border ${alertColors.border} rounded-lg p-3 text-xs ${alertColors.text}">
          <div class="flex items-start justify-between">
            <div class="flex items-start flex-1">
              ${block.icon ? `<i class="fa-solid ${block.icon} mt-0.5 mr-2"></i>` : ''}
              <div class="flex-1">
                ${block.title ? `<strong>${block.title}</strong>` : ''}
                ${block.title && block.content ? ' ' : ''}
                ${block.content || ''}
                ${block.subtitle ? `<br><span class="opacity-75">${block.subtitle}</span>` : ''}
              </div>
            </div>
            ${block.badge ? `<span class="text-xs font-bold ${alertColors.bg.replace('50', '200')} ${alertColors.text} px-2 py-1 rounded-md ml-2 whitespace-nowrap border ${alertColors.border} shadow-sm"><i class="fa-solid fa-tag mr-1 text-[0.7rem]"></i>${block.badge}</span>` : ''}
          </div>
        </div>
      `

    case 'info':
      const infoColors = getInfoBlockColorsForExport(block.variant || 'indigo', themeName)
      return `
        <div class="${infoColors.bg} p-3 rounded-lg border ${infoColors.border}">
          <div class="flex justify-between items-start">
            <h5 class="font-bold ${infoColors.text} text-sm">
              ${block.icon ? `<i class="fa-solid ${block.icon} mr-1"></i>` : ''}
              ${block.title}
            </h5>
            ${block.badge ? `<span class="text-xs font-bold ${infoColors.bg.replace('50', '200')} ${infoColors.text} px-2 py-1 rounded-md border ${infoColors.border} shadow-sm"><i class="fa-solid fa-tag mr-1 text-[0.7rem]"></i>${block.badge}</span>` : ''}
          </div>
          ${block.date ? `<p class="text-xs ${infoColors.text} mt-1">${block.date}</p>` : ''}
          ${block.description ? `<p class="text-xs text-slate-500 mt-1 italic">${block.description}</p>` : ''}
        </div>
      `

    case 'tbd':
      const tbdColors = getInfoBlockColorsForExport(block.variant || 'orange', themeName)
      return `
        <div class="${tbdColors.bg} p-3 rounded-lg border ${tbdColors.border}">
          <h5 class="font-bold ${tbdColors.text} text-sm">
            ${block.icon ? `<i class="fa-solid ${block.icon} mr-1"></i>` : ''}
            ${block.title}
          </h5>
          ${block.content ? `<p class="text-xs text-slate-600 mt-1">
            <span class="font-semibold ${tbdColors.text.replace('800', '600')}">需求待确认：</span> ${block.content}
          </p>` : ''}
        </div>
      `

    case 'complex-list':
      const complexItemsHTML = (block.items || []).map(item => {
        const iconBgMap = {
          blue: 'bg-blue-100 text-blue-700',
          purple: 'bg-purple-100 text-purple-700',
          orange: 'bg-orange-100 text-orange-700',
          green: 'bg-green-100 text-green-700'
        }
        return `
          <li class="flex items-start">
            ${item.icon ? `<span class="${iconBgMap[item.iconBg] || iconBgMap.blue} p-1 rounded mr-2 text-xs min-w-[20px] text-center">
              <i class="fa-solid ${item.icon}"></i>
            </span>` : ''}
            <div>
              ${item.title ? `<strong>${item.title}</strong>` : ''}
              ${item.description ? `<p class="text-xs text-slate-400 mt-1">${item.description}</p>` : ''}
            </div>
          </li>
        `
      }).join('\n')
      return `<ul class="space-y-3 text-sm text-slate-600">${complexItemsHTML}</ul>`

    case 'section':
      return `<div class="mb-4">
        <h4 class="font-bold text-slate-700 mb-2 text-sm uppercase tracking-wide">${block.title}</h4>
      </div>`

    default:
      return ''
  }
}

function getAlertColorsForExport(variant, themeName) {
  const colorMap = {
    default: {
      warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
      danger: { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-800' },
      info: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-800' }
    }
  }
  const theme = colorMap[themeName] || colorMap.default
  return theme[variant] || theme.warning
}

function getInfoBlockColorsForExport(variant, themeName) {
  const colorMap = {
    default: {
      indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-800' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-800' }
    }
  }
  const theme = colorMap[themeName] || colorMap.default
  return theme[variant] || theme.indigo
}
