import Grid from "../../components/Grid";
import Section from "../../components/Section";
import { useState } from "react";
import Column from "./components/Column";
import { columnss } from "./data";
import { useNavigate } from "react-router-dom";
import SelectInput from "../../components/SelectInput";

export default function TaskBoard() {
  const [columns, setColumns] = useState(columnss)
  const navigate = useNavigate();

  const moveTask = (fromColumnId: number, toColumnId: number, taskId: number) => {
    const fromColumn = columns.find((c) => c.id === fromColumnId);
    const toColumn = columns.find((c) => c.id === toColumnId);
    const task = fromColumn?.id !== toColumn?.id && fromColumn?.tasks.find((t) => t.id === taskId);
    if (task && fromColumn) {
      toColumn?.tasks.push(task);
      fromColumn.tasks = fromColumn?.tasks.filter((t) => t.id !== taskId)
      setColumns([...columns]);
    }
  }

  return (
    <div>
      <Section 
        title="Task Board" 
        description="Here you can view and manage all of your tasks."
        btnTitle="+ Add Task"
        btnOnClick={() => navigate('/task-board/new')}
      />
      <Grid columns={3} gap={10} className="bg-slate-50 p-4 pb-6">
        <SelectInput lable="Projects" options={[]} selectedOption={null} onChange={() => {}} />
      </Grid>
      <Grid columns={3} gap={10} className=" overflow-scroll bg-slate-50 px-4 pb-6 shadow-md" style={{ height: 'calc(100vh - 300px)' }}>
        {
          columns.map((column) => <Column key={column.id} column={column} handleDrop={moveTask} />)
        }
      </Grid>
    </div>
  )
}