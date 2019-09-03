let Footer = {
    render: async () => {
        let view =  /*html*/`
        <footer class="footer text-center bg-light pt-4 pb-4">
            <div>Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        </footer>
        `
        return view
    },
    afterRender: async () => {}

}

export default Footer;