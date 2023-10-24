import { FormEvent } from "react";
import { createCalendar } from "../data/api";

export default function CalendarForm({ isCreate }: { isCreate: boolean }) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    isCreate &&
      (await createCalendar({
        name: event.currentTarget.calname.value,
        birthday: event.currentTarget.birthday.value,
        lifespan: parseInt(event.currentTarget.lifespan.value),
      }));
  }

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">캘린더 이름</span>
        </label>
        <input
          type="text"
          name="calname"
          placeholder="캘린더 이름"
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">생일</span>
        </label>
        <input
          type="date"
          name="birthday"
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">예상 수명</span>
        </label>
        <input
          type="number"
          name="lifespan"
          placeholder="예상 수명"
          className="input input-bordered w-full"
        />
      </div>

      <div className="py-3">
        <button className="btn btn-primary" type="submit">
          {isCreate ? "만들기" : "수정하기"}
        </button>
      </div>
    </form>
  );
}
