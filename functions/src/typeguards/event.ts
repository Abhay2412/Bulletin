import { Event } from "../../../types";

export function isEvent(arg: any): arg is Event {
  // cast any argument being sent into the event
  const obj: Event = arg;

  return (
    // Check that the even exists
    obj &&
    // Check that the event's fields are defined
    obj.name !== undefined &&
    obj.date !== undefined &&
    // Check each event has the correct type
    typeof obj.name === "string" &&
    typeof obj.date === "string"
  );
}