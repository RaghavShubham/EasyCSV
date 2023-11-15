## Easy CSV
#### Demo
[EasyCSV](https://easy-csv-raghavshubham.vercel.app/)

### What is a .csv file

.csv file format is a simple text-based format for storing and exchanging data in plain text, which makes it easy to read and write

### What are we trying to build

Easy CSV is a tool that is built to enable the users to easily upload a csv and map it to a specified database structure.

- Once the user uploads the csv the contents of the csv is displayed in tabular format for the user to verify the contents of the csv.

- Below the table we display the columns of the database with a list of csv fields to map to each column.

_Note:_ We can select multiple fields to be added to one column and they will be concatenated and added to the db

- Once the user has selected all the fields they can press the Submit button and the CSV data will be mapped to the database in accordance to the selections made.

It also enables the user to download the mapped and the uploaded data in a csv format.

### Instructions to Run

1.  Clone the repository
2.  Open terminal in the root directory
3.  Run `npm install` to install all the necessary dependencies.
4.  Run `npm start` to run the application
5.  Visit `localhost:3000` in the browser.

### Screenshots
![image](https://github.com/RaghavShubham/EasyCSV/assets/43434615/a1c3df22-7483-4c61-a608-853fd81ffc39)

### Scope for ChatGPT integration

1.  To provide guidance and interaction to user.
2.  For handling Errors and user queries to ease the CSV upload process.
3.  Suggesting mapping options, like all csv fields with name can be listed under the name column to start with and an **auto mapping** feature for future.
