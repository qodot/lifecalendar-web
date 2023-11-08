import MyCalendarDetail from "@/src/component/cal/MyCalendarDetail";

export default async function Page({ params }: { params: { id: string } }) {
  return <MyCalendarDetail id={params.id} />;
}
