// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-celery-63-ram-reduction-and-100x-concurrency-with-gevent",
        
          title: "Celery: 63% RAM reduction and 100x concurrency with gevent",
        
        description: "From a single worker to 100x concurrency while reducing RAM from 378 MB to 139 MB.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/celery-gevent/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "my_posts-celery-63-ram-reduction-and-100x-concurrency-with-gevent",
          title: 'Celery: 63% RAM reduction and 100x concurrency with gevent',
          description: "From a single worker to 100x concurrency while reducing RAM from 378 MB to 139 MB.",
          section: "My_posts",handler: () => {
              window.location.href = "/blog/2025/celery-gevent/";
            },},{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/odie5533", "_blank");
        },
      },{
        id: 'social-devto_username',
        title: 'Devto_username',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/davidbern", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
