Default Route (/):

Method: GET
Description: Renders the default home page.
Get All Blog Users Route (/blog/data):

Method: GET
Description: Retrieves all blog users from the database and returns them as JSON. Handles errors and sends a 500 status with an error message if any issues occur.
Get Blog User by Username Route (/blog/data/:username):

Method: GET
Description: Retrieves a specific blog user by their username from the database and returns it as JSON. Handles errors and sends a 404 status if the user with the given username is not found, and a 500 status with an error message for other issues.
Create Blog Post Route (/blog/post):

Method: POST
Description: Creates a new blog post in the database based on the provided request body parameters (username, title, content) and the uploaded image file. Returns the created blog post as JSON. Handles errors and sends a 500 status with an error message if any issues occur.
Update Blog User Route (/blog/data/:username):

Method: PUT
Description: Updates an existing blog user in the database based on the provided username and request body parameters (username, title, content, image). Returns the updated blog user as JSON. Handles errors and sends a 404 status if the blog user with the given username is not found, and a 500 status with an error message for other issues.
Delete Blog User Route (/blog/data/:username):

Method: DELETE
Description: Deletes a blog user from the database based on the provided username. Returns the username of the deleted blog user. Handles errors and sends a 404 status if the blog user with the given username is not found, and a 500 status with an error message for other issues.
