import Vue from 'vue'
import { Bar } from 'vue-chartjs'

Vue.component('router-chart', {
  extends: Bar,
  mounted () {
    this.renderChart({
      labels: ['Январь \'19', 'Февраль \'19', 'Март \'19', 'Апрель \'19', 'Май \'19', 'Июнь \'19', 'Июль \'19', 'Август \'19', 'Сентябрь \'19', 'Октябрь \'19', 'Ноябрь \'19', 'Декабрь \'19'],
      datasets: [
        {
          label: 'Enduro',
          backgroundColor: '#906090',
          data: [40, 50, 14, 74, 12, 41, 85, 45, 41, 11, 15, 0]
        },
        {
          label: 'Naked',
          backgroundColor: '#990000',
          data: [43, 20, 42, 54, 9, 74, 14, 45, 54, 82, 11, 0]
        }

      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})