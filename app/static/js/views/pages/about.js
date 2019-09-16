let About = {
    render : async () => {
        let view =  /*html*/`
            <section class="section">
                <h1>About</h1>
                <p>
                'Secure Sharing' is a service to share sensitive information
                through one-time links. We believe that security is a top
                priority. Also such type of services should be OpenSource
                with enough freedom. So we licensed it under LGPL 3.0.
                </p>
                <p>
                We used the following technologies:
                <ul>
                    <li><a href="https://palletsprojects.com/p/flask/">Flask</a> as web application framework
                    <li><a href="https://pycryptodome.readthedocs.io/en/latest/index.html">PyCryptodome</a> as cryptographic framework
                    <li><a href="https://redis.io/">Redis</a> as a storage for messages
                    <li><a href="https://getbootstrap.com/">Bootstrap 4</a> as a frond-end toolkit
                </ul>
                </p>
                <p>
                You are welcome to contribute on
                <a href="https://github.com/ventor-tech/secure-sharing">GitHub</a>.
                </p>
            </section>
        `
        return view
    },
    afterRender: async () => {}
        
}

export default About;