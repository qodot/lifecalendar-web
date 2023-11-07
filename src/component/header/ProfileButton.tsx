import useAuth from "@/src/hook/useAuth";

export default function ProfileButton() {
  const { signOut } = useAuth();

  async function handleClickSignOut() {
    await signOut();
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-sm btn-circle">
        me
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>설정</a>
        </li>
        <li>
          <a onClick={handleClickSignOut}>로그아웃</a>
        </li>
      </ul>
    </div>
  );
}
