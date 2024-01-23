# CI/CD

CI/CD stands for Continous Integration, Continuous Deployment and encompasses the practices to automate the typically-manual process of getting code from a commit into production, including the build, test, and deploy phases as well as infrastructure provisioning. With a properly-configured CI/CD pipeline (or workflow), one can make changes to code which are automatically testing and deployed into production within minutes and without the need for manual intervention.

Your team will employ CI/CD practices in this project to automatically test and deploy your code from your GitHub repository to a cloud VM running in Google Cloud Platform (GCP).

Much of the details regarding setting up your CI/CD workflow is described in the root folder's README along with comments in the sample files we provide. This file will provide a general overview of the tools that are used throughout the process.

GitLab has a great writeup if you want to learn more: [What is CI/CD?](https://about.gitlab.com/topics/ci-cd/).

## Overview of Tools

### GitHub (and GitHub Actions)

GitHub is a source control hosting solution, which means it’s the tool that will keep track of all the code and changes along the way in a web client. Your team will have its own repository on GitHub to collaborate and monitor progress. Correspondingly, we’ll be using Git as our source control software.

GitHub repositories also have access to **GitHub Actions**, GitHub's CI/CD workflow platform. Your team will be using GitHub Actions to run automated tests and deploy your project to GCP.

Here are some resources to learn more:
- [The fundamentals of continuous integration in DevOps](https://resources.github.com/devops/fundamentals/ci-cd/integration/)
- [Ry's Git Tutorial](https://www.smashwords.com/books/view/498426) - a great ebook that offers a simple introduction to Git
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) - overview of GitHub Flow (a.k.a. trunk-based development), the recommended way to create and manage branches in your project
- [Learn Git Branching](https://learngitbranching.js.org/) - a good tool to learn about both basic and advanced Git commands in an interactive way
- [Understanding GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) - documentation about the core concepts of GitHub Actions

### Docker (and Docker Compose)

Docker is a platform to easily manage and run applications in isolated "containers" akin to running them on a virtual machine. Using Docker, you can run application "images" in "containers", including images for databases (like MySQL) and custom images (like the ones we will build for your applications).

The primary advantages to using Docker is its ability to automatically manage your applications as well as its interoperability, allowing you to run applications easily on any platform without having to worry about dependency installation or operating system compatibility.

In addition, this template project uses Docker Compose to further manage your Docker containers by allowing you to define configuration files that automatically set up multi-container applications with a pre-set configuration all from a single command.

Learn more about Docker and Docker Compose:

- [Docker overview](https://docs.docker.com/get-started/overview/)
- [Docker Compose overview](https://docs.docker.com/compose/)
- [Docker for Beginners](https://docker-curriculum.com/) - good tutorial to learn about the various features and aspects of Docker

### Google Cloud Platform (GCP)

GCP is Google’s IaaS (Infrastructure as a Service) cloud platform. With GCP, devops engineers can take advantage of Google's network and resources to host their own applications. In this project, you will use GCP to host your application so that it will be publicly accessible on the web. Within the Google Cloud Console, you will be able to configure and manage your team's virtual machine that will host your deploy application, as well as configure the networking and security of it.

However, hosting a virtual machine is just one of the many services that GCP offers, see the link below for even more services that it offers.

**IMPORTANT: As GCP is a cloud platform, your team will have to carefully manage the billing of any resources that you use. We highly recommend setting up budget alerts within the Google Cloud Console to notify you when you might spend more than you intend on GCP resources. Even though we will take advantage of the GCP free trial in this project, it is very easy to go over budget when using any IaaS platform (such as GCP, AWS, and Azure).**

- [Google Cloud Overview](https://cloud.google.com/docs/overview) - overview of GCP and its services
- [Get started with Google Cloud
](https://cloud.google.com/docs/get-started)
- [Google Cloud Console](https://console.cloud.google.com/) - console to control your GCP resources
- [Creating Budget Alerts](https://cloud.google.com/billing/docs/how-to/budgets) - some information on how to set up budget alerts to let you know when you are going to spend more than you want to on your GCP resources