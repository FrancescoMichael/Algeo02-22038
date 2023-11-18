import Input from "./input";

function InputURL(props){
    const { name, type, placeholder } = props;
    return (
        <div className = "mb-6">
            <Input 
                name = {name}
                type = {type}
                placeholder = {placeholder}
            />
        </div>
    );
}

export default InputURL;