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
 * Font Awesome 图标 SVG 路径映射（常用图标）
 */
const FA_SVG_MAP = {
  'fa-check': '<path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>',
  'fa-circle': '<path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>',
  'fa-rocket': '<path fill="currentColor" d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>',
  'fa-flag': '<path fill="currentColor" d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/>',
  'fa-flag-checkered': '<path fill="currentColor" d="M32 0C49.7 0 64 14.3 64 32V48l64-16c36.1-9 75.2-4.6 109.5 12.5c44.2 22.1 96.1 24.8 142.1 7.7l37.4-14c17.8-6.7 37 5.3 37 24.3V394.4c0 10.9-6.7 20.6-16.8 24.5l-50.7 19c-55.3 20.7-116.2 17.3-169.1-9.5c-34.4-17.2-74.1-21.8-111.5-12.9L64 428V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V368 64 32C0 14.3 14.3 0 32 0zM64 133.3V256c35.6-7.1 72.6-3.7 106.5 10.2c34.2 14 71.9 14.9 106.5 2.6V137.4c-35.6 7.1-72.6 3.7-106.5-10.2c-34.2-14-71.9-14.9-106.5-2.6V133.3z"/>',
  'fa-calendar': '<path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192z"/>',
  'fa-calendar-check': '<path fill="currentColor" d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zM329 305c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-95 95-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L329 305z"/>',
  'fa-star': '<path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L cd438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>',
  'fa-bolt': '<path fill="currentColor" d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"/>',
  'fa-fire': '<path fill="currentColor" d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7.8 64.2-19.6c31.7-22.8 45.6-56.3 45.6-87.4c0-22.4-9.3-51-26.8-79.8c-4.4-7.2-9.3-14.4-14.8-21.5c-7.6 13.7-16.8 28.4-27.2 41.4c-7.6 9.5-20.2 11.7-30 5.3s-12.9-19.5-7.5-30.2c13.2-26.1 23.4-52.6 30.1-74.8c-7.7 3.4-14.7 7.7-21.1 12.8c-26.5 20.9-43.9 59.2-43.9 89.5c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-5.6 .3-11.1 .8-16.4C152.5 213.5 128 259.4 128 294c0 47.2 37.7 87.7 82.8 87.7c2.9 0 5.7-.2 8.4-.5l6.5 34.8z"/>',
  'fa-heart': '<path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>',
  'fa-trophy': '<path fill="currentColor" d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.5 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.6-11 93.8-32.7 138.1-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0z"/>',
  'fa-clock': '<path fill="currentColor" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>',
  'fa-hourglass-half': '<path fill="currentColor" d="M0 32C0 14.3 14.3 0 32 0H64 320h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V75c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1v11c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 64 32c-17.7 0-32-14.3-32-32s14.3-32 32-32V437c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75V64C14.3 64 0 49.7 0 32zM288 437V384H96v53c0 25.5 10.1 49.9 28.1 67.9L192 573l67.9-67.9c18-18 28.1-42.4 28.1-67.9z"/>',
  'fa-triangle-exclamation': '<path fill="currentColor" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 googl472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>',
  'fa-circle-info': '<path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>',
  'fa-lightbulb': '<path fill="currentColor" d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80z"/>',
  'fa-gear': '<path fill="currentColor" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>',
  'fa-code': '<path fill="currentColor" d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/>',
  'fa-database': '<path fill="currentColor" d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/>',
  'fa-users': '<path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>',
  'fa-user': '<path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>',
  'fa-link': '<path fill="currentColor" d="M580.3 267.2c56.2-56.2 56.2-147.3 0-203.5C526.8 10.2 440.9 7.3 383.9 57.2l-6.1 5.4c-10 8.7-11 23.9-2.3 33.9s23.9 11 33.9 2.3l6.1-5.4c38-33.2 95.2-31.3 130.9 4.4c37.4 37.4 37.4 98.1 0 135.6L433.1 346.6c-37.4 37.4-98.2 37.4-135.6 0c-35.7-35.7-37.6-92.9-4.4-130.9l4.7-5.4c8.7-10 7.7-25.1-2.3-33.9s-25.1-7.7-33.9 2.3l-4.7 5.4c-49.8 57-46.9 142.9 6.6 196.4c56.2 56.2 147.3 56.2 203.5 0L580.3 267.2zM59.7 244.8C3.5 301 3.5 392.1 59.7 448.2c53.6 53.6 139.5 56.4 196.5 6.5l6.1-5.4c10-8.7 11-23.9 2.3-33.9s-23.9-11-33.9-2.3l-6.1 5.4c-38 33.2-95.2 31.3-130.9-4.4c-37.4-37.4-37.4-98.1 0-135.6L206.9 165.4c37.4-37.4 98.1-37.4 135.6 0c35.7 35.7 37.6 92.9 4.4 130.9l-5.4 6.1c-8.7 10-7.7 25.1 2.3 33.9s25.1 7.7 33.9-2.3l5.4-6.1c49.9-57 47-142.9-6.5-196.5c-56.2-56.2-147.3-56.2-203.5 0L59.7 244.8z"/>',
  'fa-tag': '<path fill="currentColor" d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>',
  'fa-arrow-down': '<path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>',
  'fa-plus': '<path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>',
  'fa-list-check': '<path fill="currentColor" d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>',
  'fa-square-check': '<path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>',
  'fa-trash': '<path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>',
}

/**
 * 获取图标的 SVG 内容，如果没有预定义则返回一个默认圆形
 */
function getIconSvg(iconClass, color) {
  const svgContent = FA_SVG_MAP[iconClass] || FA_SVG_MAP['fa-circle']
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width:1em;height:1em;vertical-align:-0.125em;fill:${color};display:inline-block;">${svgContent}</svg>`
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

  // 导出最小宽度，确保不会因为响应式布局导致内容折行
  const EXPORT_MIN_WIDTH = 1200

  try {
    // 获取当前宽度
    const currentWidth = element.offsetWidth
    const exportWidth = Math.max(currentWidth, EXPORT_MIN_WIDTH)
    
    // 修改元素样式以显示完整内容
    saveAndModifyStyles(element, {
      height: 'auto',
      maxHeight: 'none',
      minHeight: 'auto',
      overflow: 'visible',
      position: 'relative',
      width: exportWidth + 'px',
      minWidth: exportWidth + 'px'
    })

    // 修改父元素样式
    let parent = element.parentElement
    while (parent && parent !== document.body) {
      saveAndModifyStyles(parent, {
        height: 'auto',
        maxHeight: 'none',
        overflow: 'visible',
        width: 'auto',
        minWidth: 'auto'
      })
      parent = parent.parentElement
    }

    // 滚动到顶部
    element.scrollTop = 0
    window.scrollTo(0, 0)

    // 等待布局更新和字体加载
    await new Promise(resolve => setTimeout(resolve, 200))
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready
    }
    await new Promise(resolve => setTimeout(resolve, 500))

    // 获取实际尺寸
    const height = Math.max(element.scrollHeight, element.offsetHeight)

    // 使用 html-to-image 生成图片
    const dataUrl = await toJpeg(element, {
      quality: 0.95,
      backgroundColor: '#f3f4f6',
      width: exportWidth,
      height: height,
      pixelRatio: 2,
      skipAutoScale: true,
      cacheBust: true,
      // 内联所有样式
      style: {
        height: 'auto',
        maxHeight: 'none',
        overflow: 'visible',
        width: exportWidth + 'px',
        minWidth: exportWidth + 'px'
      },
      // 过滤掉不需要的元素
      filter: (node) => {
        if (node.tagName === 'SCRIPT') return false
        if (node.style && node.style.display === 'none') return false
        return true
      },
      // 在克隆时处理元素
      onclone: (clonedDoc, clonedElement) => {
        // 确保所有元素可见
        clonedElement.style.height = 'auto'
        clonedElement.style.maxHeight = 'none'
        clonedElement.style.overflow = 'visible'
        clonedElement.style.backgroundColor = '#f3f4f6'
        clonedElement.style.width = exportWidth + 'px'
        clonedElement.style.minWidth = exportWidth + 'px'
        
        // 遍历所有元素，内联计算样式
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
            
            // 处理 Font Awesome 图标 - 将图标元素转换为内联 SVG
            if (clonedEl.tagName === 'I' && (clonedEl.classList.contains('fa-solid') || clonedEl.classList.contains('fa'))) {
              // 获取图标类名
              const iconClass = Array.from(clonedEl.classList).find(c => c.startsWith('fa-') && c !== 'fa-solid' && c !== 'fa')
              if (iconClass) {
                // 获取图标颜色
                const iconColor = computed.color || 'currentColor'
                // 创建 SVG 替换
                const svgHtml = getIconSvg(iconClass, iconColor)
                clonedEl.innerHTML = svgHtml
                clonedEl.style.fontStyle = 'normal'
                clonedEl.style.display = 'inline-flex'
                clonedEl.style.alignItems = 'center'
                clonedEl.style.justifyContent = 'center'
              }
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
