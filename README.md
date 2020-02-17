A pre-canned web app with batteries included.
 
This is basically the setup I found useful for my side projects. It's a rather fat and opinionated set 
of technologies for a one size fit all singe page application. 

I think the offline visual testing with emulated firebase is quite clever - a lot of the other stuff - I'm not so sure about. 

![Continuous Integration](https://github.com/smorgrav/react-firebase-material-template/workflows/Continuous%20Integration/badge.svg)

# Features

* Material-UI Theme and CSS baseline applied 
* Automatic deployment to firebase with Github Actions
* Visual testing using puppeteer and differencify with firebase emulated
* React Router for location awareness
* React toastify for popup messages
* Drawers included
* Error boundary applied
* URL to tags component - who needs more UI than this?
* Authentication context backed by firebase
* Invite user and Link account flow
* Internationalization

![Image of LandingPage](doc/ReFiMaLandingPage.png)
   
## Head
   * https://realfavicongenerator.net/
     
## Testing
### Unit testing

### Visual testing
docker build -t refima .
docker run -ti --rm -p 3000:3000 --name refima --entrypoint /bin/sh -v ~/dev/react-firebase-material-template:/app -w /app refima 
yarn local && sleep 120 & yarn visual
      
## Messages
Communicating stuff to the user is arguably the most important thing for a web application.

# Feedback
Please! - that would be fun.  