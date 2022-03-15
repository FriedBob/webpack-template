import "../scss/main.scss"    // main.js부터 읽기에 그 과정에서 css를 읽어들이게 된다. (webpack이 직접 읽는게 아니라 dist에 보내는것이기에 읽으려면 별도의 설치가 필요)   
                                 // npm i -D css-loader style-loader

console.log('Webpack!!');