const Utils = { 
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : r[1],
            id          : r[2],
            verb        : r[3]
        }

        return request;
    },
    goTo: (hash = '') => {
        location.hash = hash;
    }
}

export default Utils;