import API from '../../api.js';


let Home = {
    // list of elements to work with 
    eles: {},

    // List of elements IDs to load 
    elementsIds: [
        'message', 'error', 'success', 'url',
        'submit', 'copy', 'time-to-live'
    ],

    render: async () => {
        let view =  /*html*/`
            <section class="section">
                <h1>What this service is about?</h1>
                <h3 class="pb-4">
                    "Secure Sharing" is a service to share sensitive information through
                    one-time links.
                </h3>
                <form class="pb-4" action="/" method="POST">
                    <div class="row pb-4">
                        <div class="col-md-12">
                            <textarea class="form-control" name="text" id="message" rows="5"
                                placeholder="Use this field to write any message you want to securily share with someone."></textarea>
                        </div>
                    </div>
                    <div class="row pb-4">
                        <div class="col-md-5">
                            <label for="time-to-live">Auto-delete if not read after</label>
                            <select class="form-control" id="time-to-live">
                                <option value="600">10 minutes</option>
                                <option value="3600">1 hour</option>
                                <option value="86400" selected="selected">1 day</option>
                                <option value="604800">1 week</option>
                                <option value="-1">Never</option>
                            </select>
                        </div>
                    </div>
                    <div class="row pb-4">
                        <div class="col-md-12">
                            <button type="submit" id="submit" class="btn btn-primary">Generate URL</button>
                        </div>
                    </div>
                </form>
                <div id="error" class="alert alert-danger d-none" role="alert"></div>

                <form id="success" class="d-none">                                
                    <div class="input-group mb-3">
                        <label class="sr-only" for="url">URL</label>
                        <input type="text" class="form-control" id="url" placeholder="URL" aria-label="URL" readonly>
                        <div class="input-group-append">
                            <button type="submit" id="copy" class="btn btn-success">Copy</button>
                        </div>
                    </div>
                </form>
            </section>
        `
        return view;
    },

    afterRender: function () {
        // Save references to elements
        this.setElements();

        // Add events
        this.setEvents();
    },

    setElements: function () {
        this.elementsIds.forEach((elementId) => {
            this.eles[elementId] = document.getElementById(elementId);
        });
    },

    setEvents: function () {
        // Submit message
        this.eles['submit'].addEventListener('click', this.submit.bind(this));

        // Copy URL
        this.eles['copy'].addEventListener('click', this.copy.bind(this));

        // Copy URL on click
        this.eles['url'].addEventListener('click', this.copy.bind(this));
    },

    submit: async function (e) {
        e.preventDefault();

        let message = this.eles['message'].value.trim();
        let ttl = Number(this.eles['time-to-live'].value);

        if (!message) {
            this.showError('Message cannot be empty');
            return;
        }

        // Get unique key to form URL
        let key = null;
        try {
            key = await API.encryptMessage(message, ttl);
        } catch (err) {
            this.showError(err);
            return;
        }

        // Show the URL and clear the form
        this.eles['success'].classList.remove('d-none');
        this.eles['error'].classList.add('d-none');
        this.eles['url'].value = `${location.origin}/#/m/${key}`;
        this.eles['message'].value = '';
    },

    copy: function (e) {
        e.preventDefault();
        this.eles['url'].select();
        document.execCommand('copy');

        this.eles['copy'].innerText = 'Copied!';
    },

    showError: function (error) {
        this.eles['success'].classList.add('d-none');
        this.eles['error'].classList.remove('d-none');

        this.eles['error'].innerText = error;
    }

}

export default Home;