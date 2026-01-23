import { useRef } from 'react'
import RoadmapHeader from './RoadmapHeader'
import MilestoneCard from './MilestoneCard'

const PreviewPanel = ({ roadmapData }) => {
  const previewRef = useRef(null)

  return (
    <div className="h-full overflow-y-auto bg-slate-50" ref={previewRef} id="roadmap-preview">
      <RoadmapHeader meta={roadmapData.data.meta} />

      {/* Timeline Container */}
      <div className="max-w-5xl mx-auto px-4 py-12 relative">
        {/* Central Line */}
        <div className="timeline-line rounded-full"></div>

        {/* Milestones */}
        {roadmapData.data.milestones.map((milestone, index) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            index={index}
            themeName={roadmapData.data.meta.theme}
          />
        ))}

        {/* Future Marker */}
        <div className="text-center mt-12 relative z-10 opacity-50">
          <div className="inline-block p-2 bg-slate-200 rounded-full text-slate-500 text-sm">
            <i className="fa-solid fa-arrow-down"></i> 后续规划
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} Product Team. Internal Use Only.
      </footer>
    </div>
  )
}

export default PreviewPanel
