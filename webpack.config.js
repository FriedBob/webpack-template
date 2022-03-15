// Webpack 구성옵션 작성지
// nodejs 환경에서 동작함

const path = require('path');                       // nodejs에서 제공하는 기본모듈 (절대경로 작성용)
const HtmlPlugin = require('html-webpack-plugin');  // html에서 webpack을 실행하기위함
const CopyPlugin = require('copy-webpack-plugin');  // html에 정적파일연결

module.exports={

    // parcel index.html 와 유사
    // 파일을 읽어들이기 시작하는 진입점 설정, 웹팩은 자바스크립트를 진입점으로 쓴다
    entry:'./js/main.js',

    // 결과물(번들)을 반환하는 설정, dist같은 것
    output: {
        // 결과물을 반환하는 경로 (절대경로)
        path: path.resolve( __dirname,'dist'),           // 인자 2개의 경로를 합침, __dirname : 현재 파일이 있는 경로, dist가 기본값
        filename: 'main.js',                             // 결과물의 이름( 기본값: entry파일이름)
        clean: true                                     // 기존에 만들었던 결과물의 제거여부
    },

    // main.js에 import된 css를 webpack이 읽을 수 있게 함 
    // module이라는 옵션에 기본적인 규칙들을 명시해서 규칙에 해당하는 모듈들을 해석해서 loader들로 분석해서 사용
    module: {
        rules: [
            {
                test: /\.s?css$/,                   // .scss로 끝나는 파일들을 찾아서 사용 (s는 없을수도있음)
                use:[                               // npm으로 받았던 것들 (순서중요, 아래쪽이 더 먼저해석됨)
                    'style-loader',                 // html의 style 태그에 해석된 내용을 삽입해줌
                    'css-loader',                   // javascript에서 css를 해석하기 위함
                    'postcss-loader',               // css 로더를 통해 공급업체 접두사 적용
                    'sass-loader'                   //      ""       scss       ""
                ]
            },
            {
                test: /\.js$/,                      // webpack이 babel을 해석하려면 babel-loader가 필요함
                use: [                             // .js로 끝나는 파일들을 webpack이 babel loader로 읽어들여서 babel이 적용될수 있게 만듬
                    'babel-loader'
                ]
            }
        ]
    },

    // webpack plugin
    plugins: [
        new HtmlPlugin({
            template: './index.html'                    // webpack로 실행시 entry의 js를 실행해서 output으로 반환하는 과정에서 plugins의 plugin들을 활용
        }),
        new CopyPlugin({
            patterns: [
                { from: 'static'}                       // static 라는 이름의 폴더에 있는 내용을 copy가 되서 dist라는 폴더에 들어갈 수 있도록 함 (배열이기에 여러경로 설정가능) 
            ]
        })
    ],

    devServer: {
        host: 'localhost'                               // devserver의 이름? 
    }

};