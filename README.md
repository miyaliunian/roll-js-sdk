配置 config-ready调用关系

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      window.addEventListener("load", () => {
        debugger;
        const ddf = {};
        function config(options) {
          console.log(options);
          setTimeout(() => {
            debugger;
            ddf.readyFun();
          }, 3000);
        }

        function ready(fun) {
          ddf.readyFun = fun;
        }

        const configObj = {
          name: "逗逗飞",
          age: "33",
        };

        debugger;
        config(configObj);

        function test() {
          console.log("输出test");
        }

        debugger;
        ready(test);
      });
    </script>
  </body>
</html>

```

