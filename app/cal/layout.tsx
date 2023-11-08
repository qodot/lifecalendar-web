import ButtonGroup from "@/src/component/header/ButtonGroup";

export default function CalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost btn-sm">라이프 캘린더</a>
        </div>

        <div className="flex-none">
          <ButtonGroup />
        </div>
      </div>
      <main className="flex flex-col py-10 px-32">{children}</main>
    </>
  );
}
