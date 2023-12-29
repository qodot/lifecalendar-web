import { useState } from "react";

import {
  CreatePeriodReq,
  createPeriod as createPeriodAPI,
} from "@/src/data/api";
import useAuth from "./useAuth";

type UseCreatePeriod = {
  selectWeek: (year: number, week: number) => void;
  createPeriod: (req: CreatePeriodReq) => Promise<void>;
};

export default function useCreatePeriod(calendarId: string): UseCreatePeriod {
  const { accessToken } = useAuth();
  const [req, setReq] = useState<CreatePeriodReq>({
    name: "",
    startYear: 0,
    startWeek: 0,
    endYear: 0,
    endWeek: 0,
    color: "",
  });

  function selectWeek(year: number, week: number): boolean {
    if (
      req.startYear === 0 &&
      req.startWeek === 0 &&
      req.endYear === 0 &&
      req.endWeek === 0
    ) {
      // nothing selected, so select start week
      setReq({ ...req, startYear: year, startWeek: week });
    } else if (
      req.startYear !== 0 &&
      req.startWeek !== 0 &&
      req.endYear === 0 &&
      req.endWeek === 0
    ) {
      // only start week is selected, so select end week
      setReq({ ...req, endYear: year, endWeek: week });
    } else if (
      req.startYear !== 0 &&
      req.startWeek !== 0 &&
      req.endYear !== 0 &&
      req.endWeek !== 0
    ) {
      // start and end week are selected, so reset and select start week
      setReq({
        ...req,
        startYear: year,
        startWeek: week,
        endYear: 0,
        endWeek: 0,
      });
    } else {
      throw new Error(`invalid selected week: ${req}`);
    }
  }

  async function createPeriod(req: CreatePeriodReq) {
    if (accessToken === null) throw new Error("access token is null");
    await createPeriodAPI(calendarId, req, accessToken);
  }

  return {
    selectWeek,
    createPeriod,
  };
}
