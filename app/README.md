# Arlemi React Skeleton

**How to Run It**

1. **Installing Dependencies:** Execute `npm install` to install the necessary dependencies.

2. **Configure End-of-Line in Local Git:** Set the end-of-line configuration in your local git to avoid issues by running `git config --global core.autocrlf false`.

3. **Prepare Pre-commit Hooks (Husky):** Initialize Husky for managing pre-commit hooks by executing `npm run prepare`.

4. **Start the Developer Server:** Launch the development server by running `npm run dev`.

5. **Optional: Using Chrome DevTools in VS Code:**
   - Press `F5` to start debugging.
   - Choose ```Launch Chrome```
   - Change the port in the newly created `.vscode/launch.json` file to `3000`. It should look like this: `"url": "http://localhost:3000"`.
   - You can now use Chrome DevTools inside VS Code.
