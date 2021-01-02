import React from 'react';

class ParseBureauJson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.getInputTag = this.getInputTag.bind(this);
    }

    getInputTag = (fieldId, label, value )=>{
            return <div className={'form-group col-md-4'} key={"viewText"+fieldId}>
                        <label htmlFor={fieldId}>{label}</label>
                        <input className="formControl"
                            type="text"
                            key={fieldId}                  
                            defaultValue={value}
                            readOnly/>
                    </div>
    }

    render() { 
        const bureauJson = this.props.json;
        const businessHeader = bureauJson.results.businessHeader;
        let array = [];
        let count = 0;
        
        Object.keys(businessHeader).forEach(function(key){
            array.push(<div className={'form-group col-md-4'} key={"viewText"+key+count}>
                            <label htmlFor={key+count}>{key}</label>
                            <input className="formControl"
                                type="text"
                                key={key+count}                  
                                defaultValue={businessHeader[key]}
                                readOnly/>
                    </div>);
            count++;
        });
        return (
            <div>
                {array}
            </div>
        );  
    }
}

export default ParseBureauJson;