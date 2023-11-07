"use client";

import useAuth from "@/src/hook/useAuth";
import DefaultButtonGroup from "./DefaultButtonGroup";
import ProfileButton from "./ProfileButton";

export default function ButtonGroup() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <ProfileButton /> : <DefaultButtonGroup />;
}
