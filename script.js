document.addEventListener("DOMContentLoaded", function() {
    // Datos ficticios de azúcar antes y después de la normativa
    const traceAntes = {
      x: ["Pillows Chocolate", "Balls & Rolls", "Choco Krispis", "Astritos"],
      y: [12, 15, 10, 14], // Azúcar antes de la normativa
      name: "2010",
      type: "bar",
      marker: {
        color: "red"
      }
    };
  
    const traceDespues = {
      x: ["Pillows Chocolate", "Balls & Rolls", "Choco Krispis", "Astritos"],
      y: [8, 9, 6, 7], // Azúcar después de la normativa
      name: "2015",
      type: "bar",
      marker: {
        color: "green"
      }
    };
  
    const layout = {
      title: "Reformulación de Azúcar en Cereales tras Nueva Normativa",
      xaxis: { title: "Cereales" },
      yaxis: { title: "Gramos de Azúcar" },
      barmode: "group"
    };
  
    Plotly.newPlot("chart", [traceAntes, traceDespues], layout);
  });
    