---
layout: post
title: Concepts of Webpack 
tags: [frontend]
---


###### 아래의 내용은 webpack의 공식 문서를 제 깜냥대로 번역한 것입니다
___

<br>
<br>

웹팩은 현대 자바스크립트 어플리케이션을 위한 정적 모듈 번들러이다. 
웹팩이 당신의 어플리케이션을 위해 프로세스를 돌릴 때, 
웹펙은 내부적으로 프로젝트가 필요로 하는 모든 모듈의 지도를 
그리는 의존성 그래프를 만들고 하나 이상의 번들을 만든다.



웹팩은 다음의 개념들을 기본으로 한다.

1. entry
2. output
3. loaders
4. plugins
5. mode
6. browser compatibility


#### entry
entry point는 웹팩이 의존성 그래프에 따라 번들을 만드는데 어떤 모듈을 시작점으로 사용하는지 알려준다.
 웹팩은 직접적으로나 간접적으로나 entry point에 의존해는 다른 모듈이나 라이브러리를 확인할 것이다.

기본값은 `./src/index.js`이다. 그러나 하나 이상의 다른 곳으로 특정할 수 있다. 이 때 `webpack.config.js`를 사용한다.

```js
// webpack.config.js
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

#### output
output 속성은 webpack에게 생성 된 번들을 내보낼 위치와 이 파일의 이름을 지정하는 방법을 알려줍니다.
 기본 출력 파일의 경우 `./dist/main.js`이고 다른 생성 된 파일의 경우 `./dist` 폴더입니다.

`webpack.config.js`에 출력 필드를 지정하여 프로세스의 이 부분을 지정 할 수 있습니다.

```js
//webpack.config.js

const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```


위 예제에서 `output.filename`과 `output.path` 속성을 사용하여 webpack에 번들의 이름과 출력 할 위치를 지정합니다.
 상단에서 모듈을 `import`하는 경로 모듈은 바로 파일 경로를 조정하는데 사용되는 node.js의 코어 모듈입니다.


#### loaders
웹팩은 JavaScript와 JSON 파일만 이해합니다. loader는 webpack이 다른 유형의 파일을 처리하고,
 응용 프로그램에서 사용하고, 종속성 그래프에 추가 할 수 있는 유효한 모듈로 변환 할 수있게 합니다.

모든 유형의 모듈을 가져 오는 기능 (예 : .css 파일)은 webpack 전용 기능이며 다른 번들러 또는 태스크 러너는 지원하지 않을 수 있습니다. 
우리는 개발자가 보다 정확한 의존성 그래프를 작성할 수 있기 때문에 이 언어 확장이 보증된다고 생각합니다.

높은 수준(high-level)에서 로더는 웹팩 구성에 다음 두 가지 속성을가집니다.

1. test 등록 정보는 변환해야 할 파일을 식별합니다.
2. use 속성은 변형을 수행하는 데 사용해야 하는 로더를 나타냅니다.

```js
//webpack.config.js

const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
```


위의 구성은 test 및 use의 두 가지 필수 속성이있는 단일 모듈에 대한 rules 속성을 정의했습니다. 
이것은 webpack의 컴파일러에게 다음과 같이 알려줍니다 :
`"안녕하세요 webpack 컴파일러, require () / import 문 내부의 '.txt'파일로 해석되는 경로를 
발견하면 번들에 추가하기 전에 raw 로더를 사용하여 변환하십시오."`

webpack.config.js에서 규칙을 정의 할 때 rules이 아닌 module.rules에서 규칙을
 정의한다는 것을 기억하는 것이 중요합니다. 이것이 잘못 수행되면 webpack에서 경고합니다.


##### plugins
loader는 특정 유형의 모듈을 변환하는데만 사용되지만,  플러그인에게는 번들 최적화,
 asset 관리 및 환경 변수 주입과 같은 광범위한 작업을 수행 시킬 수 있습니다.

플러그인 인터페이스와 이 인터페이스를 사용하여 웹팩 기능을 확장하는 방법을 확인하십시오.
플러그인을 사용하려면 플러그인을 `require ()`하여 플러그인 배열에 추가해야 합니다. 
대부분의 플러그인은 옵션을 통해 취향 것 정의 할 수 있습니다. 
다양한 목적을 위해 설정에서 플러그인을 여러 번 사용할 수 있으므로 `new` 연산자로 플러그인을 호출하여 인스턴스를 만들어야합니다.


```js
//webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

위의 예제에서 html-webpack-plugin은 생성 된 모든 번들에 응용 프로그램을 위한 html을 자동으로 생성하고 삽입합니다.


#### mode
mode 매개 변수를 development, production 또는 none으로 설정하면 webpack에
 내장되어 있는 최적화 작업을 각 환경에 알맞게 활성화 할 수 있습니다. 기본값은 production입니다.

```js
// webpack.config.js

module.exports = {
  mode: 'production'
};
```


#### browser compatibility
webpack은 ES5 호환 (IE8 이하는 지원되지 않음)되는 모든 브라우저를 지원합니다. 
webpack은 `import ()` 및 `require.ensure ()`에 대한 promise가 필요합니다. 
구형 브라우저를 지원하려면 이러한 표현식을 사용하기 전에 `polyfill`을 로드해야 합니다.






