import { useNavigate } from "react-router-dom";
import Grid from "../../components/Grid";
import NotesCard from "../../components/NotesCard";
import Section from "../../components/Section";

export default function Notes() {
  const navigate = useNavigate();
  return (
    <div>
      <Section title="Notes" btnTitle="+ Add Note" btnOnClick={() => navigate('new')} />
      <Grid columns={3} gap={6}>
        {
          [1,2,3,4,5,6].map(_ => <NotesCard key={_} />)
        }
      </Grid>
    </div>
  )
}