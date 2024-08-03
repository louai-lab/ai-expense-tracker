"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface BarChartsDashboardProps {
    data: {
        from: string;
        to: string;
        amount: number;
        spend: number;
    }[];
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

const transformData = (data: BarChartsDashboardProps['data']) => {
    return data.map(item => ({
        dateRange: `${formatDate(item.from)} - ${formatDate(item.to)}`,
        amount: item.amount,
        spend: item.spend,
    }));
};


const chartConfig = {
    amount: {
        label: "Budget",
        color: "#2563eb",
    },
    spend: {
        label: "Spend",
        color: "#60a5fa",
    },
} satisfies ChartConfig;


export function BarChartsDashboard({ data }: BarChartsDashboardProps) {

    const chartData = transformData(data);

    // console.log("chart data", chartData)

    return (
        <ChartContainer config={chartConfig} className="min-h-[VALUE] w-full">
            <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="dateRange"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="amount" fill={chartConfig.amount.color} radius={4} />
                <Bar dataKey="spend" fill={chartConfig.spend.color} radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
