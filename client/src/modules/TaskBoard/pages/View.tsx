import { useParams } from "react-router-dom";
import Section from "../../../components/Section";

export default function ViewTask() {
  const { taskId } = useParams();

  return (
    <div>
      <Section title={taskId || 'View Task'} isBackBtn={true} />
      <div className="p-4">
        <h3 className="text-lg font-semibold">Description</h3>
        <p className="text-gray-500 mt-2">{'data.description'}</p>
      </div>
    </div>
  )
}