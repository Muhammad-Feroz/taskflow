import CalendarMeeting from "../../components/CalendarMeeting";
import Card from "../../components/Card";
import Grid from "../../components/Grid";
import StatsCard from "../../components/StatsCard";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl font-medium mb-8">Dashboard</h1>
      <div className="mb-16">
        <h3 className="text-base leading-6 text-gray-900 font-medium">Last 30 days</h3>
        <Grid columns={3} gap={6}>
          { [1, 2, 3].map(_ => <StatsCard key={_} />) }
        </Grid>
      </div>
      <div className="mb-16">
        <h3 className="text-2xl text-gray-900 font-medium mb-6">Upcoming Events</h3>
        <CalendarMeeting />
      </div>
      <div>
        <h3 className="text-2xl text-gray-900 font-medium mb-6">Recent Tasks</h3>
        <Grid columns={3} gap={6}>
          { [1, 2, 3].map(_ => <Card key={_} />) }
        </Grid>
      </div>
    </div>
  )
} 