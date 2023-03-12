import React from 'react'

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const VerticalBar = ({ userMostPost, text }) => {
    return (
        <React.Fragment>
            <Bar
                data={userMostPost}
                options={{
                    indexAxis: 'x',
                    elements: {
                        bar: {
                            borderWidth: 1,
                        },
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text: text,
                        },
                    },
                    scales: {
                        xAxis: {
                            ticks: {
                                callback: function (value) {
                                    if (this.getLabelForValue(value).length > 6) {
                                        return this.getLabelForValue(value).substr(0, 6) + '...'
                                    } else {
                                        return this.getLabelForValue(value)
                                    }
                                },
                            },
                        },
                        yAxis: {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    },

                    barThickness: 60,
                    maxBarThickness: 300,
                }}
            />
        </React.Fragment>
    )
}

export default VerticalBar
