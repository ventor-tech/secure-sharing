import API from '../../api.js';
import Utils from '../../utils.js';


let Home = {
    // list of elements to work with 
    eles: {},

    // List of elements IDs to load 
    elementsIds: ['success', 'message', 'notification', 'error', 'show', 'copy'],

    render: function () {
        let view =  /*html*/`
            <section id="notification" class="section">
                <div class="jumbotron alert alert-warning p-5">
                    <h1 class="display-5 text-danger">This message will be removed from our server!</h1>
                    <p class="lead">
                        You will not be able to view this note again.
                        If you need access to this information again please copy it to a secure location.
                    </p>
                    <a class="btn btn-primary" id="show" href="#" role="button">Show message</a>
                </div>
            </section>
            <section id="error" class="section d-none">
                <div class="alert alert-secondary p-5" role="alert">
                    <h1 class="pb-2">This message is not available anymore</h1>
                    <p class="pb-2">
                        Or record with that identifier never existed, who knows!<br>
                        Each note can be viewed only once. After that it will be destroyed from our servers.
                    </p>
                    
                    <a href="/" class="btn btn-primary">Go to the main page</a>
                </div>
            </section>
            <section id="success" class="section d-none">
                <form class="pb-4" action="#">
                    <div class="alert alert-warning p-4" role="alert">
                        <h3>This message has been removed from our server!</h3>
                        <p>
                            You can not view this note again.
                            If you need access to this information again please copy it to a secure location.
                        </p>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" name="text" id="message" rows="5" readonly></textarea>
                    </div>
                    <button id="copy" class="btn btn-primary">Copy message</button>
                </form>
           </section>
       `
        return view
    },

    afterRender: function () {
        // Save references to elements
        this.setElements();

        // Add events
        this.setEvents();
    },

    setElements: function() {
        this.elementsIds.forEach((elementId) => {
            this.eles[elementId] = document.getElementById(elementId);
        });
    },

    setEvents: function() {
        // Submit message
        this.eles['show'].addEventListener('click', this.show.bind(this));

        // Copy message
        this.eles['copy'].addEventListener('click', this.copy.bind(this));

        // Copy message on click
        this.eles['message'].addEventListener('click', this.copy.bind(this));
    },

    showError: function () {
        this.eles['notification'].classList.add('d-none');
        this.eles['success'].classList.add('d-none');
        this.eles['error'].classList.remove('d-none');
    },

    copy: function(e) {
        e.preventDefault();
        this.eles['message'].select();
        document.execCommand('copy');

        this.eles['copy'].innerText = 'Copied!';
    },

    show: async function(e) {
        e.preventDefault();

        // hide notification block
        this.eles['notification'].classList.add('d-none');

        let request = Utils.parseRequestURL();

        let text = null;
        try {
            text = await API.decryptMessage(request.id);
        } catch (err) {
            this.showError();
            return;
        }

        this.eles['message'].value = text;
        this.eles['success'].classList.remove('d-none');
    }
}

export default Home;