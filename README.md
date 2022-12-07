# subtitles.wtf

- bundle analyzer
- move relevant stuff from old readme
- build guide
- dev guide
- github actions build at push to master

## Keep it updated
1. Do the upgrades from inside the dev container to ensure system consistency

    ```
    ./compose.sh exec server bash
    ```

2. Get the minor updates and test the app

    ```
    npx npm-check-updates -u -t minor && npm install
    ```

3. Get the major updates and test the app

    ```
    npx npm-check-updates -u -t latest && npm install
    ```

4. Run `npm update` to update nested dependencies

5. Check in the end just in case something has slipped

    ```
    npm outdated
    ```