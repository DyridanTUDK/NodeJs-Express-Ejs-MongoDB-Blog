# A blogging fullstack website made using:-

- EJS
- Express.JS & Node.JS
- MongoDB.

---

## List of Routes

- ### ("/") root route:

  This is the landing page of the website which is render using EJS, and using partials templates such as header footer and search. The post are fetch from MongoDB. Then posts are being dynamically rendered by ejs by passing the data through search by ID

Image of landing Page
![Image](https://pasteboard.co/dyVNIR6Tp8tT.png)

- ### ("/admin") admin route:

  This page uses bycrpt to salt your passwords, then compares the salt gives a JWT token to hold your login sessions.
  ![Image](https://gcdnb.pbrd.co/images/nlfzqjOEHXf5.png?o=1)

- ### ("/dashboard") dashboard allowed:
  This route allows you to add , edit and delete posts.
  ![Image](https://pasteboard.co/ZGomu4c9kJlU.png)
