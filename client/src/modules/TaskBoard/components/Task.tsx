import { useDrag } from "react-dnd";
import { useNavigate } from "react-router-dom";

export default function Task({ task, columnId }: { task: any, columnId: number }) {
  const navigate = useNavigate();
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { columnId: columnId, taskId: task.id },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <>
      <div key={task.id} className={`h-[200px] bg-white shadow-md w-full mt-6 cursor-pointer ${isDragging ? 'opacity-50' : ''}`} ref={drag} role="handle" onClick={() => navigate(`${task.id}`)}>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-500 mt-2">{task.description}</p>
        </div>
      </div>
    </>
  );
}