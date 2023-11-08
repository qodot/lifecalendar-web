import Link from "next/link";
import { formatDateKorean, formatNumberComma } from "@/src/util/format";
import CalendarFormButton from "../CalendarFormButton";
import CalendarMatrix from "./CalendarMatrix";
import { CreateCalendarReq } from "@/src/data/api";

export default function CalendarDetail({
  calendar,
  updateCalendar,
}: {
  calendar: Calendar;
  updateCalendar: (req: CreateCalendarReq) => Promise<void>;
}) {
  return (
    <>
      <h1 className="flex flex-row items-center">
        <Link href="/cal">
          <svg
            className="w-10 h-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
          </svg>
        </Link>
        {calendar.name}
      </h1>

      <div className="flex flex-row justify-between items-center">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">나이</div>
            <div className="stat-value">{calendar.age}살</div>
            <div className="stat-desc">
              {formatDateKorean(calendar.birthday)}생
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">내가 지나온 삶</div>
            <div className="stat-value">{calendar.total_percentage}%</div>
            <div className="stat-desc">
              <progress
                className="progress progress-primary w-56"
                value={calendar.total_percentage.toString()}
                max="100"
              ></progress>
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">나에게 남은 주</div>
            <div className="stat-value">
              {formatNumberComma(calendar.future_week_count)}주
            </div>
            <div className="stat-desc">
              지나온 주 {formatNumberComma(calendar.past_week_count)}주
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">
              올해({new Date().getFullYear()}년) 진행률
            </div>
            <div className="stat-value">{calendar.this_year_percentage}%</div>
            <div className="stat-desc">
              {calendar.this_year_future_week_count}주 남았어요!
            </div>
          </div>
        </div>

        <CalendarFormButton
          isCreate={false}
          updateCalendar={updateCalendar}
          name={calendar.name}
          birthday={calendar.birthday}
          lifespan={calendar.lifespan}
        />
      </div>

      <div className="pt-10">
        <CalendarMatrix calendar={calendar} />
      </div>
    </>
  );
}
