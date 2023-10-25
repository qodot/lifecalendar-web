"use client";

import { FormEvent } from "react";
import { createCalendar, updateCalendar } from "../data/api";

type CalendarFormButtonProps =
  | {
      isCreate: true;
      id?: undefined;
      name?: undefined;
      birthday?: undefined;
      lifespan?: undefined;
    }
  | {
      isCreate: false;
      id: string;
      name: string;
      birthday: string;
      lifespan: number;
    };

export default function CalendarFormButton({
  isCreate,
  id,
  name,
  birthday,
  lifespan,
}: CalendarFormButtonProps) {
  async function handleCreateClick() {
    // @ts-ignore
    document.getElementById("calendar-form-modal").showModal();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = {
      name: event.currentTarget.calname.value,
      birthday: event.currentTarget.birthday.value,
      lifespan: parseInt(event.currentTarget.lifespan.value),
    };
    isCreate ? await createCalendar(params) : await updateCalendar(id, params);
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handleCreateClick}>
        {isCreate ? "새 캘린더 만들기" : "캘린더 수정하기"}
      </button>

      <dialog id="calendar-form-modal" className="modal">
        <div className="modal-box">
          <h3>{isCreate ? "새 캘린더 만들기" : "캘린더 수정하기"}</h3>

          <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">캘린더 이름</span>
              </label>
              <input
                type="text"
                name="calname"
                placeholder="캘린더 이름"
                defaultValue={name}
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
                defaultValue={birthday}
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
                defaultValue={lifespan}
                className="input input-bordered w-full"
              />
            </div>

            <div className="py-3">
              <button className="btn btn-primary" type="submit">
                {isCreate ? "만들기" : "수정하기"}
              </button>
            </div>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">닫기</button>
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
