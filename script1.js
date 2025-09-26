$(document).ready(function () {
  let dayCounter = 1; // Track workout days

  // Chart setup (Bar chart with Days vs Calories)
  const ctx = document.getElementById("progressChart").getContext("2d");
  let progressChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Calories Burned",
          data: [],
          backgroundColor: "rgba(255, 99, 132, 0.7)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Calories",
          },
        },
        x: {
          title: {
            display: true,
            text: "Days",
          },
        },
      },
    },
  });

  // Handle form submit
  $("#workoutForm").submit(function (e) {
    e.preventDefault();

    let type = $("#workoutType").val();
    let duration = parseInt($("#duration").val());
    let calories = parseInt($("#calories").val());

    // Add day label
    progressChart.data.labels.push("Day " + dayCounter);
    dayCounter++;

    // Update calories dataset only
    progressChart.data.datasets[0].data.push(calories);

    // Update chart
    progressChart.update();

    // Add to workout list
    $("#workoutList").append(
      `<li class="list-group-item">Day ${dayCounter - 1}: ${type} - ${duration} mins - ${calories} cal</li>`
    );

    // Reset form
    this.reset();
  });
});
