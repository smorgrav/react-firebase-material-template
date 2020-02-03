A pre-canned web app with battery included.
 
This is basically the setup I found useful for my side projects.

![Continuous Integration](https://github.com/smorgrav/react-firebase-material-template/workflows/Continuous%20Integration/badge.svg)

## Features

* Material-UI Theme and CSS baseline applied 
* Automatic deployment to firebase with Github Actions
* Visual testing using puppeteer and differencify
* React Router for location awareness
* React toastify for popup messages
* Drawers included  
* Error boundary applied
* URL to tags component
* Authentication context backed by firebase
* Authentication flows
   * Sign up
   * Sign up
   * Invite by email
   
## Testing
### Unit testing

### Heisenberg testing

docker run -ti --rm -p 3000:3000 --name console --entrypoint /bin/sh -v ~/dev/react-firebase-material-template:/app -w /app ianwalter/puppeteer:2.0.0 
      
## Messages
Communicating stuff to the user is arguably the most important thing for a web application.  