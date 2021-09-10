
# [Tweeter](https://tweeter-hv.vercel.app/)

### Clone of twitter using [Next js](https://nextjs.org)
![Logo](https://tweeter-hv.vercel.app/_next/image?url=%2Flogos%2Ftweeter.svg&w=128&q=100)

    
## Features

- user can create his own profile
- user can add their images locally
- user can add tweet using text or text and image both
- user can comment, like, retweet, and bookmarks the tweet
- user can add comments to tweet
- user can see other user profile
- all page can be viewed after login in
- user can follow the other user
## Screenshots

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/images-to-link-converter.appspot.com/o/images%2F4l0vYB9kmascreencapture-tweeter-hv-vercel-app-2021-06-22-14_12_14.png?alt=media&token=eb45c376-ba43-4301-8606-0f2628cf27f4)

  
## API Reference

#### Public APIs
|Method| Parameter | Type     | Description                |Router  |
|:--| :-------- | :------- | :------------------------- |:-------|
|`GET`|No Need | `JSON` | Give all tweets | /api/tweets      |
|`GET`|tweet id| `JSON` | Give tweet by the Id and comments| /api/tweets/${id}|
|`GET`|authorId| `JSON`| Give the user details| /api/profile/${id}|


## Run Locally

Clone the project

```bash
  git clone https://github.com/harsh-vish14/tweeter.git
```

Go to the project directory

```bash
  cd tweeter
```

Install dependencies

```bash
  npm install
```

Start the Project in developement

```bash
  npm run dev
```

  
## Authors

- [@harsh-vish14](https://github.com/harsh-vish14)

  
