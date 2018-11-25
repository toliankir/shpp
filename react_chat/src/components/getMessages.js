export async function getMessages() {
    const responseData = await fetch('http://localhost/shpp/ps5_ajax/public/api/?id=-1', {
        method: 'GET',
        credentials: 'include'
    });
    const json = await  responseData.json();
    let userState = false;

    if (json.statusCode === 202) {
        userState = true;
    }
    this.setState({
        messages: json.body,
        userState: userState
    });

}