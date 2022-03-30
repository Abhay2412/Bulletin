![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
# Bulletin

Deployed Web-App
Link: https://bulletin-be82d.web.app/

# How to Setup

## 1. Install Task

Go to https://taskfile.dev/#/installation

### Windows:

1. Download the task_windows_amd64.zip binary from https://github.com/go-task/task/releases.
2. Extracted the main `task_windows_amd64` folder to somewhere it'll be safe. I used `C:\`.
3. Add the path `C:\task_windows_amd64` to your system variables. See instructions on how to modify the path system varible at https://www.java.com/en/download/help/path.html.

### MacOS:

If you have homebrew, just use the following command.

```
brew install go-task/tap/go-task
```

If not, idk dm me we'll figure it out.

### Linux:

Idk lol google it I guess.

## 2. Install Node

This should be as simple as downloading and running the appropriate installer from https://nodejs.org/en/download/.

## 3. Install concurrently

Use this command from https://github.com/open-cli-tools/concurrently#install to install the module globally.

```
npm install -g concurrently
```

## 4. Install firebase-tools

Use the npm method from https://firebase.google.com/docs/cli to install it.

```
npm install -g firebase-tools
```

## 5. Login Into Firebase

Use the following command in the root project directory.

```
firebase login
```

## 6. Install All Required Node Modules

Use the following command in the root project directory.

```
task install
```

# How to Develop

Open your terminal in the root project directory, and simply enter the following command:

```
task dev
```

That is all.

The following is just an explanation of what you're seeing.

`task dev` starts multiple processes concurrently, in the same terminal, so logs from all processes will be printed sequentially in the same terminal.

You can see that logs are colored by source, and include a timestamp.

<img src="docs/assets/dev-terminal-processes.png">

`[... - functions]` is the typescript compiler for our Firebase Functions (terminal 1 in LEGACY). To check if it is working, look for the following output:

<img src="docs/assets/dev-terminal-1.png">

`[... - firebase]` is the Firebase emulator (terminal 2 in LEGACY). To check if it is working, look for the following output:

<img src="docs/assets/dev-terminal-2.png">

`[... - client]` is the React app (terminal 3 in LEGACY). To check if it is working, look for the following output:

<img src="docs/assets/dev-terminal-3.png">

> NOTE: This method is so much easier, and it works fine thus far. BUT it is kinda experimental, so please reach out if you have problems!

# How to Develop (LEGACY)

When to use this method:

- You are unable to read the output from `task dev`
- You think `task dev` is causing problems with development, and want to rule it out
- You want to look like a baller at Starbucks with 3 terminals open.

## 1. Open 3 Terminals

You can use 3 seperate terminals if you want, But I think the integrated terminal is easier.

Click on `☰` -> `View` -> `Terminal` to open your integrated terminal.

<img src="docs/assets/open-integrated-terminal.png" width="600">

Press the `◫` or `⊟` button to split your terminal.

<img src="docs/assets/split-terminal-1.png" width="400">

And again.

<img src="docs/assets/split-terminal-2.png" width="400">

Now you have 3 terminals side by side.

<img src="docs/assets/split-terminal-3.png">

Ensure all of them are in the root project directory, `/bulletin`.

## 2. Run Taskfile Commands

1. In the first terminal, we will run the TypeScript compiler in watch mode.

   This program will watch for any changes in the TypeScript source code, and will automatically recompile the necessary files to JavaScript.

   This recompilation will happen automatically whenever you save a functions `.ts` file, as long as you leave the command running in the terminal.

   All you have to do is run the following command in the first terminal.

   ```
    task build_functions_watch
   ```

   Wait for output:

   ```
   ...

   Found 0 errors. Watching for file changes.
   ```

2. In the second terminal, we will run the firebase emulator.

   This program emulates the functions, as well as other auth, hosting, or firestore features, but only locally, which is useful for testing.

   As long as you keep the compiler running in terminal 1, and the emulator running in terminal 2, the emulator will automatically read and serve the newly compiled files.

   Run the follwing command in the second terminal.

   ```
   task emulate_firebase
   ```

   Wait for output:

   ```
   ...

   Emulator Hub running at localhost:4400
   Other reserved ports: 4500

   Issues? Report them at https://github.com/firebase/firebase-tools/issues and attach the \*-debug.log file
   ```

   This may also pop up a java.exe program.

    <img src="docs/assets/functions-java-exe.png">

   Leave this running, until you shut down the emulator process in this terminal.

3. In the third terminal, we will locally serve the client-side React App.

   Once again, the compiler runs automatically behind the scenes and should update the browser page.

   All you have to do is run the follwing command in the third terminal.

   ```
   task emulate_client
   ```

   Once it is done, it should automatically open up the web app in the browser.

## 3. Voila!

You should now have 3 processes running in your terminals.

<img src="docs/assets/split-terminals-running.png">

You can view the React app at http://localhost:3000/.

You can view the Firebase Emulator UI at http://localhost:4000/.

If you browse through the output of terminal 2, you find other important ports, such as functions, which runs at http://localhost:5001/

Go ahead and change some source code in `client/src/App.tsx`.

Feel free to play around! As long as you don't deploy anything to firebase, or push changes to github, any changes you made can be undone by deleting and redownloading the project.

To exit out of development, you can `ctrl` + `c` out of all 3 terminals. Then also close the java.exe, if it is open.
