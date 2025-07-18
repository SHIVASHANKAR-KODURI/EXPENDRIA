# Expendria: Your Personal Expense Tracker (Static HTML Version) 💰

Expendria is a simple, client-side web application designed to help you track your daily, weekly, monthly, and yearly expenses. This version of Expendria operates entirely within your web browser, leveraging **LocalStorage** to persist your expense data without the need for a backend server or traditional database.

## ✨ Features

  * **Expense Tracking**: Record individual expense items and their corresponding amounts for specific dates.
  * **Calendar View**: Visually see your total expenses for each day directly on an interactive calendar.
  * **Interactive Charts**: Gain insights into your spending habits with dynamic weekly, monthly, and yearly expense charts, powered by Chart.js.
  * **Local Data Storage**: All your financial data is securely stored in your web browser's [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), ensuring privacy and offline accessibility.
  * **Responsive Design**: The application includes basic responsive CSS to provide a usable experience across various screen sizes, from desktops to mobile phones.
  * **Dynamic Greeting**: A friendly greeting message ("Good morning," "Good afternoon," "Good evening," or "Good night") dynamically adjusts based on the time of day.

-----

## 🚀 Getting Started

To get Expendria up and running on your local machine, follow these simple steps:

### Prerequisites

You only need a modern web browser (e.g., Chrome, Firefox, Edge, Safari). No server-side environment (like PHP or Node.js) or database installation is required.

### Installation

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/YOUR_USERNAME/expendria.git
    ```

    (Replace `YOUR_USERNAME` with your actual GitHub username or the repository owner's username.)

2.  **Navigate to the Project Directory**:

    ```bash
    cd expendria
    ```

3.  **Open in Browser**:
    Open the `home.html` file directly in your web browser. You can usually do this by double-clicking the file or by dragging it into an open browser window.

    ```bash
    # Example (might vary based on your OS)
    open home.html
    ```

-----

## ✍️ How to Use

1.  **Dashboard (`home.html`)**:
      * This is your main dashboard. You'll see a dynamic greeting, an expense chart, and a calendar.
      * The calendar will display total expenses for days where data exists.
      * Use the "Weekly," "Monthly," and "Yearly" buttons below the chart to change its visualization.
2.  **Adding/Editing Expenses (`add_expense.html`)**:
      * To add or edit expenses for a specific date, **click on that date in the calendar** on the `home.html` page. This will take you to `add_expense.html` with the selected date pre-filled.
      * Alternatively, you can open `add_expense.html` directly and use the "Select Date" input to choose a date.
      * Enter your expense **Item** and **Amount** in the respective fields.
      * Click `+ Add Item` to add more expense lines.
      * Click `X` next to an entry to remove it.
      * The `Total` amount at the bottom updates in real-time.
      * When you're finished, click the `Done` button. Your expenses for that date will be saved to your browser's LocalStorage, and you'll be redirected back to the dashboard.
3.  **Navigation**:
      * Use the `← Back` button on the `add_expense.html` page to return to the dashboard.

-----

## 📂 Project Structure

```
.
├── home.html               # Main dashboard with charts, calendar, and dynamic greeting.
├── add_expense.html        # Interface for adding and managing expenses for a specific date.
├── index.html              # Static login page (for display only, no server-side authentication).
├── register.html           # Static registration page (for display only, no server-side user creation).
├── script.js               # Core JavaScript logic for chart rendering, calendar events, and LocalStorage management.
├── 14485905_5475310.jpg    # Background image used on home and add_expense pages. 
└── 3075.jpg                # Background image used on login and register pages. 
```

-----

## ⚠️ Important Considerations

  * **Client-Side Only**: Expendria is a purely client-side application. This means:
      * **No Database**: Data is *not* stored on a remote server or in a traditional database.
      * **Local Storage**: All your expense records reside solely within your web browser's [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
      * **Data Persistence**: If you clear your browser's site data, cookies, or LocalStorage, your saved expenses will be permanently lost.
      * **No Syncing**: Data does not sync across different browsers, devices, or user profiles.
      * **Authentication**: The `index.html` (login) and `register.html` (registration) pages are **non-functional**. They are provided for visual completeness but do not process or store any user credentials as there is no backend.
  * **Browser Compatibility**: While designed to work on modern browsers, behavior might vary slightly across different browser versions due to JavaScript engine and CSS rendering differences.

-----

## 🤝 Contributing

This project is a simplified static demonstration. If you'd like to extend its functionality (e.g., add backend support, more advanced reports, user accounts), feel free to fork the repository and submit pull requests.

-----

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

-----

## 🙏 Acknowledgements

  * [Chart.js](https://www.chartjs.org/) for powerful and flexible charting.
  * [FullCalendar](https://fullcalendar.io/) for the interactive calendar component.
