const ctx = document.querySelector('.js-chart').getContext('2d');
const GLOBAL_MEAN_TEMPERATURE = 14;

fetchData().then(parseData)
   .then(getLabelsAndData)
   .then(({ years, temps }) => drawChart(years, temps));

function fetchData() {
   return fetch('./ZonAnn.Ts+dSST.csv').then((res) => res.text());
};

function parseData(data) {
   return Papa.parse(data, { header: true }).data;
};

function getLabelsAndData(data) {
   return data.reduce((acc, entry) => {
      acc.years.push(entry.Year);
      acc.temps.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);

      return acc;
      }, { years: [], temps: [] }
   );
};

function drawChart(labels, data) {
   new Chart(ctx, {
      type: 'line',
      data: {
         labels: labels,
         datasets: [{
            label: 'GMT',
            data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: true,
         }]
      },

      options: {
         scales: {
            yAxes: [{
               ticks: {
                  // beginAtZero: true // начинать с 0
                  callback: function(value) {
                  return value + '°';
               }
               }
            }],

            xAxes: [{
               ticks: {
                  // beginAtZero: true // начинать с 0
                  callback: function(value, index, values) {
                  return value + ' year';
               }
               }
            }]
         }
      }
   });
};
