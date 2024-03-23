import { useDrop } from "react-dnd";
import Task from "./Task";

export default function Column({ column, handleDrop }:{ column: any, handleDrop: any}) {
  const [_, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: any) => {
      handleDrop(item.columnId, column.id, item.taskId);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="w-full" ref={drop}>
      <div className="flex justify-between items-center p-2 sticky top-0 bg-indigo-100 px-3">
        <h2 className="text-sm font-bold">{column.title}</h2>
        <div className="min-h-6 min-w-6 text-xs flex justify-center items-center bg-indigo-600 text-white rounded p-1" >
          {column.tasks.length}
        </div>
      </div>
      {
        column.tasks.map((task:any) => <Task key={task.id} task={task} columnId={column.id} />)
      }
    </div>
  )
}