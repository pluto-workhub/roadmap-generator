import { getThemeColors } from '../../utils/themeConfig'

const RoadmapHeader = ({ meta }) => {
  const theme = getThemeColors(meta.theme)

  return (
    <div className={`${theme.colors.header.bg} ${theme.colors.header.text} py-12 px-4 shadow-lg`}>
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{meta.title}</h1>
        <p className="text-slate-300 text-lg">{meta.subtitle}</p>
        {meta.legend && meta.legend.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            {meta.legend.map((item, index) => {
              const colorMap = {
                amber: 'bg-amber-500',
                emerald: 'bg-emerald-500',
                blue: 'bg-blue-500',
                rose: 'bg-rose-500',
                indigo: 'bg-indigo-500'
              }
              return (
                <span key={index} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colorMap[item.color] || 'bg-slate-500'}`}></div>
                  {item.label}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default RoadmapHeader
