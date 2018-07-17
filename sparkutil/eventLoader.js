const reqEvent = (event) => require(`../events/${event}`)
module.exports = sparkclient => {
    sparkclient.on('ready', () => reqEvent('ready')(sparkclient));
    // sparkclient.on('reconnecting', () => reqEvent('reconnecting')(sparkclient));
    // sparkclient.on('disconnect', () => reqEvent('disconnect')(sparkclient));
    // sparkclient.on('message', () => reqEvent('message'));
}