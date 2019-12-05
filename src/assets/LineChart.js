import { Line } from 'vue-chartjs'

const options = {
    title: {
        display: true,
        text: 'Percentage of Toilet Paper Consumption'
    },
    legend: {
        display: false
    },
    elements: {
        line: {
            tension: 0
        }
    },
    maintainAspectRatio: false,
    scales: {
        xAxes: [{
            type: 'time',
            time: {
                unit: 'day',
            },
            ticks: {
                min: new Date(new Date(new Date().setHours(0, 0, 0, 0)) - 7 * 24 * 60 * 60 * 1000),
                max: new Date(new Date().setHours(0, 0, 0, 0))
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Percentage'
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 300
            }
        }]
    }
}

export default {
    extends: Line,
    props: {
        chartdata: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.renderChart(this.chartdata, options)
    }
}
