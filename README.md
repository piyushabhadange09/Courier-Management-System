The Courier Management System (CMS), built with SQL, Node.js, and Express.js, streamlines and automates courier services by providing efficient parcel tracking, user management, and organization registration. It offers a seamless backend for managing courier records, boosting operational efficiency and real-time parcel monitoring.

🔑Key Features🔑

1.User Management:

-Allows users to create accounts, log in, and update personal information.

-Offers security features such as password protection and account verification.

2.Parcel Tracking:

-Enables users to register parcels with unique IDs and track their status in real time.

-Records parcel details like Parcel ID, Quantity, Cost, Description, Warehouse ID, Delivery Staff, and Order Date.

3.Organization Management:

-Supports organization registrations for corporate clients, allowing them to manage bulk parcels.

-Provides login and profile management for organizational accounts.

4.Backend Architecture:

-SQL Database: Manages data storage, ensuring the integrity of user and parcel information.

-Node.js and Express.js: Serve as the application’s backend, handling HTTP requests, processing user inputs, and interacting with the SQL database to fetch and update data.

5.User Dashboard:

-Allows users to view parcel statuses, track past deliveries, and manage their profiles.

-Options include 'Update Details,' 'Change Password,' 'Delete Account,' and 'Logout.'

6.Parcel Submission Form:

-Users can submit parcel details through a form that captures essential information.

-Fields include User ID, Username, Organization Name, Parcel ID, Parcel Quantity, Parcel Cost, Parcel Description, Warehouse ID, Delivery Staff, and Order Date.

💻Technical Workflow💻

1.Node.js: Handles server-side operations, manages routing via Express, and communicates with the SQL database.

2.Express.js: Manages HTTP requests and routes, ensuring smooth handling of operations like parcel registration, updates, and status checks.

3.SQL Database with pgAdmin: Stores data securely, maintaining referential integrity with foreign keys (e.g., linking Username to the Users table) and facilitating data relationships.

4.EJS Template Engine: Renders dynamic HTML views, allowing users to interact seamlessly with the application’s front-end.
