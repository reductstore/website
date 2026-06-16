import React, { JSX } from "react";
import BookingCall from "@site/src/components/shared/BookingCall";

export default function ArchitectureReviewPage(): JSX.Element {
  return (
    <BookingCall
      title="Architecture Review"
      description="Schedule a free architecture review to walk through your robotics data pipeline and see how ReductStore fits your production fleet."
      intro="Pick a time that works for you and we will walk through your current data pipeline architecture, identify gaps in retention and auditability, and show how ReductStore fits your production fleet."
      calendarSrc="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3kZddaxQGWWPyFXzdgh5c3S151bCObkRQMnp5KcpeeVGUewaiTr6EKo_8dbZhBdZPnhk9MytZ6?gv=true"
    />
  );
}
