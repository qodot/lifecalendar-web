"use client";

import CalendarForm from "./CalendarForm";

export default function CreateCalendarButton() {
  async function handleCreateClick() {
    // @ts-ignore
    document.getElementById("create-calendar-modal").showModal();
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handleCreateClick}>
        새 캘린더 만들기
      </button>

      <dialog id="create-calendar-modal" className="modal">
        <div className="modal-box">
          <h3>새 캘린더 만들기</h3>

          <CalendarForm isCreate />

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
