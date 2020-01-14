<!DOCTYPE HTML>
<html lang ="de-DE">
    <head>
        <title>tr-development</title>
        <meta charset = "UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="desciption" content="coding, music, philosophy, logic, fantasy" >
        <meta name="robots" content="index,follow">
        <meta name="viewport"  content="width=device-width" initial-scale=1.0/>
        <meta name="theme-color" content="#30147e;">
        <link rel ="stylesheet" type="text/css;" href="mobile.css">
        <link rel ="stylesheet" type="text/css;" href="desktop.css">
        <script src="jquery-3.3.1.js"></script>
        <script src="pre_script.js" defer="true"></script>
    </head>
    <body>
        <?php
        echo "My first PHP script!";
        ?>
        <main class="wrapper">
            <div id="head" class="head grid-box">
                <h1>tr - development</h1>
                <!--<img id="logo" src="logo.jpg">-->
            </div>
            <div id="math" class="math grid-box">
                <h2>math</h2>
                <ul>
                    <li>linear algebra</li>
                    <li>discrete structures</li>
                    <li>analysis</li>
                    <li id="inmath"></li>
                </ul>
            </div>
            <div id="coding" class="coding grid-box">
                <h2>coding</h2>
                <ul>
                    <li>C</li>
                    <li>Pascal</li>
                    <li>Python</li>
                    <li>JavaScript</li>
                    <li id="jscript"></li>
                </ul>
            </div>
            <div id="music" class="music grid-box">
                <h2>music</h2>
                <ul>
                    <li>theory of current western hemisphere music</li>
                    <li>practise on guitar and piano</li>
                </ul>
            </div><!--id="music"-->
            <div id="sports" class="sports grid-box">
                <h2>sports</h2>
                <ul>
                    <li>athletics</li>
                    <li>kitesurfing</li>
                    <li>football/soccer</li>
                </ul>
            </div>
            <div id="contact" class="contact grid-box">
                <h2>contact</h2>
				<address>
					theo.reichert7@gmail.com<br/> 
				</address>
            </div>
            <div id="rights" class="rights grid-box">
                <h2>right</h2>
                <button type="button" onclick="document.write('U are a dumbass of no measure')">Try it</button>
            </div>
        </main>
        <script src="post_script.js"></script>
    </body>
</html>
