import React, {Component} from 'react';

class JsonGet extends Component {
    state = {
        items: [],
        isLoaded: false
    };

    async componentDidMount() {
        const data = await fetch('http://127.0.0.1/shpp/ps5_ajax/public/api/?id=0');
        const jsonData = await data.json()

        this.setState({
            isLoaded: true,
            items: jsonData
        });
    }


    render() {
        const {isLoaded, items} = this.state;
        if (isLoaded) {
            console.log(items);
        }
        return (
            <div>
                {isLoaded ? items.statusText : 'Loading'}
            </div>
        );
    }
}

export default JsonGet;
