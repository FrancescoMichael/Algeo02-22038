function Button(props){
	const { text, onClick = () => {}, type = "button"} = props;
	return(
		<button 
			className= {`h-10 px-6 font-semibold rounded-md bg-blue-600 text-white`}
			type = {type}
			onClick = {onClick}
		> 
			{text}
        </button>
	);
}

export default Button