document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("expenseChart");
    const graphTitle = document.getElementById("graphTitle");
    const calendarEl = document.getElementById("calendar");

    if (!canvas || !graphTitle || !calendarEl) {
        console.error("Required DOM elements not found!");
        return;
    }

    const ctx = canvas.getContext("2d");
    let chart;
    let calendar;

    // 🔄 Fetch and parse expenses from LocalStorage
    // This now correctly processes the structure saved by add_expense.html
    const rawExpenseData = typeof expenseDataFromPHP === "object" ? expenseDataFromPHP : {};
    const expenseData = {};
    for (const date in rawExpenseData) {
        if (rawExpenseData.hasOwnProperty(date)) {
            let dailyTotal = 0;
            rawExpenseData[date].forEach(entry => {
                dailyTotal += parseFloat(entry.amount) || 0;
            });
            expenseData[date] = dailyTotal;
        }
    }

    // 📈 Load and render graph
    function loadGraph(type = "weekly") {
        if (!ctx) return;
        if (chart) chart.destroy();

        let labels = [], data = [];
        const now = new Date();

        if (type === "weekly") {
            graphTitle.textContent = "Weekly Expense Chart";
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - now.getDay());

            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            for (let i = 0; i < 7; i++) {
                const date = new Date(weekStart);
                date.setDate(weekStart.getDate() + i);
                const key = date.toISOString().split("T")[0];
                labels.push(days[date.getDay()]);
                data.push(expenseData[key] ? parseFloat(expenseData[key]) : 0);
            }
        } else if (type === "monthly") {
            graphTitle.textContent = "Monthly Expense Chart";
            const year = now.getFullYear();
            const month = now.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let i = 1; i <= daysInMonth; i++) {
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
                labels.push(i.toString());
                data.push(expenseData[dateStr] ? parseFloat(expenseData[dateStr]) : 0);
            }
        } else if (type === "yearly") {
            graphTitle.textContent = "Yearly Expense Chart";
            const year = now.getFullYear();
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            labels = months;
            data = new Array(12).fill(0);

            for (const dateStr in expenseData) {
                const [y, m] = dateStr.split("-");
                if (parseInt(y) === year) {
                    const monthIndex = parseInt(m) - 1;
                    data[monthIndex] += parseFloat(expenseData[dateStr]);
                }
            }
        }

        const allZero = data.every(val => val === 0);
        if (allZero) graphTitle.textContent += " (No Data)";

        chart = new Chart(ctx, {
            type: type === "weekly" ? "bar" : "line",
            data: {
                labels,
                datasets: [{
                    label: "Expenses",
                    data,
                    backgroundColor: "rgba(65, 105, 225, 0.7)",
                    borderColor: "rgba(65, 105, 225, 0.7)",
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: context => `₹${context.parsed.y.toFixed(2)}`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: val => `₹${val}`
                        }
                    }
                }
            }
        });
    }

    // 🗓️ Initialize FullCalendar with expense display and dateClick
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        nowIndicator: true,
        dayMaxEvents: true,
        events: Object.keys(expenseData).map(date => {
            return {
                title: `₹${parseFloat(expenseData[date]).toFixed(2)}`,
                start: date,
                allDay: true
            };
        }),
        dateClick: function(info) {
            const selectedDate = info.dateStr;
            window.location.href = "add_expense.html?date=" + selectedDate; // Link to static HTML
        }
    });
    calendar.render();

    // ⏯️ Load weekly chart by default
    loadGraph("weekly");

    // 🧠 Make loadGraph globally accessible for buttons
    window.loadGraph = loadGraph;

    // 🔄 Ensure real-time updates (if you are using localStorage elsewhere)
    window.addEventListener("storage", () => {
        // Reload expenses from local storage and update graphs/calendar
        const updatedStoredExpenses = localStorage.getItem('expendriaExpenses');
        const updatedRawExpenseData = updatedStoredExpenses ? JSON.parse(updatedStoredExpenses) : {};
        for (const date in updatedRawExpenseData) {
            if (updatedRawExpenseData.hasOwnProperty(date)) {
                let dailyTotal = 0;
                updatedRawExpenseData[date].forEach(entry => {
                    dailyTotal += parseFloat(entry.amount) || 0;
                });
                expenseData[date] = dailyTotal;
            }
        }
        loadGraph("weekly"); // Reload the graph
        calendar.setOption('events', Object.keys(expenseData).map(date => ({ // Re-render calendar events
            title: `₹${parseFloat(expenseData[date]).toFixed(2)}`,
            start: date,
            allDay: true
        })));
    });
});