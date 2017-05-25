# lunchApp

    For running tests, please run `npm test`

    For run the app simply run `node index.js` on the root folder of the project OR `npm start`

1 - What are the highlights of your logic/code writing style?
    In this app, I think that the most relevant feature is the demonstration of the websocket use,
    in this way, whenever someone vote on a restaurant all the other clients get notified and
    upate their voting counter. Making it realtime to know who is winning !

2 - What could have been done in a better way?
    There's a lot of choices I've made in this project that should not be used in a professional app,
    but, as I take in consideration that the main point of the application is to demostrate the logic
    behind it I have done it in a more simpler way. Below I talk about all the stuff that must be 
    improved when coding in a professional envioriment.
    
    A - Scafolding : I've minimized the structure of files and folders on this project, this would be
    fine since it's only a demo project and it has only about 140 lines of code, but in a real life
    scenario I would recommend use a tool for generate the structure of the project. Yeoman does a good
    job on that !

    B - Routes directly on the index.js it's not good to put the routes logic on the same file that you
    set-up the server, instead you should create a module containing the logic and export it, this way
    the code becomes a lot more organized. Again, as this is a very simple project I decided to add it 
    along the configuration of the server just for a sake of simplicity.

    C - Angular controllers should have their own folders and also their own module, in here since we have
    only one controller for the application I rather preffer to keep it simple...

    D - Angular Factories also should follow the same as item C.

    E - Bower components, should not be avaliable in the public folder, the ideal is that we only 
    deliver what we're using, the motivations for me to do it this way is again for simplicity.

    F - Static variables should be in a file containing them, it will make your code very easy to read and
    a lot more mantainable, in here we are using the constants on the files it self but it's not a good 
    practice.

    G - UI testing, it's nescessary to test the UI components, factories and automate the e2e validation 
    the point is that in such simple project this coud take more time than the development it self once 
    those tests needs to be very carefully implemented. Here I've moved all the logic to the backend and
    test the business logic there, for the front end however I decided to not automate it and only do manual
    testing, I don't recommend this to be done, but again, in such small project (and with this amount of time)
    I fell that the relation of cost and benefict of doing this whould not whorth it so with this in mind the manual testing I believe to be the best choice for the UI in here.

    H - UI, this is the most relevant part of the system because in the end of the day this is what the client
    sees, however once that the desing of the application will not be considered also the UX should not, and
    hence the UI in this project is not the strongest point at all. 

3 - Any other notes you judge relevant for the evaluation of your project.
    I belive that the itens on 2 should justify my choices, if you have any doubts on the system fell free 
    to get in contact with me.