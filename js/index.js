function fetchData() {
   fetch('./ZonAnn.Ts+dSST.csv')
      .then(res => res.text())
      .then((data) => {
         console.log(Papa.parse(data));
      })
};

fetchData();
