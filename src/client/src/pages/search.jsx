import Navbar from "../components/Fragments/Navbar";
import "./search.css"

function PenjalasanSearchEngine(){
    return (
        <div>
            <section class="section-bg">
                <Navbar />
                <div class="col-md-12 text-center">
                    <h2 class="section-ttl">Apa itu Content Based Image Retrieval (CBIR)?</h2>
                </div>
                <div class="cont">
                    <div id="umum" class="card">
                        <p>
                        <em>Content-Based Information Retrieval</em> adalah sistem temu balik informasi dengan membandingkan fitur-fitur dasar dari suatu gambar 
                        dengan gambar-gambar lain yang terdapat di dalam basis data. Pada web Jaring, pengguna dapat mengirimkan file citra uji dan folder yang akan dijadikan 
                        basis data citra pembanding. CBIR akan mengekstrak fitur-fitur dari representasi RGB (<i>Red-Green-Blue</i>) citra kemudian mengubahnya menjadi fitur yang 
                        diinginkan kemudian membandingkannya dengan citra-citra pada basis data. 
                        Secara umum, terdapat dua pendekatan CBIR, yaitu CBIR berbasis warna (<i>color-based</i> CBIR) dan CBIR berbasis tekstur (<i>texture-based</i> CBIR).
                        </p>
                    </div>
                    <div id="CBIR">
                        <article id="color" class="sub">
                            <h3>Color-Based CBIR</h3>
                                <p>Color-Based CBIR membandingkan kesamaan warna dari suatu citra dengan citra lain dari basis data. Representasi RGB citra akan diubah 
                                    menjadi HSV (Hue, Saturation, and Value) yang secara umum digunakan untuk merepresentasikan citra yang digambarkan di atas kertas putih.
                                    Citra tersebut kemudian dibagi menjadi 16 bagian berukuran serupa. Dari tiap bagian tersebut, diperoleh histogram yang dapat memberikan
                                    fitur-fitur yang disimpan di dalam vektor. Masing-masing dari 16 vektor citra uji kemudian dibandingkan dengan masing-masing dari 
                                    16 vektor citra dari basis data dengan metode cosine similarity. Kemiripan dari tiap bagian tersebut dirata-ratakan dan memberikan kemiripan 
                                    dari kedua gambar.  
                                </p>
                        </article>
                        <article id="texture" class="sub">
                            <h3>Texture-Based CBIR</h3>
                                <p>Texture-Based CBIR membandingkan kesamaan tekstur dari suatu citra dengan citra lain dari basis data. Representasi RGB citra akan diubah 
                                    menjadi greyscale. Kemudian, dibentuk co-occurence matrix yang menyimpan informasi kemunculan level greyscale yang bertetanggaan. 
                                    Co-occurence matrix tersebut dibuat simetris dengan menjumlahkannya dengan transpos dari matriks itu sendiri, kemudian dinormalisasi. 
                                    Dari hasil normalisasi, dicari fitur-fitur penting, yaitu Contrast, Homogeneity, Entropy, Energy, and Correlation yang di simpan di dalam vektor. 
                                    Vektor citra uji dicari kemiripannya dengan vektor yang terdapat di dalam basis data kemudian dicari kemiripannya dengan metode cosine similarity.
                                </p>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default PenjalasanSearchEngine;