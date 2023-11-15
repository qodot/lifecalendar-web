import useAuth from "@/src/hook/useAuth";
import { FormEvent } from "react";

export default function DefaultButtonGroup() {
  const { signUp, signIn } = useAuth();

  async function handleClickSignUp() {
    // @ts-ignore
    document.getElementById("sign-up-form-modal").showModal();
  }

  async function handleClickSignIn() {
    // @ts-ignore
    document.getElementById("sign-in-form-modal").showModal();
  }

  async function handleSubmitSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await signUp(
      event.currentTarget.email.value,
      event.currentTarget.password.value,
      event.currentTarget.passwordConfirm.value,
    );
    // @ts-ignore
    document.getElementById("sign-up-form-modal").close();
  }

  async function handleSubmitSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await signIn(
      event.currentTarget.email.value,
      event.currentTarget.password.value,
    );
    // @ts-ignore
    document.getElementById("sign-in-form-modal").close();
  }

  return (
    <>
      <button className="btn btn-sm btn-primary" onClick={handleClickSignUp}>
        가입
      </button>

      <dialog id="sign-up-form-modal" className="modal">
        <div className="modal-box">
          <h3>가입</h3>

          <form className="flex flex-col gap-1" onSubmit={handleSubmitSignUp}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">이메일</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="your@email.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">비밀번호</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">비밀번호 확인</span>
              </label>
              <input
                type="password"
                name="passwordConfirm"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="py-3">
              <button className="btn btn-primary" type="submit">
                가입
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

      <button
        className="btn btn-outline btn-sm btn-primary ml-1"
        onClick={handleClickSignIn}
      >
        로그인
      </button>

      <dialog id="sign-in-form-modal" className="modal">
        <div className="modal-box">
          <h3>로그인</h3>

          <form className="flex flex-col gap-1" onSubmit={handleSubmitSignIn}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">이메일</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="your@email.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">비밀번호</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="py-3">
              <button className="btn btn-primary" type="submit">
                로그인
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
