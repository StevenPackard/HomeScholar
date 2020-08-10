# HomeScholar

https://homescholar.herokuapp.com

## About

The Covid-19 pandemic has put the parents and their children in a precarious position. This is especially true when it comes to education. Parents are nervous about exposing their children to possible infection. At the same time, they are concerned about hindering their children's learning. This is problematic with local schools failing to meet the virtual needs of their students. Parents are facing the struggle of keeping their children safe while continuing their education.

This is why we created HomeScholar.

HomeScholar is an assignment manager and scheduler serving the existing homeschooling community and those parents just now taking the plunge. HomeScholar removes the hassle of having to use several different applications to coordinate a child’s education. HomeScholar offers parents the ability to schedule time to work on an assignment, to grade assignments and track student performance in one application. We also recognize the need to provide socialization for children which is a major concern for homeschooling parents. This is why HomeScholar offers parents the opportunity to schedule events that other parents and children can attend. To ensure safety, HomeScholar requires that each event clearly indicate if the event is remote or in person. Parents can also simply make posts and chat with others in the community in real time.

HomeScholar provides a solution to meet the education, socialization, and safety needs of homeschooling parents and their children.

## How it Works

HomeScholar is an assignment manager and scheduler as well as a homeschooling event organizing and social media web application.

There are two main functions of the site. The first function is the assignment management and scheduling functionality. Users can create profiles for their students and add assignments to each student’s profile. Assignments can be scheduled using the calendar tool inside the calendar page. Details for each student can be accessed by clicking on the student’s name.

The second main function is the social media and event organizing functionality. Users can create posts that are added to the main social page on HomeScholar. These can simply be an opportunity to engage the community in a conversation in which other users can comment in real time on the post. Or the post can be an event announcement in which other users can add to their personal calendar page.

### Tech Stack Used

HomeScholar was built using the following technologies:

Frameworks:
Vue.js
Vuex.js
Vue-Router.js
Express.js
Notable Libraries:
Fullcalendar.io
Socket.io
SweetAlerts.js
Vue-Html-to-Paper.js
Moment.js
Axios
Bootstrap
Database:
MongoDB

## How to use it

HomeScholar is a web application requiring only an internet browser to operate the application (Google Chrome is recommended).

Upon rendering the landing page, users are greeted and introduced to the primary mission of HomeScholar which is to “Optimize the education of your children at home.”

New users are encouraged to take a tour upon first entering the web application. The tour gives a demonstration of the website. The new user is given the opportunity to interact with the main functionality of the site without having to create any initial content.

Users can then create an account either by clicking on the “Sign up” or “Login” buttons. Authorization and authentication requirements are handled by Auth0.

### Calendar Page

After a user has created an account, they are given access to their personal calendar page and the social page for the site. In the calendar page, users have the option to create student profiles, add new assignments or schedule existing assignments. Student profile creation is available on the navbar by clicking on the arrow. A popup appears giving the user the option to “Add Student”. Clicking on the “Add Student” option triggers a modal to appear. The modal requests some information about the student including name, curriculum for that student, grade level and a background color of the student’s profile. Clicking add student creates the profile and then appears on the calendar page. When a user has more than one student, an option is given to filter to an individual student.

To add an assignment to a student, the user has two options. First, the user can click on the “Add Assignment/Event” button above the student profile. This button triggers a modal that requests information about the assignment including who the assignment will be assigned to, the title of the assignment, the description and the subject. Clicking the “Add Assignment” button creates the assignment which appears on the student profile. The second option is to select a certain timeframe within the calendar tool. Once the time frame is selected, the same modal is triggered with the chosen timeframe appearing at the bottom. Assignments created from the calendar do not appear in the student profile. Only assignments that need to be scheduled will appear in the student profile.

There are multiple methods for editing and deleting assignments. First, an assignment can be removed from the calendar by dragging the assignment off of the calendar. An alert to confirm removal from the calendar will appear. The now unscheduled assignment will appear in the profile. To add an unscheduled assignment, the user can drag the assignment into the calendar. To move the assignment event, the user can click on it and move it to the desired time. The default time length for an unscheduled event is two hours. To adjust the time length, the user can move the mouse cursor to the edge and change the height of the event.

To edit the details of the assignment, the user can click on the assignment event in the calendar or the assignment element in the student profile. The click will trigger an assignment details modal where the user can edit the assignment or delete it.

On the calendar page, users also have the option to create events that are not specific to any student. Similar to assignment creation, an event can be created by either selecting within the calendar tool or by clicking on the “Add Assignment/Event” button. Both actions will trigger the same modal used to create assignments. To create an event, click on the toggle at the top of the modal and fill out the required information.

### Profile Page

Once the user has graded the assignment, the user can view all graded assignments by going to the user’s profile page by clicking the circle profile button in the top left corner of the site.

The user will then be directed to the profile page where the user can see all the profiles they created. From here the user can edit or archive student profiles by clicking on the edit link. This will bring up a modal allowing the user to edit the modal.

The user can also view the transcript for each student profile by clicking on the view transcript link. The transcript gives a record of the students overall score for each subject as well as the amount of time spent on each subject. The user has the option to print a formatted copy of the transcript by clicking on the “Print” button. To maximize customizability, the user has the option to change the name of the school, the name of the student and the dates the transcript scores reflect. The customization will appear in the printed out copy of the transcripts.

### Social Page

The other main functionalities of homescholar are social media and event organizing. On the social page, the user can take advantage of both functionalities.

To create a new post, the user clicks on the “New Post” button. This will bring up the new post modal. The modal will request a title and body for the post. To create a post that is not linked to an event, the user can then click “Post”. The post will appear in the main social page of HomeScholar. Other users can see the post and add comments. To view the comments, the user can click on the “View Comments” button. This will bring up a detail page for the post along with all the comments made on the post by users. The comments are updated in real time so the user does not need to refresh the page to see new comments.

Creating a public event is similar to creating a new post. The user clicks on the “New Post” button and the same modal appears. To create an event, the user clicks on the Event checkbox. Below that will appear fields for a start and end time for the event as well as options to indicate the event type.

Like the public post, other users can comment on the public event. They can also add the event to their personal calendars by clicking on the add to calendar button.
