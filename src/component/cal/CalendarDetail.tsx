import CalendarDetailHeader from "./CalendarDetailHeader";
import CalendarMatrix from "./CalendarMatrix";

export default function CalendarDetail({ calendar }: { calendar: Calendar }) {
  return (
    <>
      <CalendarDetailHeader calendar={calendar} />

      <div className="pt-10">
        <CalendarMatrix calendar={calendar} />
      </div>
    </>
  );
}
