import ToggleButton from "../Elements/Toggle/ToggleButton";
import UploadDataset from "../Fragments/UploadDataset";
import CardResult from "../Fragments/UploadDataset";

function SumberDataset(){
    return (
        <div className = 'w-1/2 flex flex-wrap justify-center'>          
            <div className = 'font-bold text-xl flex justify-center mb-5'>
                DATASET
            </div>
            <div className="py-10 h-10 px-6">
                Pilih dataset yang diinginkan
            </div>
            <div className = ''>
                <UploadDataset />
            </div>
            
        </div>
    );
}

export default SumberDataset;