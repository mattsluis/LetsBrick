LetsBrick is an application one may want to use if they find themselves in need of cataloguing their Lego collection.

By utilizing Rebrickables API, the user can search for different Lego Sets. You can search by a general theme.(i.e. "Star Wars" or "Architecture"), or you can search for a specific model. Then, the User can select specific sets to add to their collection.

I used PostgreSQL for my database/models. A model is used to store login/logout/sign up functionality. Another model is used to store the Users "collection".
User model has a 1 to many relationship with the collection model. This allows each user to have their own personalized collection.

To display the collection I used a JQuery plug-in called Coverflow by Vanderlee. Here is the link to the associated GitHub: https://github.com/vanderlee/coverflow .

To view the application live, visit http://letsbrick.herokuapp.com/

To use yourself, fork and clone this repository, `npm install` dependencies.
You will need to obtain and provide your own API Key which can be obtained from www.rebrickable.com/

My original wireframes for this application are located in this repository under the directory, "project2wireframes" .
