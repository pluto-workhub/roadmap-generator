import { getAlertColors, getInfoBlockColors } from '../../utils/themeConfig'

const ContentBlockRenderer = ({ block, themeName }) => {
  switch (block.type) {
    case 'list':
      return (
        <div>
          {block.title && (
            <h4 className="font-bold text-lg mb-3 flex items-center">
              {block.icon && <i className={`fa-solid ${block.icon} mr-2 text-slate-500`}></i>}
              {block.title}
            </h4>
          )}
          <ul className="space-y-2 text-sm text-slate-600 mb-4">
            {(block.items || []).map((item, idx) => (
              <li key={idx} className="flex items-start">
                {item.icon && (
                  <i className={`fa-solid ${item.icon} text-green-500 mt-1 mr-2`}></i>
                )}
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      )

    case 'alert':
      const alertColors = getAlertColors(block.variant || 'warning', themeName)
      return (
        <div className={`${alertColors.bg} border ${alertColors.border} rounded-lg p-3 text-xs ${alertColors.text}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start flex-1">
              {block.icon && <i className={`fa-solid ${block.icon} mt-0.5 mr-2`}></i>}
              <div className="flex-1">
                {block.title && <strong>{block.title}</strong>}
                {block.title && block.content && ' '}
                {block.content}
                {block.subtitle && (
                  <>
                    <br />
                    <span className="opacity-75">{block.subtitle}</span>
                  </>
                )}
              </div>
            </div>
            {block.badge && (
              <span className={`text-xs font-bold ${alertColors.bg.replace('50', '200')} ${alertColors.text} px-2 py-1 rounded-md ml-2 whitespace-nowrap border ${alertColors.border} shadow-sm`}>
                <i className="fa-solid fa-tag mr-1 text-[0.7rem]"></i>
                {block.badge}
              </span>
            )}
          </div>
        </div>
      )

    case 'info':
      const infoColors = getInfoBlockColors(block.variant || 'indigo', themeName)
      return (
        <div className={`${infoColors.bg} p-3 rounded-lg border ${infoColors.border}`}>
          <div className="flex justify-between items-start">
            <h5 className={`font-bold ${infoColors.text} text-sm`}>
              {block.icon && <i className={`fa-solid ${block.icon} mr-1`}></i>}
              {block.title}
            </h5>
            {block.badge && (
              <span className={`text-xs font-bold ${infoColors.bg.replace('50', '200')} ${infoColors.text} px-2 py-1 rounded-md border ${infoColors.border} shadow-sm`}>
                <i className="fa-solid fa-tag mr-1 text-[0.7rem]"></i>
                {block.badge}
              </span>
            )}
          </div>
          {block.date && (
            <p className={`text-xs ${infoColors.text} mt-1`}>{block.date}</p>
          )}
          {block.description && (
            <p className={`text-xs text-slate-500 mt-1 italic`}>{block.description}</p>
          )}
        </div>
      )

    case 'tbd':
      const tbdColors = getInfoBlockColors(block.variant || 'orange', themeName)
      return (
        <div className={`${tbdColors.bg} p-3 rounded-lg border ${tbdColors.border}`}>
          <h5 className={`font-bold ${tbdColors.text} text-sm`}>
            {block.icon && <i className={`fa-solid ${block.icon} mr-1`}></i>}
            {block.title}
          </h5>
          {block.content && (
            <p className={`text-xs text-slate-600 mt-1`}>
              <span className={`font-semibold ${tbdColors.text.replace('800', '600')}`}>
                需求待确认：
              </span>{' '}
              {block.content}
            </p>
          )}
        </div>
      )

    case 'complex-list':
      return (
        <ul className="space-y-3 text-sm text-slate-600">
          {(block.items || []).map((item, idx) => {
            const iconBgMap = {
              blue: 'bg-blue-100 text-blue-700',
              purple: 'bg-purple-100 text-purple-700',
              orange: 'bg-orange-100 text-orange-700',
              green: 'bg-green-100 text-green-700'
            }
            return (
              <li key={idx} className="flex items-start">
                {item.icon && (
                  <span className={`${iconBgMap[item.iconBg] || iconBgMap.blue} p-1 rounded mr-2 text-xs min-w-[20px] text-center`}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </span>
                )}
                <div>
                  {item.title && <strong>{item.title}</strong>}
                  {item.description && (
                    <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )

    case 'section':
      return (
        <div className="mb-4">
          <h4 className="font-bold text-slate-700 mb-2 text-sm uppercase tracking-wide">
            {block.title}
          </h4>
        </div>
      )

    default:
      return null
  }
}

export default ContentBlockRenderer
