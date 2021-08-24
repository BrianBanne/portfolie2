Website for any kind of products, but in this case we chose a clothing-store

Fully implemented with everything from docker, API, database and a reactive site. 
Missing payment features as that was not a requirement



# portfolie2
## group23,
Hans Erling Klevstad, s341872
Brian Banne, s329333

### problemos
validering av produkter ---- maybe done? not sure. see imorgen
push rabatt til server, slik at bruker ser at total er null og at rabatt er brukt

### mulig implementering om tid og viljestyrke
Prometheus - nettverks monitor ---- nesten i mål
flere bilder til hvert produkt når man er inne på produktsiden


## DOCS

## CLIENT/UI

### START UP

Get the project up and going by running the command `docker-compose up` in the root folder.
If the build is a success, the react client will run at `https://localhost:4000`, and the express-server at `https://localhost:8080`

### Server/API

Documentation for the API can be found at `https://localhost:8080/docs/#/`
We have utilized the `swagger-ui-express` and `swagger-autogen` module which generates the swagger doc based on the existing routes. 


### Notes

- Cart state is kept client-side to reduce API-request and create a better UX, a potential downside is that a product may be out of stock due to a another customer buying the last item. But in the scope of this assignment, this should not be an issue.

### Authentication

The client login utilizes OAuth2 for the login flow. This is a more secure solution since it do not require the user to provide us directly with the crendentials.
For the admin-login, for practical reasons there is a more convential login solution with the good ol' email/password combination. These credentials will be provided in the pdf file, and is served by the `node env`
Admin-email: 
Admin password: 

### Potential dangers

If the build process throws and error saying something like `Error starting userland proxy: listen tcp 0.0.0.0:27017: bind: address already in use`, you may have to run the `service mongodb stop` if mongodb is running in root for some reason.
