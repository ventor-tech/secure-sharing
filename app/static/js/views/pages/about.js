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
                    <li>Flask as web application framework</li>
                    <li>Redis as a storage for messages</li>
                    <li>Bootstrap 4 as a frond-end toolkit</li>
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