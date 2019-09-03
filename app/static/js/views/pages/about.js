let About = {
    render : async () => {
        let view =  /*html*/`
            <section class="section">
                <h1>About</h1>
                <p>
                    Secure Sharing is a service to secure share sensitive information through one-time links.
                    TODO: Update text
                </p>
            </section>
        `
        return view
    },
    afterRender: async () => {}
        
}

export default About;