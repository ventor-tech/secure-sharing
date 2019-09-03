let Header = {
    render: async () => {
        let view =  /*html*/`
             <nav class="navbar navbar-expand-lg navbar-light bg-light" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/#/">
                            <img src="/static/images/icon.svg" width="30" height="30">
                        </a>
                    </div>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/#/about">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `
        return view
    },
    afterRender: async () => {}

}

export default Header;