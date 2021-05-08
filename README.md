# portfolie2

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
 