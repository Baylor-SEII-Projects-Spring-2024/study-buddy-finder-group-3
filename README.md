# Study Buddy Spring 2024

This is the template project for the Baylor Software Engineering II class project for Spring 2024. There are several parts to this template project:
 - `/study-buddy-api` - API/Backend - The server component of the project, using Java Spring as a framework.
 - `/study-buddy-frontend` - Web/Frontend - The web component of the project, using React and Material UI as a framework.
 - `/docs` - Project documentation, including the project SOW and timeline/schedule.
 - `/cicd` and `/docker` - Sample resources to aid you in getting your GCP deployment working.

This `README.md` file will serve as a general setup guide for the project. In addition, some folders also have `README.md` files to further go into detail about their contents and provide some project guidance.

## Table of Contents

- [Study Buddy Spring 2024](#study-buddy-spring-2024)
  - [Table of Contents](#table-of-contents)
  - [MySQL Database Setup Instructions](#mysql-database-setup-instructions)
  - [Backend (`/study-buddy-api`) Setup Instructions](#backend-study-buddy-api-setup-instructions)
  - [Frontend (`/study-buddy-frontend`) Setup Instructions](#frontend-study-buddy-frontend-setup-instructions)
  - [CI/CD (GitHub \& GCP) Setup Instructions](#cicd-github--gcp-setup-instructions)

## MySQL Database Setup Instructions

[(back to top)](#table-of-contents)

1. Install Docker, following the instructions in the provided link for your operating system:
   - **Windows**: https://docs.docker.com/desktop/windows/install/
     - You may need to enable WSL on your computer: https://learn.microsoft.com/en-us/windows/wsl/install
   - **macOS**: https://docs.docker.com/desktop/install/mac-install/
     - Make sure to choose **Mac with Intel chip** or **Mac with Apple chip** depending on your specific machine
2. Start the database using Docker Compose in the command-line: `docker compose -f docker/local.docker-compose.yml up -d`
   - To stop the database, use: `docker compose -f docker/local.docker-compose.yml down`
   - To clear the data from the database, use: `docker compose -f docker/local.docker-compose.yml down -v`

## Backend (`/study-buddy-api`) Setup Instructions

[(back to top)](#table-of-contents)

1. Install **Intellij IDEA Ultimate Edition**: https://www.jetbrains.com/idea/download
   -  You will need to create a JetBrains account using your student/Baylor email address to get a free license for the Ultimate edition. We **will** be using features of the Ultimate edition during this project, so make sure to get it even if you already have the community edition installed.
2. Install **Java 17** (OpenJDK): https://www.oracle.com/java/technologies/downloads/#jdk17-windows
   - Java 21 (the latest version) will likely be fine too, but since the template project is configured to use Java 17, we recommend sticking with that for now
3. Setup the project in IntelliJ IDEA:
   1. Open the project at the `/study-buddy-api` directory in IntelliJ. In older versions of IntelliJ, you may need to click "Import from existing sources" instead and choose the `/study-buddy-api` directory.
   2. IntelliJ should autodetect the Gradle project and start downloading dependencies. Confirm that this is happenening by looking for a progress bar in the bottom right of the window.
   3. Configure Lombok:
      1. Intall the Lombok plugin for IntelliJ (Intellij IDEA > Settings > Plugins ... Search for "Lombok" by JetBrains)
      2. Enable Annotation Processing in the compiler settings (Intellij IDEA > Settings > Build, Execution, Deployment > Compiler > Annotation Processors ... Check "enable annotation processing")
4. Connect to your local database in IntellIJ:
   1. Open the "Database" tab (if you don't see it, go to View > Tool Windows > Database)
   2. Click the "+" button and add a Data Source > MySQL
   3. Enter "root" for the username
   4. Enter "password" for the password
   5. If there is a warning at the bottom of the dialog to "Download missing driver files", click the "Download" button to do so.
   6. Click "Test Connection" to verify the connection succeeded. If it did, click "OK" to close the dialog.
5. Start the backend. The easiest way to do this is to open `StudyBuddyApplication.java` and click the "play" button on the left.
6. Verify the backend is running by navigating to `http://localhost:8080/ping` in your web browser. If you see `pong!`, then everything is working!

## Frontend (`/study-buddy-frontend`) Setup Instructions

[(back to top)](#table-of-contents)

1. Install **Visual Studio Code**: https://code.visualstudio.com/download
2. Install **Node.js** version 20: https://nodejs.org/en
   - Just like the backend, installing a version higher than 20 (like 21) will likely still work, but since the template project is configured using Node 20, it is recommeneded sticking with that
   - If you anticipate yourself needing to swap between different Node version often or wanting an easy way to update Node versions, you could instead use [`nvm`](https://github.com/nvm-sh/nvm) or [`nvm-windows`](https://github.com/coreybutler/nvm-windows) to install Node
3. Install **Yarn**: run `corepack enable`
   - If this command doesn't work, you could try `npm install -g yarn` instead
   - Verify Yarn is installed with `yarn -v`
4. Install project dependencies: `yarn install`
5. Start the frontend: `yarn dev`
   - `yarn dev` starts the project in development mode
   - `yarn build` builds a production version of the project that can be run with `yarn start`
6. Verify the frontend is running by navigating to `http://localhost:3000` in your web browser. If you see the home page, then everything is working!

## CI/CD (GitHub & GCP) Setup Instructions

[(back to top)](#table-of-contents)

Only one deployed instance of your project is required. However, we require that all team members are familiar with the process of how to deploy the project to GCP, so please work together in your groups so that everyone is familiar with this workflow.

GCP offers a free trial that will work for our purposes in this project. Keep in mind, however, that the free trial is not unlimited—it is up to your team to ensure that you are staying within the free trial budget. However, the budget should be more than sufficient for the purposes of this project.

1. Open the Google Cloud Console: https://console.cloud.google.com/ and create a Google account if you don't already have one
2. Enable the GCP free trial by hitting the "try for free" button on the home page and following the instructions.
   1. Choose "individual" as the account type.
   2. Enter a credit card or debit card. As the page says, "We ask you for your credit card to make sure you are not a robot. If you use a credit or debit card, you won't be charged unless you manually activate your full account."
3. Activating the free trial should have created a project called "My First Project". Projects are simply a way to organize cloud resources in GCP. If you want to use a different project or create a new one, click the dropdown at the top of the screen
4. In the search bar, search for "Compute Engine". This should take you to a page called "Compute Engine API". Click the **enable** button
5. Create a Linux VM in GCP. This will be your production server
   1. Search for "Add VM Instance". This should open the instance creation page
   2. You can leave everything as default except for the firewall settings:
      1. Check the options for allowing both HTTP and HTTPS traffic to the VM. This will give your VM an external IP address once it is created
   3. Click the "Create" button
6. Navigate to the "VM instances" tab and click the "Set up firewall rules" option
   1. Select the `default-allow-http` rule, and select "Edit" at the top of the page
   2. In the "TCP Ports" section, add 8080 and 3000. This will allow you to access those ports from your local machine. In the future, if you need to add additional or different HTTP ports, you would do so in the same way. Also, if you want to add HTTPS ports, do so in the same way under the `default-allow-https` rule
7. Setup a GitHub runner. The GitHub runner waits for certain actions to happen in your repository and runs a user-defined set of commands when one occurs. We will be using this runner to rebuild and redeploy our project whenever a commit on the `main` branch occurs. First, we need to link the runner to your repository:
   1. Open an SSH terminal to your VM in GCP
   2. Install a GitHub self-hosted runner on the VM using the instructions found in your GitHub Repository at Settings > Actions > Runners > New self-hosted runner. Follow the "Download" and "Configure" instructions for Linux **EXCEPT FOR THE `./run.sh` COMMAND.**
   3. Install Docker on your VM, using the following instructions (under "Install using the apt repository"): https://docs.docker.com/engine/install/debian/#install-using-the-repository
   4. Run the following command, giving your GitHub runner permission to use Docker commands: `sudo usermod -aG docker <my-username>` (`<my-username>` is the username that you used to log in via SSH to the VM)
   5. To check if `<my-username>` now has access to Docker run: `sudo -u <my-username> -H docker info`. This command will fail if that user does not have permission.
   6. Finally, configure your GitHub runner to run as a service in the background and automatically restart if it crashes. Run `sudo ./svc.sh install` and `sudo ./svc.sh start`. After you deploy your project, you can check the status by running: `sudo ./svc.sh status`. More Info: https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/configuring-the-self-hosted-runner-application-as-a-service
8. Write a GitHub Actions workflow (CI pipeline) file.
   - This file will tell the GitHub runner what to do whenever a commit is made to the branch the file is in; you can learn more here: https://docs.github.com/en/actions/quickstart
   - We want our runner to build a Docker image for both our frontend and backend on a commit and then deploy those images as containers, along with our database image, to our production server. The way this is done is largely up to you; we have provided sample Dockerfiles (`/docker`) and a sample GitHub actions workflow file (`/cicd/sample-github-actions-ci.yml`) to give an example of how it could be achieved. You will need to make minor modifications to the sample workflow file for it to work (see more in the `sample-github-actions-ci.yml` file)
   - Whenever a commit is made, a workflow should be created for your GitHub project. You can view this workflow to see its status while it is executing in the "Actions" tab on GitHub. Create a commit to test this.
   - To learn more about how to create and run a Docker image from a GitHub Actions workflow, see: https://linuxhit.com/how-to-create-docker-images-with-github-actions/ or https://docs.github.com/en/actions/creating-actions/creating-a-docker-container-action

This will get basic CI/CD functionality setup for your project. Feel free to customize this process to fit your needs as the project progresses. Note that one of your project deliverables will be extending the CI/CD to also support running automated tests.