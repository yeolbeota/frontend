export function msToTime(duration: number) {
  let seconds = String(Math.floor((duration / 1000) % 60)).padStart(2, "0"),
    minutes = String(Math.floor((duration / (1000 * 60)) % 60)).padStart(
      2,
      "0"
    ),
    hours = String(Math.floor((duration / (1000 * 60 * 60)) % 24)).padStart(
      2,
      "0"
    );

  return [hours, minutes, seconds];
}
