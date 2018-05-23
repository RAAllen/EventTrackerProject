# Event Tracker Project

## A flexible web application designed to be integrated with a front end in the near future.

#### By _**Rebecca Allen**_

## Live Web Interaction

* If you want to interact with the finished program, please visit: [Event Tracker](http://18.220.178.242:8080/RESTEventTracker/).
* See the program specifications below for routes to use.

## Program Specifications

* Some of the following routes require [Postman](https://www.getpostman.com/apps) to test as there is no current front end of this project.

### Activity Routing

* The user will be presented with full list of the database activities at: [http://18.220.178.242:8080/EventTrackerProject/api/activites](http://18.220.178.242:8080/EventTrackerProject/api/activites).

* The user will be able to view an activity (accessed by the id of the activity) at: [http://18.220.178.242:8080/EventTrackerProject/api/activites/](http://18.220.178.242:8080/EventTrackerProject/api/activites/){INSERT AN ID HERE}.

* The user will be able to create a new activity at the following Postman route: "localhost:8080/api/activities/" using the method "POST".

* The user will be able to replace an activity (accessed by the id of the activity) using Postman and the following route: "localhost:8080/api/activities/{INSERT AN ID HERE}" using method "PUT".

* The user will be able to edit an activity (accessed by the id of the activity) using Postman and the following route: "localhost:8080/api/activities/{INSERT AN ID HERE}" using method "PATCH".

* The user will be able to delete an activity (accessed by the id of the activity) using Postman and the following route: "localhost:8080/api/activities/{INSERT AN ID HERE}" using method "DELETE".

### Category Routing

* The user will be presented with full list of the database categories at: [http://18.220.178.242:8080/EventTrackerProject/api/categories](http://18.220.178.242:8080/EventTrackerProject/api/categories).

* The user will be able to view an category by the id of the category at: [http://18.220.178.242:8080/EventTrackerProject/api/categories/](http://18.220.178.242:8080/EventTrackerProject/api/categories/){INSERT AN ID HERE}.

* The user will be able to create a new category at the following Postman route: "localhost:8080/api/categories/" using the method "POST".

* The user will be able to replace an category (accessed by the id of the category) using Postman and the following route: "localhost:8080/api/activities/{INSERT AN ID HERE}" using method "PUT".

* The user will be able to edit an category (accessed by the id of the category) using Postman and the following route: "localhost:8080/api/activities/{INSERT AN ID HERE}" using method "PATCH".

* The user will be able to delete an category (accessed by the id of the category) using Postman and the following route: "localhost:8080/api/categories/{INSERT AN ID HERE}" using method "DELETE".

* The user will be able to get all the categories corresponding to a category (accessed by the id of the category) using Postman and the following route: "localhost:8080/api/categories/{INSERT AN ID HERE}/activities" using the method "GET".

## Setup/Installation requirements

* In order to edit this project and work with it on your own machine you will need a terminal application such as Terminal or Bash. Since this project has a Gradle nature, you will need to have the Spring Tool Suite installed. You will also need a database server program such as MAMP or LAMP.
* Start by opening the terminal application and typing the command
```
git clone https://github.com/RAAllen/EventTrackerProject.git
```
after navigating with the `cd` command to the location you would like the project to be cloned into.
* Use the terminal application to navigate to the project directory you just cloned down off of GitHub using the "cd" command.
* If at any point during this next part of the set up process you get a popup system window to enter a password, it is asking for your computer user account password. Start by opening up your MAMP or LAMP. From the preferences menu of the application, select "Ports" and "Set Web and MySQL ports to 80 & 3306". Select to "Start Servers" from the main window of your application. Return to your terminal, you will need to set up the included games.sql database in order to correctly interact with this program. You will be typing a series of commands in the terminal.
```
mysql -u root -p < eventdb.sql
mysql -u root -p
```
You will then be prompted to enter a password in the terminal, type `root`.
```
mysql> CREATE USER eventuser@localhost IDENTIFIED BY 'eventuser';
mysql> exit;
mysql -u eventuser -p
```
You will then be prompted to enter a password in the terminal, type `eventuser`. You can now use mysql syntax to interact with the database.
* From this point on you should be able to edit the program and see changes when altering it in the Spring Tool Suite.

## Support and Contact Details

_Please contact [Rebecca Allen](RebeccaZarsky@gmail.com) for technical questions or assistance running the program._


## Technologies Used

_This program was made RESTfully, utilizing Java, SQL, MySql, Gradle, Maven, Spring Tool Suite, Apache, MAMP, Atom and the Eclipse Integrated Development Environment._


## License

_This program is licensed under the MIT license._

Copyright (c) 2018 **_Rebecca Allen_**
