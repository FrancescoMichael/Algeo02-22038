import Navbar from "../components/Fragments/Navbar";
import "./howtouse.css"

function HowtoUse(){
    return (
        <div>
            <section className="section-bgr">
                <Navbar />
                <div class="col-md-12 text-center">
                    <h2 class="section-tit">Playing with <i>Jaring</i></h2>
                </div>
                <div class="steps">
                <ol>
                    <li class="cards">Siapkan citra yang ingin Anda gunakan sebagai citra uji dan citra pembanding</li>
                    <li class="cards">
                        Unggah citra uji (.jpg atau .png) dan citra pembanding (.zip) Anda. Citra pembanding juga dapat diberikan dengan menyediakan 
                        URL yang menuju suatu situs web. <i>Jaring</i> akan mengambil gambar-gambar dari situs tersebut.
                    </li>
                    <li class="cards">Pilih apakah Anda ingin melakukan temu balik citra menggunakan CBIR berbasis warna atau tekstur</li>
                    <li class="cards"><i>Jaring</i> akan menampilkan citra yang memiliki kemiripan di atas 60% dengan citra uji</li>
                    <li class="cards">
                        Jika sudah pernah melakukan menjalankan <i>Jaring</i> sebelumnya, Anda dapat memilih toggle 
                        "Apakah ingin menggunakan dataset sebelumnya?" sehingga <i>Jaring</i> akan menampilkan hasil temu balik citra yang selanjutnya
                        dengan lebih cepat
                    </li>                   

                </ol>
                </div>
            </section>
            
            
        </div>
    );
}

export default HowtoUse;