import { useState } from 'react'
import GlobalSettings from './GlobalSettings'
import MilestoneEditor from './MilestoneEditor'
import ExportButtons from '../Export/ExportButtons'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const SortableMilestone = ({ milestone, index, roadmapData }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: milestone.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex items-center gap-2 mb-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600"
        >
          <i className="fa-solid fa-grip-vertical"></i>
        </div>
      </div>
      <MilestoneEditor
        milestone={milestone}
        roadmapData={roadmapData}
        index={index}
      />
    </div>
  )
}

const EditorPanel = ({ roadmapData }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = roadmapData.data.milestones.findIndex(m => m.id === active.id)
      const newIndex = roadmapData.data.milestones.findIndex(m => m.id === over.id)
      roadmapData.reorderMilestones(oldIndex, newIndex)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-300 bg-slate-50">
        <h2 className="text-lg font-bold text-slate-800">编辑器</h2>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <GlobalSettings
          meta={roadmapData.data.meta}
          updateMeta={roadmapData.updateMeta}
        />

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">里程碑</h3>
            <button
              onClick={roadmapData.addMilestone}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center gap-1"
            >
              <i className="fa-solid fa-plus"></i>
              添加里程碑
            </button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={roadmapData.data.milestones.map(m => m.id)}
              strategy={verticalListSortingStrategy}
            >
              {roadmapData.data.milestones.map((milestone, index) => (
                <SortableMilestone
                  key={milestone.id}
                  milestone={milestone}
                  index={index}
                  roadmapData={roadmapData}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      <div className="p-4 border-t border-slate-300 bg-slate-50">
        <ExportButtons roadmapData={roadmapData} />
      </div>
    </div>
  )
}

export default EditorPanel
