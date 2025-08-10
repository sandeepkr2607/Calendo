import {
  startOfMonth,
  startOfWeek,
  addDays,
  format,
  isSameMonth,
} from 'date-fns';

export function getMonthGridDates(year: number, month: number) {
  const monthStart = startOfMonth(new Date(year, month));
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });

  const days: { date: string; inCurrentMonth: boolean }[] = [];

  for (let i = 0; i < 42; i++) {
    const day = addDays(gridStart, i);
    days.push({
      date: format(day, 'yyyy-MM-dd'),
      inCurrentMonth: isSameMonth(day, monthStart),
    });
  }

  return days;
}
