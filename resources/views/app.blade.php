<!DOCTYPE html>
<html lang="en" ng-app="app">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <base href="/">

        <title>Disasturvey</title>

        <!-- Stylesheets
        ================================================== -->
        <link href="/builds/vendor.css" rel="stylesheet">
        <link href="/builds/app.css" rel="stylesheet">
    </head>

    <body>

        <header>
            <nav class="navbar navbar-trans navbar-fixed-top"
                 bs-navbar
                 bs-collapse
                 data-start-collapsed="true">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" bs-collapse-toggle>
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">Disasturvey</a>
                    </div>

                    <div class="collapse navbar-collapse" bs-collapse-target>
                        <ul class="nav navbar-nav">
                            <li data-match-route="/" du-scrollspy="landing">
                                    <a href="#landing" du-smooth-scroll>
                                    <i class="fa fa-home"></i>
                                    Home <span class="sr-only">(current)</span>
                                </a>
                            </li>
                            <li data-match-route="/about.*" du-scrollspy="about">
                                <a href="#about" du-smooth-scroll>
                                    <i class="fa fa-info"></i>
                                    About
                                </a>
                            </li>
                            <li data-match-route="/donate.*" du-scrollspy="donate">
                                <a href="#donate" du-smooth-scroll>
                                    <i class="fa fa-heartbeat"></i>
                                    Donate
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        <main ui-view>
            @yield('content')
        </main>

        <!-- JavaScript
        ================================================== -->
        <script src="/builds/vendor.js"></script>
        <script src="/builds/app.js"></script>
        <script src="/builds/templates.js"></script>

    </body>
</html>