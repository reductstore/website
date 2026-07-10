import React, { JSX } from "react";
import BookingCall from "@site/src/components/shared/BookingCall";

export default function FleetAuditPage(): JSX.Element {
  return (
    <BookingCall
      title="Fleet Audit Introduction Call"
      description="Schedule a free fleet audit introduction call to discuss your robotics data pipeline and CRA compliance requirements."
      intro="Pick a time that works for you and we will analyze your current data pipeline against CRA requirements and show how ReductStore fits your production fleet."
      calendarSrc="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3kZddaxQGWWPyFXzdgh5c3S151bCObkRQMnp5KcpeeVGUewaiTr6EKo_8dbZhBdZPnhk9MytZ6?gv=true"
    />
  );
}
