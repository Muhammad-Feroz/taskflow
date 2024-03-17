import Section from "../../../components/Section";

export default function NewTask() {
  return (
    <div>
      <Section title="New Task" isBackBtn={true} />
      <div className="p-4">
        <h3 className="text-lg font-semibold">Description</h3>
        <p className="text-gray-500 mt-2">{'Write Description'}</p>
      </div>
    </div>
  )
}