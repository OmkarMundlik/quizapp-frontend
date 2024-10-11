import React, { useState } from 'react';
import { AgCharts } from 'ag-charts-react';

const QuizAnalyticsPieChart = ({ totalAvailableQuizzes, totalQuizzesAttempted }) => {
    // Data for the pie chart
    const data = [
        { category: 'Attempted', value: totalQuizzesAttempted },
        { category: 'Remaining', value: totalAvailableQuizzes - totalQuizzesAttempted },
    ];

    // Chart Options
    const [chartOptions] = useState({
        title: {
            text: 'Quizzes Attempted vs Remaining',
        },
        series: [
            {
                type: 'pie',
                angleKey: 'value',  // Key for the pie angle
                calloutLabelKey: 'category',  // Key for callout labels
                sectorLabelKey: 'value',  // Key for sector labels
                fills: ['#ff9999', '#66b3ff'],  // Colors for the pie sectors
                strokeWidth: 1,
                tooltip: {
                    renderer: ({ datum }) => {
                        return `${datum.category}: ${datum.value}`;
                    },
                },
            },
        ],
        data,
    });

    return (
        <div style={{ width: '400px', margin: '0 auto' }}>
            <AgCharts options={chartOptions} />
        </div>
    );
};

export default QuizAnalyticsPieChart;
