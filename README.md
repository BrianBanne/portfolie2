# portfolie2

### problemos 
inkrementering og dekrementering i carten er bad business!
sjekke antall av hvert produkt for å fikse totalprisen!
feil når man legger til nytt produkt, men det legger seg til alikevel
edit produkter for admin
Docker compose
validering av produkter
push rabatt til server, slik at bruker ser at total er null og at rabatt er brukt


### mulig implementering om tid og viljestyrke 
Prometheus - nettverks monitor
SSL/TLS - API endpoints
flere bilder til hvert produkt når man er inne på produktsiden

## Hello brian
### Get started
1. Check that node is installed by running `node -v`
2. Check that also npm is installaed (should be by default when installing node) with `npm -v`
3. From the root run `npm install` to intall dependencies, and `npm run dev` to run front-/backend concurrently.
4. To only work on the server, `cd server` and `npm run dev`. The script fires a hot-reload-module that monitors changes
to the server file, and automatically updates, so you don't have to reboot the whole sjit. :-)
5. cd client `npm run start`


## Notes
- Cart state is kept client-side to reduce API-request and create a better UX, a potential downside is that a product may be out of stock due to a another customer buying the last item. But in the scope of this assignment, this should not be an issue.
 

 ## Authentication
The client login utilizes OAuth2 for the login flow. This is a more secure solution since it do not require the user to provide us directly with the crendentials.
For the admin-login, for practical reasons there is a more convential login solution with the good ol' email/password combination. These credentials will be provided in the pdf file, and is served by the `node env`


## DOCKER

### START UP
Get the project up and going by running the command `docker-compose up` in the root folder.


### Potential dangers
If the build process throws and error saying something like `Error starting userland proxy: listen tcp 0.0.0.0:27017: bind: address already in use`, you may have to run the `service mongodb stop` if mongodb is running in root for some reason.

### TOOD: 
- Get docker db-connection up and going, and server-frontend
