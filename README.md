# SiakJS

SiakJS is a NodeJS project to automate the process of selecting courses in SIAK-NG. This project is still in development and not ready for production.

## Installation and Running

1. Clone this repository
2. Install dependencies using `npm install`
3. Run the project using `npm run start`

## Configuration

1.  SIAK-NG Creedentials

    Change username and password configuration in `index.js` file.

    ```javascript
    const userData = {
      username: "pass username here",
      password: "pass password here",
    };
    ```

2.  Course Selection

    Change course selection configuration in `index.js` file. 
    `kode` is the course code and `kelas` is the class number. You can find the class number by inspecting the element in SIAK-NG.
    Remember `kelas` is zero-based index. So if you want to select class 1, you need to pass `kelas: 0`.

    ```javascript
    const dataMatkul = [
    {
        kode: "ENEE604023_01.03.04.01-2020",
        kelas: 0,
    },
    {
        kode: "ENGE600004_01.01.04.01-2020",
        kelas: 3,
    }];

    ```
    Shown in preview below
    
    ![](https://github.com/MorpKnight/SiakJS/blob/main/howto.gif)
