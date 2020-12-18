function tambahAntrian(antree, nama, nomor, dokter, spesialis){
    let antrianBaru = {
        nama: nama,
        nomor: nomor,
        dokter: dokter,
        spesialis: spesialis
    }
    if (!antree){
        console.log("ANTRIAN INVALID")
        return "ANTRIAN INVALID"
    }
    if (antree.length >= 10){
        console.log("ANTRIAN PENUH")
        alert("Antrian Penuh")
        return antree
    }

    antree.push(antrianBaru)
    // console.log(antrianBaru)
    console.log(`Pasien baru diterima. ${antrianBaru.nama} silahkan menunggu antrian`)
    console.log()

    updateLocalStorage(antree)
    return antree
}

function kurangAntrian(antree, dokter){
    let pasien = ""
    let temp = []
    let aLength
    let notFound = false

    if (!antree){
        console.log("ANTRIAN INVALID")
        return ""
    }
    if (antree.length === 0){
        console.log("ANTRIAN KOSONG")
        return ""
    }

    aLength = antree.length
    while (antree.length !== 0){
        let nama = antree[0].nama
        let dokterDipanggil = antree[0].dokter

        if (dokterDipanggil !== dokter){
            temp.push(antree.shift())
        }else{
            pasien = antree.shift()
            break
        }
    }
    
    if (temp.length === aLength){
        notFound = true
    }
    while (temp.length !== 0){
        antree.unshift(temp.pop())
    }

    if (!notFound){
        console.log(`Dokter ${dokter} siap menerima pasien`)
        console.log(`Pasien dengan nama: ${pasien.nama} silahkan menuju ke ruangan Dokter ${pasien.dokter}`)
        console.log()
    } else{
        console.log(`Dokter ${dokter} tidak memiliki calon pasien`)
        console.log()
        return ""
    }


    updateLocalStorage(antree)
    return pasien.nama
}

function buatAntrian(){
    let arr = []
    let arrLS = JSON.parse(localStorage.getItem("lsKeyAntrian"))
    if (arrLS){
        console.log("YEEEE ADA")
        return arrLS
    }else {
        console.log("MAMAK GADA")
    }
    return arr
}

function tampilkanAntrian(antree){
    if (!antree){
        console.log("ANTRIAN INVALID")
        return "ANTRIAN INVALID"
    }
    if (antree.length === 0){
        console.log("ANTRIAN KOSONG")
    }

    tabelAntrian = document.getElementById("table-antrian-body")
    tabelAntrian.innerHTML = ""

    console.log("Menampilkan list antrian")
    for (let i = 0; i < antree.length; i++){
        let pasien = antree[i].nama
        let dokter = antree[i].dokter
        let keluhan = antree[i].spesialis
        let n = antree[i].nomor

        let cout = `Antrian ke ${n}: ${pasien} ke Dokter ${dokter}`
        console.log(cout)

        tabelAntrian.innerHTML += `<tr>
        <td>${n}</td>
        <td>${pasien}</td>
        <td>${keluhan}</td>
        </tr>
        `


    }
    console.log("========================")
    console.log()
}

function buatDaftarDokter(){
    let dokter = []
    return dokter
}

function tambahDokter(arrDokter, nama, spesialis, durasi){
    let newDokter = {
        nama: nama,
        spesialis: spesialis,
        durasiKerja: durasi
    }
    arrDokter.push(newDokter)
}

function getDokter(arrDokter, spesialis){
    if (!arrDokter){
        return "DOKTER INVALID"
    }
    if (arrDokter.length === 0){
        return "DOKTER TIDAK DITEMUKAN"
    }

    for (let i = 0; i < arrDokter.length; i++){
        if (arrDokter[i].spesialis === spesialis){
            return arrDokter[i].nama
        }
    }

    return "DOKTER TIDAK DITEMUKAN"
}

function inisialisasi(dokters, antree){
    let keluhan = document.getElementById("input-keluhan-list")
    let doks = document.getElementById("input-dokter-list")
    for(let i = 0; i < 3; i++){
        let namaDokter = document.getElementById(`dokter-${i}`);
        namaDokter.children[0].innerHTML = "dr. " + dokters[i].nama
        namaDokter.children[1].innerHTML = dokters[i].spesialis
        namaDokter.children[2].innerHTML = "Belum ada Pasien"

        keluhan.innerHTML += `<option value="${dokters[i].spesialis}">${dokters[i].spesialis}</option>
        `
        doks.innerHTML += `<option value="${dokters[i].nama}">${dokters[i].nama}</option>
        `
    }
    tampilkanAntrian(antree)
}

function updateLocalStorage(input){
    localStorage.setItem("lsKeyAntrian", JSON.stringify(input));
    console.log(JSON.parse(localStorage.getItem("lsKeyAntrian")));

    // var testObject = { 'one': 1, 'two': 2, 'three': 3 };

    // // Put the object into storage
    // localStorage.setItem('testObject', JSON.stringify(testObject));
    
    // // Retrieve the object from storage
    // var retrievedObject = localStorage.getItem('testObject');
    
    // console.log('retrievedObject: ', JSON.parse(retrievedObject));

}

function tambahPanjangAntrian(num){
    return num += 1
}

function updateStatusDokter(dokters, dok, pasienName){
    for (let i = 0; i < dokters.length; i++){
        if (dokters[i].nama === dok){
            let pasien = document.getElementById(`dokter-${i}-pasien`)
            pasien.innerHTML = pasienName
            let kotak = pasien.parentElement.parentElement.parentElement
            kotak.setAttribute("class", "card-boxes highlight")
            setTimeout(function(){
                kotak.setAttribute("class", "card-boxes")
            },1000)
            console.log("KOTAK")
            console.log(kotak)
            return dok
        }
    }

}

// function main(){
//     let antrian = buatAntrian()
//     let dokters = buatDaftarDokter()
//     let panjangAntrian = 0

//     tambahDokter(dokters,"Agus","THT",3)
//     tambahDokter(dokters,"Bambang","Saraf",4)
//     tambahDokter(dokters,"Cik","Umum",2)
//     getDokter(dokters, "THT")

//     tambahAntrian(antrian, "antree1", panjangAntrian, getDokter(dokters, "THT"), "THT")
//     panjangAntrian++
//     tambahAntrian(antrian, "antree2", panjangAntrian, getDokter(dokters, "Saraf"), "Saraf")
//     panjangAntrian++
//     tambahAntrian(antrian, "antree3", panjangAntrian, getDokter(dokters, "THT"), "THT")
//     panjangAntrian++

//     tampilkanAntrian(antrian)

//     kurangAntrian(antrian, "Agus")
//     kurangAntrian(antrian, "Bambang")
//     kurangAntrian(antrian, "Cik")

//     tampilkanAntrian(antrian)

//     tambahAntrian(antrian, "antree4", panjangAntrian, getDokter(dokters, "Umum"), "Umum")
//     panjangAntrian++
//     tambahAntrian(antrian, "antree5", panjangAntrian, getDokter(dokters, "Saraf"), "Saraf")
//     panjangAntrian++
//     kurangAntrian(antrian, "Cik")
    
//     tampilkanAntrian(antrian)
// }

let antrian = buatAntrian()
// getFromLocalStorage(antrian)
let dokters = buatDaftarDokter()
let panjangAntrian = 1

tambahDokter(dokters,"Agus","THT",3)
tambahDokter(dokters,"Bambang","Saraf",4)
tambahDokter(dokters,"Cik","Umum",2)

inisialisasi(dokters, antrian)
// tampilkanAntrian(antrian)

let buttonForm = document.getElementById("button-antri")
buttonForm.addEventListener("click", function(){
    let nama = document.getElementById("input-nama").value
    let keluhan = document.getElementById("input-keluhan-list").value
    if (!nama) {
        alert("Masukan nama")
        return ""
    }
    if (nama.length >= 15){
        alert("Nama Invalid")
        return ""
    }
    tambahAntrian(antrian, nama, panjangAntrian, getDokter(dokters, keluhan), keluhan)
    panjangAntrian = tambahPanjangAntrian(panjangAntrian)
    tampilkanAntrian(antrian)

})

let buttonMasuk = document.getElementById("button-masuk")
buttonMasuk.addEventListener("click", function(){
    let dok = document.getElementById("input-dokter-list").value
    let pasien = kurangAntrian(antrian, dok)
    tampilkanAntrian(antrian)
    if (pasien) {
        updateStatusDokter(dokters,dok,pasien)
    }
})
