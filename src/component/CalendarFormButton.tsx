"use client";

import { FormEvent } from "react";
import { CreateCalendarReq } from "../data/api";

type CalendarFormButtonProps =
  | {
      isCreate: true;
      createCalendar: (req: CreateCalendarReq) => Promise<void>;
    }
  | {
      isCreate: false;
      updateCalendar: (req: CreateCalendarReq) => Promise<void>;
      name: string;
      birthday: string;
      lifespan: number;
    };

export default function CalendarFormButton(props: CalendarFormButtonProps) {
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
    props.isCreate
      ? props.createCalendar(params)
      : props.updateCalendar(params);
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handleCreateClick}>
        {props.isCreate ? "새 캘린더 만들기" : "캘린더 수정하기"}
      </button>

      <dialog id="calendar-form-modal" className="modal">
        <div className="modal-box">
          <h3>{props.isCreate ? "새 캘린더 만들기" : "캘린더 수정하기"}</h3>

          <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">캘린더 이름</span>
              </label>
              <input
                type="text"
                name="calname"
                placeholder="캘린더 이름"
                defaultValue={props.isCreate ? "" : props.name}
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
                defaultValue={
                  props.isCreate ? new Date().toISOString() : props.birthday
                }
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
                defaultValue={props.isCreate ? 80 : props.lifespan}
                className="input input-bordered w-full"
              />
            </div>

            <div className="py-3">
              <button className="btn btn-primary" type="submit">
                {props.isCreate ? "만들기" : "수정하기"}
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
