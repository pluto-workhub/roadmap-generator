import { getStatusColors } from '../../utils/themeConfig'
import ContentBlockRenderer from './ContentBlockRenderer'

const MilestoneCard = ({ milestone, index, themeName }) => {
  const colors = getStatusColors(milestone.status, themeName)
  const isEven = index % 2 === 1

  return (
    <div className={`relative z-10 mb-12 md:flex md:justify-between items-start w-full card-enter delay-${(index % 3) + 1}00 ${isEven ? 'flex-row-reverse' : ''}`}>
      {/* Icon Marker */}
      <div className={`absolute left-[4px] md:left-1/2 md:-translate-x-1/2 w-8 h-8 ${colors.bg} border-4 ${colors.border} rounded-full flex items-center justify-center shadow-md z-20 ${isEven ? 'mt-1' : ''}`}>
        <i className={`fa-solid ${milestone.icon || 'fa-circle'} ${colors.icon} text-xs`}></i>
      </div>

      {/* Date (Mobile: Right of icon, Desktop: Left/Right side) */}
      <div className={`ml-12 md:ml-0 md:w-[45%] ${isEven ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'} mb-2 md:mb-0 order-1`}>
        <span className={`inline-block px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm font-semibold border ${colors.border.replace('500', '200')}`}>
          {milestone.date}
        </span>
        <h3 className="text-xl font-bold mt-2 text-slate-800">{milestone.title}</h3>
        {milestone.description && (
          <p className="text-sm text-slate-500">{milestone.description}</p>
        )}
      </div>

      {/* Content Card */}
      <div className={`ml-12 md:ml-0 md:w-[45%] order-2 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
        <div className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${colors.border} hover:shadow-lg transition-shadow duration-300`}>
          {milestone.blocks.map((block, blockIndex) => (
            <div key={block.id || blockIndex}>
              {blockIndex > 0 && block.type !== 'section' && (
                <div className="border-t border-slate-100 my-3"></div>
              )}
              <ContentBlockRenderer block={block} themeName={themeName} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MilestoneCard
