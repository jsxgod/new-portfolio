export const projectsData = [
  {
    name: "card game",
    thumbnail: "https://i.imgur.com/lgOXV7e.png",
    description: (
      <>
        <p>Two player trick card game called the German Whist.</p>
        <p>
          To learn about how to play the game read the How To section on the
          home page of the app.
        </p>
        <p>
          Client + Server application designed in Figma and brought to life with
          Next.js, TypeScript and Socket.io. This project served as a deep dive
          into the world of TypeScript which I am now very much fond of. To all
          the people that were saying once you try TypeScript there is no going
          back - you were absolutely right. The game engine runs on the back end
          and the state of the game is managed via Redux-Toolkit on the front
          end.
        </p>
        <p>
          Please play the game in landscape mode when on a mobile device or a
          device with a screen thats taller than wider.
        </p>
        <p>
          TODO if the app grows: store the games in an external database, allow
          reconnecting.
        </p>
      </>
    ),
    live: "https://germanwhist-ksdev.herokuapp.com/",
    repo: "https://github.com/jsxgod/card-game",
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Redux-Toolkit",
      "Socket.io",
      "Node.js",
      "express",
      "Sass",
      "css-modules",
      "framer-motion",
      "Figma",
    ],
  },
  {
    name: "portfolio",
    thumbnail: "https://i.imgur.com/R7ygkPv.png",
    description: (
      <>
        <p>My personal web page.</p>
        <p>You are here.</p>
        <p>
          Web page designed in Figma and brought to life with React. The goal
          for the page was to be aesthetically pleasing and interesting to
          explore - marrying the worlds of UI and UX. Good typography and
          design, 3D integration, custom cursor, smooth animations and a drawing
          canvas attached to the contact form all help with keeping the visitor
          interested.
        </p>
        <p>
          I hope you enjoyed your stay
          <span className={"signature"}> ~ Kacper Smyczyk</span>
        </p>
      </>
    ),
    repo: "https://github.com/jsxgod/new-portfolio",
    stack: [
      "React",
      "Sass",
      "framer-motion",
      "Node.js",
      "express",
      "Nodemailer",
      "three.js",
      "glsl",
      "react-three-fiber",
      "Blender",
      "Figma",
    ],
  },
  {
    name: "skate shop",
    thumbnail: "https://i.imgur.com/UN547fv.png",
    description: (
      <>
        <p>
          Built upon a singular idea - fun deck exploring while making a
          purchase.
        </p>
        <p>
          A proof of concept mobile only web page brought to life with React.
        </p>
        <p>
          The goal for the page was to have an unique skateboard deck viewing
          user interface. Clients can drag to enlarge the decks to break the
          established visual boundaries of the page. Redux-toolkit was used to
          manage the cart state.
        </p>
        <p>
          Visit the live site on your mobile device or use the dev tools to
          target a mobile view in a browser of your choice.
          <p>http://skateshop-ksdev.vercel.app/</p>
        </p>
      </>
    ),
    live: "http://skateshop-ksdev.vercel.app/",
    repo: "https://github.com/jsxgod/skate-shop",
    stack: [
      "React",
      "Node.js",
      "MongoDB",
      "Redux-toolkit",
      "Sass",
      "framer-motion",
      "Photoshop",
      "Figma",
    ],
  },
  {
    name: "startpage",
    thumbnail: "https://i.imgur.com/SKMgLz6.png",
    description: (
      <>
        <p>Startpage created for the Reddit community of r/startpages</p>
        <p>Web page brought to life with React.</p>
        <p>
          The goal of the page was to serve as a day to day start page / new tab
          page of your browser. Consists of three features: bookmarks organizer,
          todo list and a searchbar. The user can customize the saved links,
          group tasks by categories and switch between search engines. The
          searchbar also has toggleable add ons: reddit, stackoverflow or pdf
          search narrowing as well as fast forward searches that can be set in
          the options (e.g typing yt can take you to youtube.com).
        </p>
      </>
    ),
    live: "https://startpage-ksdev.netlify.app",
    repo: "https://github.com/jsxgod/startpage",
    stack: ["React", "local storage", "Sass", "framer-motion"],
  },
  {
    name: "webchat",
    thumbnail: "https://i.imgur.com/3ykK65x.png",
    description: (
      <>
        <p>Client to client webchat application</p>
        <p>Web page brought to life with React and Socket.io</p>
        <p>
          Simple web chat application that can host rooms and let user's join
          them. Multiple users can join the room and chat together.
        </p>
        <p>
          I had the urge to build something usable and "real". This project has
          been my introduction to the socket based web applications. Let's be
          honest, front-end only projects can feel like they get you nowhere
          fast if one can't design properly yet. Thus was born this simple
          client-server, socket based web chat.
        </p>
      </>
    ),
    live: "https://webchat-ksdev.netlify.app",
    repo: "https://github.com/jsxgod/web-chat",
    stack: ["React", "css", "Socket.io", "Node.js", "express"],
  },
  {
    name: "model agency",
    thumbnail: "https://i.imgur.com/fqeWC8b.png",
    description: (
      <>
        <p>A landing/company page for a mock model agency.</p>
        <p>Web page brought to life with React</p>
        <p>
          After messing around with the capabilities of framer-motion for a bit
          I was finally able to harness it's power and build a real web page
          upon an interesting animation idea.
        </p>
        <p>
          An exercise in page transitions, layout animations and proper design.
        </p>
      </>
    ),
    live: "https://modelagency-ksdev.netlify.app",
    repo: "https://github.com/jsxgod/model-agency",
    stack: ["React", "Sass", "framer-motion"],
  },
];
