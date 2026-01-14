const programData = [
  { day: 'Day 1', activity: 'Opening Ceremony', time: '9:00 AM', location: 'School Hall' },
  { day: 'Day 2', activity: 'Workshops & Seminars', time: '10:00 AM', location: 'Classrooms' },
  { day: 'Day 3', activity: 'Sports & Competitions', time: '8:00 AM', location: 'Field / Hall' },
  { day: 'Day 4', activity: 'Community Service', time: '7:00 AM', location: 'Assigned Areas' },
  { day: 'Day 5', activity: 'Talent Show', time: '4:00 PM', location: 'Auditorium' },
  { day: 'Day 6', activity: 'SRC Talks & Mentoring', time: '10:00 AM', location: 'Classrooms' },
  { day: 'Day 7', activity: 'Closing Ceremony', time: '3:00 PM', location: 'School Hall' },
];

const ProgramOutline = () => {
  return (
    <section id="program" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Program Schedule</h2>
        <div className="section-divider" />

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="table-header-cell rounded-tl-md">Day</th>
                <th className="table-header-cell">Activity</th>
                <th className="table-header-cell hidden sm:table-cell">Time</th>
                <th className="table-header-cell rounded-tr-md">Location</th>
              </tr>
            </thead>
            <tbody className="bg-card">
              {programData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="table-body-cell font-medium text-primary">
                    {item.day}
                  </td>
                  <td className="table-body-cell">{item.activity}</td>
                  <td className="table-body-cell hidden sm:table-cell text-muted-foreground">
                    {item.time}
                  </td>
                  <td className="table-body-cell text-muted-foreground">
                    {item.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProgramOutline;
