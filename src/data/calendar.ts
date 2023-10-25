type Calendar = {
  id: string;
  name: string;
  birthday: string;
  lifespan: number;

  deathday: string;
  age: number;
  total_percentage: number;
  past_week_count: number;
  future_week_count: number;

  years: Year[];
};

type Year = {
  yearnum: number;
  weeks: Week[];
};

type Week = {
  yearnum: number;
  weeknum: number;
  time_type: TimeType;
};

type TimeType = "before_born" | "past" | "now" | "future" | "after_death";
