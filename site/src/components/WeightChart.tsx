import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import type {FC} from "react";
import {calculateWeekWeights3, type DayWeight} from "./weight-control.ts";


const myshRawData : DayWeight[] = [
    {day: '2026-03-09', weight: 79.9},
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

const koshRawData : DayWeight[] = [
    {day: '2026-03-09', weight: 58.9},
    {day: '2026-02-02', weight: 61.8},
    {day: '2026-02-03', weight: 61.1},
    {day: '2026-02-04', weight: 60.3},
    {day: '2026-02-05', weight: 60.6},
    {day: '2026-02-06', weight: 60.4},
    {day: '2026-02-07', weight: 60.2},
    {day: '2026-02-08', weight: 60.9},
    {day: '2026-02-09', weight: 59.8},
    {day: '2026-02-10', weight: 60.2},
    {day: '2026-02-11', weight: 59.8},
    {day: '2026-02-12', weight: 59.2},
    {day: '2026-01-01', weight: 63.7},
    {day: '2026-01-05', weight: 62.6},
];

const myshWeekWeights = calculateWeekWeights3(myshRawData);
const koshWeekWeights = calculateWeekWeights3(koshRawData);
const MYSH_BASE = 80;
const KOSH_BASE = 60;

interface DataPoint {
    week: number,
    mysh?: number,
    kosh?: number,
}

const koshMyshData: Record<number, DataPoint> = {}

for (const k of koshWeekWeights) {
    const week = k.weekNumber;
    const kosh = k.weight - KOSH_BASE;

    koshMyshData[week] = {
        week,
        kosh,
    };
}

for (const k of myshWeekWeights) {
    const week = k.weekNumber;
    const mysh = k.weight - MYSH_BASE;

    const dataPoint = koshMyshData[week] ?? {week};
    dataPoint.mysh = mysh;

    koshMyshData[week] = dataPoint;
}

const data = Object.values(koshMyshData);
data.sort((a, b) => a.week - b.week);

// #endregion
export const WeightChart: FC = () => (
    <AreaChart
        style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
        responsive
        data={data}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
    >
        <defs>
            <linearGradient id="colorKosh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
                <stop offset="95%" stopColor="blue" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMysh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="orange" stopOpacity={0.8} />
                <stop offset="95%" stopColor="orange" stopOpacity={0} />
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis width="auto" />
        <Tooltip />
        <Area
            type="monotone"
            dataKey="kosh"
            stroke="blue"
            fillOpacity={1}
            fill="url(#colorKosh)"
            isAnimationActive={true}
        />
        <Area
            type="monotone"
            dataKey="mysh"
            stroke="orange"
            fillOpacity={1}
            fill="url(#colorMysh)"
            isAnimationActive={true}
        />

    </AreaChart>
);
