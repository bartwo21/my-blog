# Blog Application

This is a blog application built using Next.js, Tailwind CSS, Prisma, and Postgres. The application leverages Server Components, Server Actions, and Suspense features. Authentication, login, and registration are managed through Kinde.

## Features

- **CRUD Operations**: Create, read, update, and delete blogs.
- **Featured Blogs**: Highlight and showcase featured blog posts.
- **Blog Photo Upload**: Upload images to accompany your blog posts.
- **Edit & Delete**: Modify or remove your own blog posts.
- **One-to-Many Relations**: Manage complex data relationships with Prisma.
- **Undo Deletion**: Undo a blog post deletion within 5 seconds.
- **Commenting**: Add comments to blog posts.
- **Authentication**: User authentication, login, and registration via Kinde.

## Technologies Used

- **Next.js**: 
  - Implemented Server Components and Server Actions for efficient data handling.
  - Used Suspense for better UI/UX with asynchronous operations.
  
- **Tailwind CSS**: 
  - Styled the application with a utility-first approach for responsive design.

- **Prisma**: 
  - Managed database operations and enforced one-to-many relations.

- **Postgres**: 
  - Utilized as the relational database to store blog posts, comments, and user data.

- **Kinde**: 
  - Handled authentication, login, and registration processes.

## Live Demo

Check out the live application here: [My Blog](https://my-blog-wine-three.vercel.app)
