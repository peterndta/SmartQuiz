# <img src="./docs/images/Logo-app.jpg" width="40" height="40" style="border-radius: 50%;border: 1px solid black;"/>&nbsp; SmartQuiz

[![SmartQuiz](https://img.shields.io/badge/Follow-smartquiz-blue?style=flat&logo=facebook&logoColor=white)](https://www.facebook.com/profile.php?id=100090442244649) [![SmartQuiz](https://img.shields.io/badge/Follow-smartquiz-blue?style=flat&logo=Twitter)](https://twitter.com/SmartQu1z)

SmartQuiz is a web application that allows learners to improve their knowledge and memory through a multiple-choice learning system. With convenient features to create custom question sets and share them with others, learners can connect with peers and learn together. The application also integrates effective learning methods to help students learn more efficiently.

<div align="center" >
  <a href="">
    <img width="550" height="380" src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/332484306_622915269653585_6644730734884882646_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=49d041&_nc_ohc=mRjhVuXYYzIAX9xtzCt&_nc_ht=scontent.fsgn5-3.fna&oh=00_AfBh0MN2VibRhP6aD3qM7vsGJryewohP0439J0zfzpSJ2g&oe=6520453F" style="border-radius: 2%"/>
  </a>
</div>

## ✨ Features

- Create and share your own question sets with other learners
- Connect with other learners and join study groups
- Gamification features to make learning fun and engaging
- Effective learning methods to help learners memorize and increase reflexes when facing questions
- Customizable settings for learners to adjust to their learning style
- Clean and modern user interface for ease of use

## ⚙️ Technology

- Frontend
  - React - A JavaScript library for building user interfaces
  - Redux-toolkit - State Management
  - Mui - Material UI design
- Backend
  - Firebase - Storage.
  - Microsoft SQL Server - Database Engine/Server.
  - ORM - Entity Framework with DB First Approach

## 🚀 Getting Started

To run SmartQuiz locally, you will need to have the following tools installed:

- Node.js
- .NET 6 SDK
- Visual Studio Code (or any other code editor)
- Microsoft SQL Server 2019 (or any other DBMS)

After cloning the repository, setup Database and connection to run locally:

- Import Data-tier Application `MSSQL2019_SmartQuiz.bacpac` **or** run `SmartQuiz.sql` script, both provided in DBSQL folder, noted that all data is mock.
- Config Server, Database, uid, pwd at:
  - `./SmartQuizApi/SmartQuizApi/appsettings.json`
  - `./SmartQuizApi/SmartQuizApi/Data/Models/DbA95102SmartquizContext.cs`
- Change Redirect to `http://localhost:3000` to be able to login locally:
  - Line 60: `./SmartQuizApi/SmartQuizApi/Controllers/AuthenticationController.cs`

When finish Database setup, navigate to the project's root directory and run the following commands:

1. Install the required dependencies by running `yarn` in front-end folder.
2. Start the frontend in front-end folder by running `yarn start`.
3. Start the backend in SmartQuizApi folder by running `dotnet run`.
4. Access the application by navigating to `http://localhost:3000` to see the application running.

## 📦 Deployment

SmartQuiz is deployed using Google Cloud and Railway for the backend, and Vercel for the frontend. The deployment process is automated and scalable, ensuring that the application is always available and performant. Access Vercel Frontend: `https://smart-quiz.vercel.app/`

<div style="display: flex; align-items: center; justify-content: space-around;">
<img src="./docs/images/google-cloud.png" width="200" height="100" />&nbsp;<img src="./docs/images/railway.png" width="200" height="100" />&nbsp; <img src="./docs/images/vercel.png" width="200" height="100" />&nbsp; 
</div>

## 👀 Preview

### Admin Dashboard

<img width="320" src="./docs/images/Admin_Page.png" alt="admin dashboard">

### Login

<img width="320" src="./docs/images/login.png" alt="home">

### Home

<img width="320" src="./docs/images/Home.png" alt="home">

### Class

<img height="150" src="./docs/images/My_class.png" alt="my class"> <img height="150" src="./docs/images/Class_details.png" alt="class details">
<img height="150" src="./docs/images/Class_members.png" alt="class member"> <img height="150" src="./docs/images/Create_class.png" alt="create class">
<img height="150" src="./docs/images/Update_class.png" alt="update class">

### StudySet

<img height="150" width="200"  src="./docs/images/My_studyset.png" alt="my studyset"> <img height="150" width="200" src="./docs/images/Studyset_details.png" alt="class details"> <img height="150" width="200" src="./docs/images/Update.png" alt="update class">
<img height="150" src="./docs/images/Create.png" alt="create class"> <img height="150" src="./docs/images/Create_popup.png" alt="create popup">
<img height="150" width="300" src="./docs/images/Search.png" alt="search studyset"> <img height="150" src="./docs/images/Draft.png" alt="search studyset">

### Upgrade Account

<img height="150" src="./docs/images/Upgrade_account.png" alt="create class"> <img height="150" src="./docs/images/Payment.png" alt="create popup">

### Testing feature

<img height="150" src="./docs/images/Test.png" alt="create class"> <img height="150" src="./docs/images/Test_result_1.png" alt="create popup"> <img height="150" src="./docs/images/Test_result_2.png" alt="create popup">

### Learning feature

#### Standard

![standard-learn](./docs/images/ezgif-4-af94ac42c3.gif)

#### Premium

![premium-learn](./docs/images/premium-learn.gif)

---

## Contributing

If you are interested in contributing to SmartQuiz, please feel free to submit a pull request or create an issue. We welcome all contributions and are happy to work with you to improve the application.

## License

SmartQuiz is licensed under the [MIT license](LICENSE.md). You are free to use, modify, and distribute the application as you see fit. Please see the `LICENSE.md` file for more information.
