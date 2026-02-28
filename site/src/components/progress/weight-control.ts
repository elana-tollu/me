import { Temporal } from "temporal-polyfill";

export interface DayWeight {
    day: string;
    weight: number;
}

const data : DayWeight[] = [
    {day: '2026-03-09', weight: 81.9},
    {day: '2026-02-02', weight: 81.9},
    {day: '2026-02-03', weight: 81.6},
    {day: '2026-02-04', weight: 81.4},
    {day: '2026-02-05', weight: 81.3},
    {day: '2026-02-06', weight: 80.7},
    {day: '2026-02-07', weight: 80.4},
    {day: '2026-02-08', weight: 80.6},
    {day: '2026-02-09', weight: 80.5},
    {day: '2026-02-10', weight: 80.5},
    {day: '2026-02-11', weight: 80.4},
    {day: '2026-02-12', weight: 80.6},
    {day: '2026-01-01', weight: 81.9},
    {day: '2026-01-05', weight: 81.9},
];

function avg(numbers: number[] ): number {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }

    return sum / numbers.length;
}

function weekNumber(date: string): number {
    const plainDate = Temporal.PlainDate.from(date);

    return plainDate.weekOfYear!;
}

console.log('weekNumber', weekNumber('2026-02-22'));

interface WeekWeight {
    weekNumber: number;
    weight: number;
}

function calculateWeekWeights(data : DayWeight[]) : WeekWeight[] {
    const weekWeights: WeekWeight[] = [];
    let currentWeek: number | null = null;
    let currentWeights: number[] = [];

    data.sort((a, b) => {
        if (a.day > b.day) {
            return 1
        } else {
            return -1
        }
    });

    for (const dayWeight of data) {
        const week =  weekNumber(dayWeight.day);

        if (week == currentWeek) {
            currentWeights.push(dayWeight.weight);
            console.log('CurrentWeek - ', week);
        } else {
            if (currentWeek != null) {
                const weight = avg(currentWeights);
                const weekWeight: WeekWeight = {
                    weekNumber: currentWeek,
                    weight,
                }
                weekWeights.push(weekWeight);
                console.log ('Week completed');
            }
            currentWeek = week;
            currentWeights = [dayWeight.weight];
        }
    }
    if (currentWeights.length > 0) {
        const weight = avg(currentWeights);
        const weekWeight: WeekWeight = {
            weekNumber: currentWeek!,
            weight,
        }
        weekWeights.push(weekWeight);
        console.log ('Week completed');
    }

    return weekWeights;
}

console.log('WeekWeights: ', calculateWeekWeights(data));

interface OneWeek {
    week: number;
    weights: number[];
}

function calculateWeekWeights2(data : DayWeight[]) {

    const weekWeights: Record<number, OneWeek> = {};

    for (const dayWeight of data) {
        const week =  weekNumber(dayWeight.day);

        const currentWeekWeights= weekWeights[week] ?? {week, weights: []};
        currentWeekWeights.weights.push(dayWeight.weight);
        weekWeights[week] = currentWeekWeights;
    }

    const result: WeekWeight[] = [];

    for (const oneWeek of Object.values(weekWeights)) {

        const weight = avg(oneWeek.weights);

        const weekWeight: WeekWeight = {
            weekNumber: oneWeek.week,
            weight,
        }

        result.push(weekWeight);
    }

    return result;
}

console.log(calculateWeekWeights2(data));

export function calculateWeekWeights3(data : DayWeight[]) {

    const byWeeks = Object.groupBy(data, dayWeight => weekNumber(dayWeight.day));

    const result: WeekWeight[] = [];

    for (const oneWeek of Object.values(byWeeks)) {
        const week = weekNumber(oneWeek![0].day);
        const weights = oneWeek!.map(dayWeight => dayWeight.weight);

        const weight = avg(weights);

        const weekWeight: WeekWeight = {
            weekNumber: week,
            weight,
        }

        result.push(weekWeight);
    }
    result.sort((a, b) => a.weekNumber - b.weekNumber);

    return result;
}

console.log(calculateWeekWeights3(data));
