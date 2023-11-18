import { useState } from "react";
import ToggleButton from "../Elements/Toggle/ToggleButton";

function JenisPencarian(){
    const [showContent, setShowContent] = useState(true);

    const toggleContent = () => {
        setShowContent(!showContent);
    };
    return (
        <div>
            <ToggleButton 
                textKiri = "Warna"
                textKanan = "Tekstur"
                onClick = {toggleContent}
            />
            <NavigationProcess type = 'tekstur'/>
        </div>
    );
}

function NavigationProcess({type}){
    if(type === 'color'){
        return (
            <div>
                Proses warna
            </div>
        );
    }else{
        return (
            <div>
                Proses tekstur
            </div>
        );
    }
}


export default JenisPencarian;